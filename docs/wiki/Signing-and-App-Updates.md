# Signing and App Updates

Android uses the application package ID **and the signing certificate** to decide whether a new APK is an update to an installed app.

## Debug builds

`./gradlew assembleDebug` is the right way to create personal/test APKs because Gradle handles modern APK Signature Scheme signing and APK alignment correctly.

However, a fresh machine or fresh GitHub Actions runner can generate a different debug keystore. Two APKs with the same package ID but different signing certificates **cannot update one another**. Android will report an incompatible existing package/signature error and the older app must be uninstalled first.

This is separate from the v1/v2/v3 signing issue: an APK can be perfectly valid and v2/v3 signed but still have a different signer from an earlier APK.

## Long-term updateable releases

If an app should receive in-place updates for years, create one private release keystore and keep using it for every release of that package ID.

Do **not** commit the keystore or its passwords to this public repository. Store the keystore and credentials in an appropriate private secret store, such as GitHub Actions secrets, and configure the release build to use them.

Until permanent release signing is configured, the repository's generated APKs should be treated as personal/debug builds. GitHub Releases provide a permanent place to download the APK file, but they do not by themselves make the signing identity permanent.

## Useful checks

Show the certificate/signature schemes:

```bash
apksigner verify --verbose --print-certs app.apk
```

Compare the signer certificate digest between an installed version and a replacement build when Android reports an update incompatibility.

## Rule of thumb

- **Testing / personal build:** Gradle debug signing is fine.
- **Reliable in-place updates:** use one persistent private release key.
- **Never:** manually JAR-sign a modern target-SDK APK as the only signing scheme.
