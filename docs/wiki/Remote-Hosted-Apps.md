# Remote-Hosted Apps

Some HTML apps should not bundle their main interface into the APK. Instead, the Android app can act as a thin shell around a live HTTPS site such as GitHub Pages.

Morning Edition uses this pattern.

## When to use it

Use a remote-hosted wrapper when:

- the web interface already lives at a stable HTTPS URL;
- you want website changes to appear in the Android app immediately;
- the APK does not need to work fully offline;
- the hosted page is the source of truth.

For apps that must work offline, need bundled files, or depend on native integrations, use the normal bundled-web-assets pattern instead.

## Capacitor configuration

Example:

```json
{
  "appId": "com.example.myapp",
  "appName": "My App",
  "webDir": "www",
  "server": {
    "url": "https://example.github.io/My_App/",
    "cleartext": false
  }
}
```

The `server.url` value tells the Capacitor WebView to load the hosted page as the app's main interface.

A small local `www/index.html` should still exist so Capacitor has valid web assets during project creation. It can simply explain that the app requires an internet connection.

## Update behavior

There are two separate kinds of updates:

1. **Web/content update:** push a new `index.html`, CSS, JavaScript, or data to the hosted site. The installed APK shows the new version the next time it loads the page. No APK rebuild is required.
2. **Native APK update:** changes to the package ID, permissions, Capacitor/native plugins, app icon, Android behavior, or signing/version metadata still require a new APK release.

This is useful for frequently changing content apps such as dashboards, newspapers, lightweight account interfaces, and hosted tools.

## Tradeoffs

Advantages:

- one web interface serves both browser and Android;
- web changes deploy instantly;
- APK source stays very small;
- no need to rebuild the APK for ordinary HTML/CSS/JS content changes.

Limitations:

- requires network access for the main interface;
- if the hosted site is unavailable, the app is unavailable;
- external navigation and browser/WebView behavior should be tested;
- native features still require an APK update.

## Morning Edition example

- Hosted site: `https://bigcatmellow.github.io/Morning_Edition/`
- APK folder: `apps/morning-edition`
- Package ID: `com.bigcatmellow.morningedition`
- App name: `Morning Edition`

The Morning Edition repository remains responsible for the newspaper itself. HTML2APK only contains the Android shell and build/release instructions.
