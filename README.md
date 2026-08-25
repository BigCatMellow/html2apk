# HTML2APK

A central home for turning HTML/CSS/JavaScript projects into installable Android APKs, keeping the source, Android wrapper, build recipes, troubleshooting notes, and APK catalog in one place.

## App library

| App | Package ID | Android features | Status |
|---|---|---|---|
| [Meditation Guide](apps/meditation/) | `com.bigcatmellow.meditation` | Capacitor wrapper | Working build recipe |
| [Mobile E-reader](apps/ereader/) | `com.bigcatmellow.ereaderapp` | Capacitor wrapper, file-based reader | Migrated here |
| [Shoulder Timer](apps/shoulder-timer/) | `com.bigcatmellow.shouldertimer` | Native local notifications, exact alarms, sound/vibration | Working GitHub build |

## Build an APK

Open **Actions → Build APK**, choose an app, and run the workflow. The completed run uploads an installable debug APK artifact.

For a permanent APK download, use **Actions → Publish APK Release**. That workflow builds the selected app and attaches the APK to a GitHub Release.

## Add another HTML app

Start from [`templates/basic`](templates/basic/). The basic pattern is:

1. Put the web app in an app folder.
2. Give it a unique Android package ID.
3. Configure Capacitor.
4. Build the web assets.
5. Let Capacitor create the Android project.
6. Let Gradle build/sign/align the APK.

See [`docs/wiki/How-to-Convert-HTML-to-APK.md`](docs/wiki/How-to-Convert-HTML-to-APK.md).

## Why this repository exists

The conversion itself is straightforward, but Android packaging has several sharp edges. This repository records the fixes we already worked through, including:

- creating the Android project **before** Gradle cache steps look for Gradle files;
- using normal Gradle/APK signing rather than JAR-only signing;
- APK Signature Scheme v2/v3 requirements on modern target SDKs;
- `zipalign` / `resources.arsc` alignment failures;
- diagnosing install failures with Termux, `aapt`, `apksigner`, and ADB;
- native Android notifications for HTML apps that need alerts while backgrounded or closed;
- keeping signing keys out of source control.

## Repository layout

```text
html2apk/
├── apps/                  # Individual APK projects
│   ├── meditation/
│   ├── ereader/
│   └── shoulder-timer/
├── templates/basic/       # Starting point for a new HTML app
├── docs/wiki/             # Wiki source-of-truth Markdown
└── .github/workflows/     # Build, release, and wiki automation
```

The generated `android/`, `www/`, `dist/`, `node_modules/`, signing keys, and local build artifacts are intentionally not committed.
