# StarCraft TMG Companion — Android

- Android app: **StarCraft TMG Companion**
- Package ID: `com.bigcatmellow.starcrafttmg`
- Live UI: https://bigcatmellow.github.io/SC_TMG_CA/
- Source of truth: https://github.com/BigCatMellow/SC_TMG_CA

This is a thin Capacitor Android shell. It loads the *current* companion website inside the app rather than bundling a stale copy of the data, portraits and battle screens. Updates to the companion repo appear in this app without a new APK.

## Build

Go to the **Build APK** workflow in this repository, choose `starcraft-tmg`, and run it. Download the **starcraft-tmg-debug-apk** artifact. Unzip it and install `app-debug.apk` on Android.

For a signed, updateable release, use **Publish APK Release** once the repository's permanent signing secrets are configured. Choose `starcraft-tmg` and a version number. Do not distribute debug builds as stable updates: their signing certificate may change between CI runners.

## Important limitations

- Requires network access to load the companion. The local fallback only explains why it cannot connect.
- Roster/save state is held in the app WebView's browser storage. It is distinct from Chrome's storage. Save/export named rosters before uninstalling or clearing app data.
- The companion GitHub Pages deployment must be enabled and live before the APK is useful.
- Back navigation, file import/export, downloads and saved roster persistence should be exercised on a real Android phone before treating the package as a stable release.
