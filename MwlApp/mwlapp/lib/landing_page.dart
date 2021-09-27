import 'package:flutter/material.dart';
import 'package:mwlapp/mystwood/state.dart';
import 'package:provider/provider.dart';

class LandingPage extends StatelessWidget {
  const LandingPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Consumer<MystwoodState>(builder: (context, state, child) {
      return Scaffold(
        body: Container(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage("assets/splash.webp"),
              fit: BoxFit.cover,
            ),
          ),
          child: Column(children: [
            Expanded(
                flex: 1,
                child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Image.asset("assets/logo.webp", fit: BoxFit.contain),
                      const Text("Loading Mystwood Landing...")
                    ])),
            const Expanded(flex: 3, child: Text("bottom"))
          ]),
        ),
      );
    });
  }
}
