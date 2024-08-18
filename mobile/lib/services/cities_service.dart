import 'package:dio/dio.dart';
import 'package:my_tourism_app/main.dart';
import 'package:my_tourism_app/pages/home_navigation/home.dart';

class CityService {
  final Dio _dio = Dio();
  final String _baseUrl = '$url/api/mutual/cities/en';

  CityService(String token) {
    _dio.options.headers['Authorization'] = 'Bearer $token';
  }

  Future<List<City>> fetchCities() async {
    try {
      final response = await _dio.get(_baseUrl);
      if (response.statusCode == 200) {
        List<dynamic> data = response.data; // مباشرة استخدام data كونها قائمة من القاموس

        return data.map((city) => City.fromJson(city)).toList();
      } else {
        throw Exception('Failed to load cities');
      }
    } catch (e) {
      throw Exception('Failed to load cities: $e');
    }
  }
}
