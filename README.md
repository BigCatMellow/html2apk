# HTML2APK

A central home for turning HTML/CSS/JavaScript projects into installable Android APKs, keeping the source, Android wrapper, build recipes, troubleshooting notes, and APK catalog in one place.

## App library

| App | Package ID | Android features | Status |
|---|---|---|---|
| [Meditation Guide](apps/meditation/) | `com.bigcatmellow.meditation` | Capacitor wrapper | Working build recipe |
| [Mobile E-reader](apps/ereader/) | `com.bigcatmellow.ereaderapp` | Capacitor wrapper, file-based reader | Working build recipe |
| [Shoulder Timer](apps/shoulder-timer/) | `com.bigcatmellow.shouldertimer` | Native local notifications, exact alarms, sound/vibration | Working build recipe |
| [Morning Edition](apps/morning-edition/) | `com.bigcatmellow.morningedition` | Thin Capacitor shell loading the live GitHub Pages UI | Working build recipe |

## Build an APK

Open **Actions → Build APK**, choose an app, and run the workflow. The completed run uploads an installable debug APK artifact. These builds are intended for CI validation and testing.

For long-term, updateable APKs, use **Actions → Publish APK Release**. The release workflow builds an unsigned release APK, assigns an increasing Android `versionCode`, runs `zipalign`, signs it with the repository's permanent private signing identity, verifies it with `apksigner`, and attaches it to a GitHub Release.

The private signing key is intentionally not stored in this public repository. See [`docs/wiki/Signing-and-App-Updates.md`](docs/wiki/Signing-and-App-Updates.md) for the required GitHub Actions secrets and backup rules.

## Add another HTML app

Start from [`templates/basic`](templates/basic/). The basic pattern is:

1. Put the web app in an app folder.
2. Give it a unique Android package ID.
3. Configure Capacitor.
4. Build the web assets.
5. Let Capacitor create the Android project.
6. Let Gradle build the APK.
7. Use the shared permanent signing identity for releases that must update in place.

If the site already lives on GitHub Pages and should update without rebuilding the APK, use the remote-hosted pattern demonstrated by Morning Edition. See [`docs/wiki/Remote-Hosted-Apps.md`](docs/wiki/Remote-Hosted-Apps.md).

See [`docs/wiki/How-to-Convert-HTML-to-APK.md`](docs/wiki/How-to-Convert-HTML-to-APK.md) for the normal bundled-app workflow.

## Why this repository exists

The conversion itself is straightforward, but Android packaging has several sharp edges. This repository records the fixes we already worked through, including:

- creating the Android project **before** Gradle cache steps look for Gradle files;
- using normal Android APK signing rather than JAR-only signing;
- APK Signature Scheme v2/v3 requirements on modern target SDKs;
- `zipalign` / `resources.arsc` alignment failures;
- diagnosing install failures with Termux, `aapt`, `apksigner`, and ADB;
- native Android notifications for HTML apps that need alerts while backgrounded or closed;
- Maven Central HTTP 429 failures when too many fresh Gradle builds run in parallel;
- preserving a permanent signing certificate for future in-place app updates;
- using a live GitHub Pages site as the app UI when web updates should appear without an APK rebuild;
- keeping signing keys out of source control.

## Repository layout

```text
html2apk/
├── apps/                  # Individual APK projects
│   ├── meditation/
│   ├── ereader/
│   ├── shoulder-timer/
│   └── morning-edition/
├── templates/basic/       # Starting point for a new HTML app
├── docs/wiki/             # Wiki source-of-truth Markdown
└── .github/workflows/     # Build, release, and wiki automation
```

The generated `android/`, `www/`, `dist/`, `node_modules/`, signing keys, and local build artifacts are intentionally not committed.
