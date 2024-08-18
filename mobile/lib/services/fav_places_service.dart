import 'package:dio/dio.dart';
import 'package:my_tourism_app/main.dart';

class PlaceService {
  final String token;

  PlaceService(this.token);

 Future<List<Place>> fetchFavPlaces(num userId) async {
  final dio = Dio();
  dio.options.headers['Authorization'] = 'Bearer $token';
  
dio.options.validateStatus = (status) => status! < 500; // يعتبر أي حالة أقل من 500 على أنها صحيحة

  try {
    final response = await dio.get('$url/api/user/favoritePlaces/$lang/$userId');
    
    if (response.statusCode == 200) {
      List<dynamic> data = response.data;
      return data.map((json) => Place.fromJson(json)).toList();
    } else if (response.statusCode == 404) {
      return [];
    } else {
      throw Exception('Failed to load places with status code: ${response.statusCode}');
    }
  } catch (e) {
    print('Error fetching places: $e');
    rethrow; // إعادة رمي الاستثناء للتعامل معه في مكان آخر
  }
}

}

class Place {
  final int placeId;
  final String name;
  final String city;
  final double averageRating;
  final bool isFavorite;
  final String imageUrl;

  Place({
    required this.placeId,
    required this.name,
    required this.city,
    required this.averageRating,
    required this.isFavorite,
    required this.imageUrl,
  });

  factory Place.fromJson(Map<String, dynamic> json) {
  return Place(
    placeId: json['place_id'] ?? 0, // توفير قيمة افتراضية إذا كانت null
    name: json['name'] ?? '', // توفير قيمة افتراضية إذا كانت null
    city: json['city'] ?? '', // توفير قيمة افتراضية إذا كانت null
    averageRating: json['average_rating'] != null ? double.parse(json['average_rating'].toString()) : 0.0,
    isFavorite: json['isFavorite'] == 1,
    imageUrl: json['image'] ?? '', // توفير قيمة افتراضية إذا كانت null
  );
}

}
