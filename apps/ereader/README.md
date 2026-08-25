# Mobile E-reader

Android packaging home for the single-file Mobile E-reader HTML app.

- Package ID: `com.bigcatmellow.ereaderapp`
- App name: `Mobile E-reader`
- Source format: one self-contained HTML file, stored losslessly as gzip+base64 parts under `source/packed/`
- Build system: Capacitor + Gradle

## Build

From this directory:

```bash
npm install
npm run build:android-ci
```

The APK is produced at:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

To restore the original HTML as `source/index.html`:

```bash
npm run unpack:source
```

Some EPUB/PDF/MOBI parser libraries used by the original web app may still require network access; this Android wrapper preserves the web app's existing behavior rather than silently replacing those libraries.
