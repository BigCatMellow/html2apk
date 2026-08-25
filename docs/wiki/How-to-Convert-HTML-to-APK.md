# How to Convert HTML to APK

The standard HTML2APK path uses Capacitor as the native wrapper and Gradle as the final Android builder.

## 1. Make the web app mobile-safe

At minimum, the HTML should include a mobile viewport:

```html
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
```

Use relative asset paths and avoid assuming a desktop-sized viewport. `env(safe-area-inset-*)` is useful for phones with cutouts and gesture navigation.

## 2. Give the Android app an identity

Create `capacitor.config.json`:

```json
{
  "appId": "com.bigcatmellow.example",
  "appName": "Example App",
  "webDir": "www",
  "server": { "androidScheme": "https" }
}
```

The package ID must be unique for every app you want installed at the same time.

## 3. Install Capacitor

A basic project needs:

```bash
npm install @capacitor/core @capacitor/android
npm install -D @capacitor/cli
```

## 4. Prepare the web directory

For a one-file app, copy `index.html` into `www/index.html`. More complex apps may use Vite or another web build step and set `webDir` to `dist`.

## 5. Create Android before building Android

```bash
npx cap add android
cd android
./gradlew assembleDebug
```

The resulting debug APK is normally:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 6. Let Gradle sign and align the APK

This is important. A normal Gradle debug build produces an APK with Android-compatible signing and alignment. Do not take a built APK apart and re-sign it with only the old JAR/v1 signature scheme.

## GitHub Actions

This repository standardizes each project on:

```bash
npm run build:android-ci
```

The shared **Build APK** workflow installs Node and Java, runs that command inside the selected app folder, and uploads `app-debug.apk`.

## Things that should not be committed

- `node_modules/`
- generated `android/` folders unless there is a specific reason to version them
- debug/release APKs in normal source history
- private signing keys
- signing passwords

Use GitHub Releases for permanent APK downloads instead.
