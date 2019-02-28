import 'package:babytracker/diagonal_clipper.dart';
import 'package:flutter/material.dart';

void main() => runApp(BabyTracker());

class BabyTracker extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Baby Tracker',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new MainPage(),
    );
  }
}
class MainPage extends StatefulWidget {
  MainPage({Key key}) : super(key: key);

  @override
  _MainPageState createState() => new _MainPageState();
}

class _MainPageState extends State<MainPage> {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      body: new Stack(
        children: <Widget>[
          _buildIamge()
        ],
      ),
    );
  }

  Widget _buildIamge() {
    return new ClipPath(
      clipper: new DialogonalClipper(),
      child: new Image.asset(
        'images/banner.jpg',
        fit: BoxFit.fitWidth,
        colorBlendMode: BlendMode.srcOver,
        color: new Color.fromARGB(120, 20, 10, 40),
      ),
    );
  }
}