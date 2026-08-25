# HTML2APK Wiki

This wiki documents the repeatable process used to turn standalone HTML/CSS/JavaScript projects into Android APKs.

## Start here

- [How to Convert HTML to APK](How-to-Convert-HTML-to-APK)
- [Adding a New App](Adding-a-New-App)
- [Notifications and Background Alerts](Notifications-and-Background-Alerts)
- [Troubleshooting APK Installation](Troubleshooting-APK-Installation)
- [App Catalog](App-Catalog)

## Core rule

Use the normal Android toolchain for the final APK. Let Capacitor create the Android project and let Gradle build the package. Avoid manually repacking and JAR-signing APKs unless you are deliberately debugging package internals.

## Current projects

The repository currently tracks Meditation Guide, Mobile E-reader, and Shoulder Timer. Each project lives under `apps/` and implements the common `npm run build:android-ci` command used by the repository workflows.
