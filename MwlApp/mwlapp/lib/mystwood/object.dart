class MystwoodObject {}

class Character extends MystwoodObject {
  final String name;

  Character({
    required this.name
  });

  factory Character.fromJson(Map<String, dynamic> json) {
    return Character(
      name: json['name']
    );
  }
}

class Player extends MystwoodObject {}
class Trait extends MystwoodObject {}