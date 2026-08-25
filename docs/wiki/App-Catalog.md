# App Catalog

## Meditation Guide

- Folder: `apps/meditation`
- Package: `com.bigcatmellow.meditation`
- Type: single-file HTML app wrapped with Capacitor
- Notes: mobile/touch layout already existed before packaging; Google Fonts are optional network typography and fall back if offline.

## Mobile E-reader

- Folder: `apps/ereader`
- Package: `com.bigcatmellow.ereaderapp`
- Type: single-file HTML e-reader wrapped with Capacitor
- Notes: EPUB/PDF/advanced MOBI parsing in the current HTML can depend on CDN-loaded parser libraries, so complete offline format support is a separate enhancement.

## Shoulder Timer

- Folder: `apps/shoulder-timer`
- Package: `com.bigcatmellow.shouldertimer`
- Type: HTML/CSS/JS app with Capacitor Local Notifications
- Notes: native scheduled reminders supplement the fast in-app repeating alarm so alerts continue when the app is backgrounded or closed.

## APK storage policy

GitHub Actions artifacts are useful for test builds but expire. GitHub Releases are the intended permanent APK shelf. Use the **Publish APK Release** workflow when an APK is ready to keep.
