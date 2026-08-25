# Notifications and Background Alerts

Browser notifications are not the same as reliable Android alarms.

## Web-only behavior

JavaScript timers, `Notification`, AudioContext, and vibration can work while the WebView/page is active. Android may throttle or suspend them after the app is backgrounded, and they cannot be relied on after the app is fully closed.

## When to use native local notifications

Use Capacitor Local Notifications when an HTML app needs Android itself to schedule reminders.

The Shoulder Timer uses this pattern:

- the in-app alarm repeats every 8 seconds while its alert modal is active;
- Android local notifications are scheduled for each cook step;
- follow-up reminders are scheduled every 10 minutes for up to 3 hours;
- acknowledging/checking a step cancels its remaining native reminders;
- the app requests notification permission;
- precise schedules can require Android's Alarms & reminders / exact-alarm permission;
- a notification channel contains an actual bundled sound so alerts are audible on Android 8+.

## Why 10-minute background repeats

Android Doze limits how frequently exact idle-time alarms/notifications can wake an app. A 10-minute interval avoids trying to reproduce an 8-second browser alarm in the background, which Android is designed to prevent.

## Important implementation detail

On Android 8+, notification behavior belongs to a notification channel. If the channel is created without an appropriate sound, later notifications can vibrate but remain silent. Create the channel deliberately and change the channel ID when you need Android to treat materially different channel settings as new.

## Exact-alarm manifest patches

If a generated Android manifest needs a permission added by a script, insert it *inside* the `<manifest>` root element. Inserting XML before the opening `<manifest>` tag produces a manifest-merger parse failure during Gradle.
