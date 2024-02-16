# Userfront Flutter auth demo

This is a simple demo Flutter app that uses the `userfront_flutter` library for mobile authentication.

## Installation and setup

- Have the Flutter dev environment installed
  - Once the `flutter` command line tool is installed, use `flutter doctor` to check configuration
- Clone the repo
- Install packages: `flutter pub get`
- Set your workspace ID ([located in your dashboard](https://userfront.com/dashboard)) and live domain in `lib/main.dart` (line 12) or use those provided.
  - To use your own workspace and live domain make sure the url on line 63 is where your login form lives. [See userfront flutter docs](https://github.com/userfront/flutter#usage).
- Run the app in an iOS or Android emulator with `flutter run`
  - On MacOS, the VS Code Dart/Flutter plugin launches an iOS emulator connected to the running code in watch mode

## Concepts

There are two elements to mobile authentication with Userfront: the mobile app and the browser.

To sign on, the mobile app opens a browser session. This can be on your site's normal login page, or a special one for your mobile app - as long as it's using Userfront Toolkit pre-made forms, or using `@userfront/core` to power your customized auth UI, it works for mobile auth.

The browser authenticates with the Userfront API, and then deep links back to your mobile app, with an "authorization code" attached.

Your mobile app uses the authorization code to finish the sign-on.

Afterward, the user is signed in to the mobile app. Tokens are available to send to your servers. The `userfront_flutter` library manages interactions with the Userfront API and handles token refresh on your behalf.

## Files and areas to note

**`lib/main.dart`**

This is the application file. In this file, `userfront_flutter` is imported and used to complete a mobile authentication flow.

This example takes advantage of a third-party library, [`flutter_web_auth`](https://pub.dev/packages/flutter_web_auth), to handle opening the browser and receiving the incoming link to the mobile app. This is a good approach if you don't use in-app browser tabs or deep links elsewhere in your app. If you do, you might consider setting up the redirect to the browser and deep link back to the mobile app. The most important step is to extract the `authorization_code` query parameter and give it to `userfront.finishAuth(authorizationCode)`. After the `Future` returned by `userfront.finishAuth()` resolves, the user is logged in. You can obtain tokens from the `Future` or from the `userfront` instance. You can also interact with the Userfront API through the `userfront` instance, for example `userfront.api.get("/self")`, and the `userfront` instance will attach the JWT access token and refresh it as necessary.

**`android/app/src/main/AndroidManifest.xml`**

To enable deep linking with either `flutter_web_auth` or another library or mechanism, we need to add some entries to the `AndroidManifest.xml`. Note that `flutter_web_auth` and other deep links have two separate entries - only the one corresponding to the method you're using needs to be included.

**`ios/Runner/info.plist`**

To enable deep linking via a custom library or mechanism, we need to add some entries to the `info.plist`. If using `flutter_web_auth`, that library takes care of this for us.