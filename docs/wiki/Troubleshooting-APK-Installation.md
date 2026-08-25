# Troubleshooting APK Installation

If Android only says **App not installed** or **Something went wrong**, check the package rather than repeatedly changing the Unknown Apps permission.

## 1. Inspect the package

In Termux:

```bash
pkg install android-tools apksigner aapt
termux-setup-storage
```

Then:

```bash
aapt dump badging ~/storage/downloads/app-debug.apk | head -30
```

This shows the package name, minimum SDK, target SDK, permissions, and app label.

## 2. Verify Android signing

```bash
apksigner verify --verbose --print-certs ~/storage/downloads/app-debug.apk
```

A failure we encountered was:

```text
DOES NOT VERIFY
ERROR: Target SDK version 36 requires a minimum of signature scheme v2
```

The cause was manually re-signing an APK with only the old JAR/v1 signature scheme. Modern target SDKs require newer APK signing. A normal Gradle debug build avoids this problem.

## 3. Verify ZIP alignment

`resources.arsc` must be stored and correctly aligned. The manually repacked APK we debugged had a 4-byte alignment remainder of `1`, so Android rejected it even after the signature was fixed.

Where available:

```bash
zipalign -c -v 4 app.apk
```

A successful package reports verification success.

Older Termux builds of `zipalign` may not support newer options such as `-P 16`; use the options shown by `zipalign` itself rather than assuming the desktop SDK syntax.

## 4. Correct repair order

If you deliberately repair an APK manually, alignment must happen before signing:

```bash
zipalign -f 4 input.apk aligned.apk
apksigner sign ... --out final.apk aligned.apk
apksigner verify --verbose final.apk
```

Do not align an APK after signing because that changes package bytes and invalidates the signature.

## 5. Get the real Package Manager error

Wireless ADB can expose the failure Android's GUI hides:

```bash
adb pair IP:PAIRING_PORT
adb connect IP:ADB_PORT
adb install -r app.apk
```

Useful errors include `INSTALL_FAILED_INVALID_APK`, `INSTALL_PARSE_FAILED_NO_CERTIFICATES`, and `INSTALL_FAILED_UPDATE_INCOMPATIBLE`.

For deeper logs:

```bash
adb logcat -c
adb install -r app.apk
adb logcat -d | grep -iE "PackageManager|PackageInstaller|INSTALL_FAILED|PackageParser|apksig|signature" | tail -100
```

## 6. Gradle cache ordering

Do not enable Gradle dependency caching in `actions/setup-java` before the Capacitor Android project exists. GitHub Actions looks for Gradle files while initializing the cache and can fail if `npx cap add android` has not created them yet.

The simplest fix is to omit that early cache setting or move Gradle-specific caching until after Android project creation.

## 7. Maven Central HTTP 429 in GitHub Actions

A build can fail even when the app is correct if Maven Central rate-limits dependency downloads:

```text
Could not GET 'https://repo.maven.apache.org/...'
Received status code 429 from server: Too Many Requests
```

We hit this after starting three fresh Android builds at the same time. The identical E-reader source had already passed CI, then failed on `main` only because Maven rejected dependency requests.

The repository's shared workflow now reduces this risk in two ways:

1. Android matrix jobs use `max-parallel: 1`, so the three apps do not hammer Maven simultaneously.
2. The Android build step retries transient failures up to three times with increasing waits.

Treat a wall of dependency-resolution errors ending in HTTP 429 as an infrastructure/download problem, not an HTML or Android-source defect.
