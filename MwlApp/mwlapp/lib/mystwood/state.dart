import 'dart:collection';

import 'package:flutter/material.dart';

import 'object.dart';

class MystwoodState extends ChangeNotifier {
  String _playerName = "";
  bool _isAuthenticating = false;
  final List<Character> _characters = [];
  final List<Player> _players = [];
  final List<Trait> _traits = [];
  
  String get playerName => _playerName;
  bool get isAuthenticating => _isAuthenticating;
  UnmodifiableListView<Character> get characters => UnmodifiableListView(_characters);
  UnmodifiableListView<Player> get players => UnmodifiableListView(_players);
  UnmodifiableListView<Trait> get traits => UnmodifiableListView(_traits);

  void setLogin(String name) {
    _playerName = name;
    _isAuthenticating = true;
    notifyListeners();
  }

  void clearLogin() {
    _playerName = "";
    _isAuthenticating = false;
    notifyListeners();
  }
}