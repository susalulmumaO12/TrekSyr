import 'package:dio/dio.dart';
import 'package:my_tourism_app/main.dart';
import 'package:my_tourism_app/pages/home_navigation/home.dart';

class CategoryService {
  final Dio _dio = Dio();
  final String _baseUrl = '$url/api/mutual/categories/en';

  CategoryService(String token) {
    _dio.options.headers['Authorization'] = 'Bearer $token';
  }

  Future<List<Category>> fetchCategories() async {
    try {
      final response = await _dio.get(_baseUrl);
      if (response.statusCode == 200) {
        List<dynamic> data = response.data;

        return data.map((category) => Category.fromJson(category)).toList();
      } else {
        throw Exception('Failed to load categories');
      }
    } catch (e) {
      throw Exception('Failed to load categories: $e');
    }
  }
}