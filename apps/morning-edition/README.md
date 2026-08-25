# Morning Edition

Thin Android shell for the live GitHub Pages site:

`https://bigcatmellow.github.io/Morning_Edition/`

Package ID: `com.bigcatmellow.morningedition`

## Why this app is different

The Morning Edition content is **not bundled into the APK**. Capacitor is configured to load the live GitHub Pages URL directly. That means changes pushed to `Morning_Edition/index.html` appear in the Android app without publishing a new APK.

A small local `index.html` exists only as a fallback/build asset. The normal app experience depends on an internet connection.

Use this pattern for apps where GitHub Pages should remain the source of truth and the APK is primarily a launcher/native shell around the hosted interface.
