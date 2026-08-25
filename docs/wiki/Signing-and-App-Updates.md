# Signing and App Updates

Android uses the application package ID **and the signing certificate** to decide whether a new APK is an update to an installed app.

## Debug builds

`./gradlew assembleDebug` is the right way to create personal/test APKs because Gradle handles modern APK Signature Scheme signing and APK alignment correctly.

However, a fresh machine or fresh GitHub Actions runner can generate a different debug keystore. Two APKs with the same package ID but different signing certificates **cannot update one another**. Android will report an incompatible existing package/signature error and the older app must be uninstalled first.

This is separate from the v1/v2/v3 signing issue: an APK can be perfectly valid and v2/v3 signed but still have a different signer from an earlier APK.

## Permanent release identity

HTML2APK uses one private PKCS12 release key to sign the long-term releases for all apps in this repository. Each app still has its own package ID; the shared key simply gives future versions a stable signing identity.

The private key must **never** be committed to this public repository.

A suitable one-time key can be generated with:

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

Use a long random password and back up the `.p12` file plus the password somewhere private. Losing either means you cannot publish an APK that Android accepts as an update to an app already installed with this key.

## GitHub Actions secrets

The **Publish APK Release** workflow expects these repository Actions secrets:

- `ANDROID_KEYSTORE_BASE64` — base64 encoding of the `.p12` file
- `ANDROID_KEYSTORE_PASSWORD` — the keystore/key password
- `ANDROID_KEY_ALIAS` — normally `html2apk-release`

Encode the file on Linux with:

```bash
base64 -w0 html2apk-release.p12
```

Or on PowerShell:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("html2apk-release.p12"))
```

Paste the resulting text into `ANDROID_KEYSTORE_BASE64`.

GitHub hides secret values after they are saved, so Actions secrets should not be the only backup of the private key.

## Permanent release workflow

Run **Actions → Publish APK Release**, choose the app, and enter a semantic version such as `1.0.0`.

The workflow then:

1. rebuilds the web app and generated Capacitor Android project;
2. sets `versionName` to the requested release version;
3. assigns an increasing numeric `versionCode` from the workflow run number;
4. builds `app-release-unsigned.apk`;
5. runs `zipalign`;
6. signs the aligned APK with `apksigner` and the permanent PKCS12 key;
7. verifies the resulting signing certificate and APK signature;
8. creates a GitHub Release and attaches the signed APK.

The ordinary **Build APK** workflow remains the faster validation/testing path and produces disposable debug-signed APK artifacts.

## First permanent release after old debug builds

An app already installed from one of the earlier debug-signed APKs may need to be uninstalled **once** before the first permanently signed release can be installed, because the signer changed.

After the permanently signed release is installed, later releases with the same package ID and this same private key can install as normal Android updates as long as version rules are also satisfied.

## Useful checks

Show the certificate and signature schemes:

```bash
apksigner verify --verbose --print-certs app.apk
```

Compare the signer certificate digest between an installed version and a replacement build when Android reports an update incompatibility.

## Rule of thumb

- **Testing / CI validation:** Gradle debug signing is fine.
- **Reliable in-place updates:** use the permanent private release key.
- **Never:** commit the private signing key or its password to the repository.
- **Never:** manually JAR-sign a modern target-SDK APK as the only signing scheme.
