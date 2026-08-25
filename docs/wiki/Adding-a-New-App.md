# Adding a New App

## Fast path

1. Copy `templates/basic` to `apps/<new-app>`.
2. Replace its example `index.html` with the real app.
3. Change `appId` and `appName` in `capacitor.config.json`.
4. Change the package name/description in `package.json`.
5. Add the new app slug to the choices and matrix in `.github/workflows/build-apk.yml`.
6. Add it to `.github/workflows/publish-apk-release.yml`.
7. Add it to the README and App Catalog.
8. Push and verify the GitHub Actions build before treating the APK as good.

## Package IDs

Use a stable unique ID such as:

```text
com.bigcatmellow.myapp
```

Changing a package ID makes Android treat it as a separate app. Reusing another app's package ID can cause installation/update conflicts.

## Simple vs advanced projects

A simple single-file project can copy its HTML into `www/` and use Capacitor directly.

An advanced project can use Vite, multiple CSS/JS files, Capacitor plugins, Android manifest patches, notification channels, custom sounds, or other native pieces. It should still expose the same command:

```bash
npm run build:android-ci
```

That common command is what allows one repository-level workflow to build every app.

## Before adding native features

Prefer web code when the feature works reliably inside the app. Add a native plugin when Android needs to keep doing something after the web view is backgrounded or closed, or when the web API is too restricted for the intended behavior.
