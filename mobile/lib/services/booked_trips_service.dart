import 'package:dio/dio.dart';
import 'package:my_tourism_app/main.dart';

Future<List<dynamic>> getBookedTrips(String? tokennn, num userId) async {
  Dio dio = Dio();
  String forToken = 'Bearer $tokennn';

  dio.options.headers = {
    'Authorization': forToken,
  };

  try {
    Response response = await dio.get("${url}/api/user/bookings/$lang/$userId");
    if (response.data is List) {
      return response.data;
    } else {
      return [];
    }
  } on DioError catch (e) {
    if (e.response != null && e.response!.statusCode == 404) {
      // إذا كانت حالة 404، قم برمي رسالة مخصصة
      throw 'Oops! you have not booked any trips!';
    } else {
      throw 'An unexpected error occurred: ${e.message}';
    }
  }
}


