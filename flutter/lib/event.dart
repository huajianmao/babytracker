import 'package:flutter/material.dart';

class Event {
  final String title;
  final String category;
  final String time;
  final Color color;
  final bool completed;

  Event({this.title, this.category, this.time, this.color, this.completed});
}