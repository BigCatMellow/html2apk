# HTML2APK Wiki

This wiki documents the repeatable process used to turn standalone HTML/CSS/JavaScript projects into Android APKs.

## Start here

- [How to Convert HTML to APK](How-to-Convert-HTML-to-APK)
- [Adding a New App](Adding-a-New-App)
- [Remote-Hosted Apps](Remote-Hosted-Apps)
- [Signing and App Updates](Signing-and-App-Updates)
- [Notifications and Background Alerts](Notifications-and-Background-Alerts)
- [Troubleshooting APK Installation](Troubleshooting-APK-Installation)
- [App Catalog](App-Catalog)

## Core rule

Use the normal Android toolchain for the final APK. Let Capacitor create the Android project and let Gradle build the package. Avoid manually repacking and JAR-signing APKs unless you are deliberately debugging package internals.

For APKs that must update an already-installed app over the long term, preserve the same private release signing key as well as the same package ID. A valid Gradle debug APK can still fail as an update if it was signed by a different debug keystore.

## Current projects

The repository currently tracks Meditation Guide, Mobile E-reader, Shoulder Timer, and Morning Edition. Each project lives under `apps/` and implements the common `npm run build:android-ci` command used by the repository workflows.

Morning Edition also demonstrates the remote-hosted pattern: the APK loads a live GitHub Pages site rather than bundling the main application HTML, so ordinary web updates do not require rebuilding the APK.
