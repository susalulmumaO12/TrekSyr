import 'package:dio/dio.dart';
import 'package:my_tourism_app/main.dart';

class PlaceTripsService {
  final String token;

  PlaceTripsService(this.token);

  Future<List<Trip>> fetchPlaceTrips(num placeId) async {
    final dio = Dio();
    dio.options.headers['Authorization'] = 'Bearer $token';

    dio.options.validateStatus = (status) => status! < 500;

    try {
      final response = await dio.get('$url/api/user/placeTrips/$lang/$placeId');
      print(response.data);
      if (response.statusCode == 200) {
        List<dynamic> data = response.data;
        return data.map((json) => Trip.fromJson(json)).toList();
      } else if (response.statusCode == 404) {
        // إرجاع قائمة فارغة عند 404
        return [];
      } else {
        throw Exception(
            'Failed to load trips with status code: ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching places: $e');
      rethrow;
    }
  }
}

class Trip {
  final int tripId;
  final num guideId;
  final String name;
  final num price;
  final String starting_time;
  final num duration;
  final num available;
  final String image;
  Trip({
    required this.guideId,
    required this.tripId,
    required this.name,
    required this.price,
    required this.starting_time,
    required this.duration,
    required this.available,
    required this.image,
  });

  factory Trip.fromJson(Map<String, dynamic> json) {
  return Trip(
    tripId: json['trip_id'] ?? 0, // توفير قيمة افتراضية إذا كانت null
    name: json['name'] ?? '', // توفير قيمة افتراضية إذا كانت null
    price: json['price'] ?? 0, // توفير قيمة افتراضية إذا كانت null
    starting_time: json['starting_time'] ?? 0 ,
    duration: json['duration'] ?? 0,
    available: json['available'] ?? 0,
    image: json['image'] ?? '', guideId: json['guide_id'] ?? 0 , // توفير قيمة افتراضية إذا كانت null
  );
}

}
