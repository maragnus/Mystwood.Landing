import 'package:http/http.dart' as http;
import 'object.dart';

class MystwoodService {
  static const String endPoint = "https://localhost:5001/api/";

  Future<List<Player>> getPlayers() async {
    var response = await http.get(Uri.parse(endPoint + 'players'));
    if (response.statusCode != 200)
      return [];

    
    return [];
  }
}