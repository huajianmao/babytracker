import 'package:babytracker/event.dart';
import 'package:babytracker/event_row.dart';
import 'package:flutter/material.dart';

class ListModel {
  ListModel(this.listKey, items) : this.items = new List.of(items);

  final GlobalKey<AnimatedListState> listKey;
  final List<Event> items;

  AnimatedListState get _animatedList => listKey.currentState;

  void insert(int index, Event item) {
    items.insert(index, item);
    _animatedList.insertItem(index, duration: new Duration(milliseconds: 150));
  }

  Event removeAt(int index) {
    final Event removedItem = items.removeAt(index);
    if (removedItem != null) {
      _animatedList.removeItem(
          index,
              (context, animation) => new EventRow (
            event: removedItem,
            animation: animation,
          ),
          duration: new Duration(milliseconds: (150 + 200*(index/length)).toInt())
      );
    }
    return removedItem;
  }

  int get length => items.length;

  Event operator [](int index) => items[index];

  int indexOf(Event item) => items.indexOf(item);
}