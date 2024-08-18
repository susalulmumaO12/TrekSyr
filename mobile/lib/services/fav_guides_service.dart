import 'package:dio/dio.dart';
import 'package:my_tourism_app/main.dart';

class GuideService {
  final String token;

  GuideService(this.token);

 Future<List<Guide>> fetchfavGuides(num userId) async {
  final dio = Dio();
  dio.options.headers['Authorization'] = 'Bearer $token';
  
dio.options.validateStatus = (status) => status! < 500; // يعتبر أي حالة أقل من 500 على أنها صحيحة

  try {
    final response = await dio.get('$url/api/user/favoriteGuides/$userId');
    
    if (response.statusCode == 200) {
      List<dynamic> data = response.data;
      return data.map((json) => Guide.fromJson(json)).toList();
    } else if (response.statusCode == 404) {
      return [];
    } else {
      throw Exception('Failed to load Guides with status code: ${response.statusCode}');
    }
  } catch (e) {
    print('Error fetching Guides: $e');
    rethrow; 
  }
}

}

class Guide {
  final int guideId;
  final String fname;
  final String lcity;
  final double averageRating;
  final bool isFavorite;
  final String imageUrl;

  Guide({
    required this.guideId,
    required this.fname,
    required this.lcity,
    required this.averageRating,
    required this.isFavorite,
    required this.imageUrl,
  });

  factory Guide.fromJson(Map<String, dynamic> json) {
  return Guide(
    guideId: json['id'] ?? 0, 
    fname: json['first_name'] ?? '',
    lcity: json['last_name'] ?? '', 
    averageRating: json['average_rating'] != null ? double.parse(json['average_rating'].toString()) : 0.0,
    isFavorite: json['isFavorite'] == 1,
    imageUrl: json['image'] ?? '', 
  );
}

}
