# Permanent APK Signing

Android identifies an app update by both its package ID and its signing certificate. Keeping the same package ID is not enough: every future APK for that installed app must also be signed by the same private key.

HTML2APK therefore separates two build types:

- **Build APK** creates disposable Gradle debug builds for testing CI and installing fresh copies.
- **Publish APK Release** creates a release APK, aligns it, signs it with one permanent private key, verifies the signature, and publishes it to GitHub Releases.

## One key can sign all apps

It is normal to use one private release key for multiple apps. Each app still has its own package ID, but future versions of each package share a stable signing identity.

## Generate a release key

Do this once and keep the resulting file backed up somewhere private.

```bash
keytool -genkeypair \
  -keystore html2apk-release.p12 \
  -storetype PKCS12 \
  -alias html2apk-release \
  -keyalg RSA \
  -keysize 4096 \
  -sigalg SHA256withRSA \
  -validity 10000
```

Use a long random password. Losing the keystore or its password means you cannot publish an update that Android accepts for an app already installed with that key.

## GitHub Actions secrets

The public repository must never contain the private keystore or its password. Store them as repository Actions secrets:

- `ANDROID_KEYSTORE_BASE64` — base64 encoding of the `.p12` file
- `ANDROID_KEYSTORE_PASSWORD` — keystore/key password
- `ANDROID_KEY_ALIAS` — normally `html2apk-release`

To encode the keystore on Linux:

```bash
base64 -w0 html2apk-release.p12
```

On PowerShell:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("html2apk-release.p12"))
```

Paste that output into `ANDROID_KEYSTORE_BASE64`.

## Release process

Run **Actions → Publish APK Release** and choose the app and semantic version, for example `1.0.0`.

The workflow:

1. rebuilds the web app and generated Capacitor Android project;
2. sets `versionName` to the requested release version;
3. sets an increasing numeric `versionCode` from the workflow run number;
4. builds `app-release-unsigned.apk`;
5. runs `zipalign`;
6. signs with `apksigner` using the permanent PKCS12 key;
7. verifies the APK signature and certificate;
8. creates a GitHub Release and attaches the signed APK.

## First permanent release after old debug builds

An APK installed from an earlier Gradle debug build is signed with a different certificate. The first permanently signed release therefore may require uninstalling the old debug-signed copy once.

After installing the permanently signed release, later releases with the same package ID and this same key can install as normal updates, provided Android's version rules are also satisfied.

## Backup rule

Back up both the `.p12` file and its password somewhere outside GitHub. Do not rely on GitHub Actions secrets as your only copy because secret values cannot be viewed again after saving them.
