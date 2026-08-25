# Shoulder Timer

Android packaging home for the pork shoulder cook planner.

- Package ID: `com.bigcatmellow.shouldertimer`
- App name: `Shoulder Timer`
- Build system: Vite + Capacitor + Gradle
- Native feature: Capacitor Local Notifications
- Exact alarms: requested for cook-step timing
- Notification behavior: high-priority sound/vibration reminders repeat every 10 minutes for up to 3 hours until the step is acknowledged
- In-app alarm: repeats every 8 seconds while the app is active until acknowledged

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

The Android project is generated fresh for every CI build. `scripts/patch-android.mjs` adds the exact-alarm permission and generates the bundled `shoulder_alarm.wav` notification sound after Capacitor creates the project.
