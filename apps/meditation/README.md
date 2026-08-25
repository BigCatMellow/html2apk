# Meditation Guide

Android package: `com.bigcatmellow.meditation`

The original self-contained HTML source is stored losslessly as gzip/base64 parts under `source/packed/` so the repository can keep an exact snapshot without an enormous single GitHub write. The build script automatically reconstructs `www/index.html` before Capacitor runs.

To unpack an editable copy locally:

```bash
npm install
npm run unpack:source
```

To build through the shared repository workflow, use **Actions → Build APK → meditation**.

The app is largely self-contained. Its Google Fonts links are network typography; if unavailable, the CSS falls back to local/system fonts.
