import 'package:flutter/material.dart';
import 'package:userfront_flutter/userfront_flutter.dart';
import 'package:flutter_web_auth/flutter_web_auth.dart';

Userfront? userfront;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Replace with your tenant ID and domain. Use your live domain for
  // production apps, and your other domains for testing and development i.e http://localhost:3000.
  userfront = await Userfront.init("5nxgv76b", "https://c70nhc.csb.app");
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Userfront Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Userfront Flutter Login Demo'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({super.key, required this.title});

  late final Userfront userfront;

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
                onPressed: () async {
                  // Get the URL to open in a browser window for auth. This
                  // attaches the necessary query params to the URL for
                  // browser-based mobile app auth to function. It should be
                  // a URL that uses the Userfront Toolkit or Userfront Core JS
                  // library for auth. If the page uses the Toolkit or Core JS
                  // libraries, no additional changes are needed for mobile
                  // auth to work.
                  final url =
                      userfront!.createAuthUrl("https://c70nhc.csb.app/");

                  // FlutterWebAuth is a utility library that takes care of
                  // opening the browser and handling the "deep link" back to
                  // the mobile app after login.
                  // https://pub.dev/packages/flutter_web_auth
                  String result = "";
                  try {
                    result = await FlutterWebAuth.authenticate(
                        url: url, callbackUrlScheme: "userfront-flutter-demo");
                  } on Exception {
                    print(
                        'The user cancelled, declined, or failed to authenticate.');
                  }

                  // We need to grab the "authorization code" off the query
                  // parameters of the incoming redirect, to pass to the
                  // Userfront Flutter library so it can finish auth.
                  final authorizationCode =
                      Uri.parse(result).queryParameters["authorization_code"];
                  if (authorizationCode == null) {
                    print(
                        'Did not receive an authorization code from the server.');
                    return;
                  }

                  // Pass the "authorization code" back to the Userfront
                  // Flutter library so it can finish logging in and get tokens
                  // for this user. This method returns the tokens, and also
                  // stores them internally.
                  final tokens = await userfront!.finishAuth(authorizationCode);

                  // Now that the user is logged in, we can use the
                  // userfront.api.get, userfront.api.post etc. methods to
                  // interact with the Userfront Client-to-Server API
                  // (https://userfront.com/docs/api-client) and the
                  // Userfront Flutter library takes care of tokens and refresh
                  // for us.
                  final self = await userfront!.api.get("/self");
                  print('Successfully logged in!');
                },
                child: const Text("Log in via InAppBrowser"))
          ],
        ),
      ),
    );
  }
}
