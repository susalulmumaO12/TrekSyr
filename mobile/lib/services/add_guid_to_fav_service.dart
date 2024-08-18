import 'package:dio/dio.dart';
import 'package:my_tourism_app/main.dart';
import 'package:my_tourism_app/screens/auth/Sign%20Up.dart';

Future<int> AddGuidToFavService(
    num userId, num guideId, String? tokennn) async {
  Dio dio = Dio();
  String forToken = 'Bearer $tokennn';

  dio.options.headers = {
    'Authorization': forToken,
  };

  try {
    Response response = await dio.post(
      '${url}/api/user/favGuide',
      data: {
        "user_id": userId,
        "guide_id": guideId,
      },
      // Override the default validateStatus to allow all status codes
      options: Options(
        validateStatus: (status) {
          // Allow all status codes to be handled in response without throwing an exception
          return status != null;
        },
      ),
    );

    // Now, you can handle different status codes explicitly
    if (response.statusCode == 200) {
      return 200;
    } else if (response.statusCode == 204) {
      return 204;
    } else if (response.statusCode == 401) {
      return 401;
    } else {
      return response.statusCode ??
          400; // Use the actual status code or default to 400
    }
  } catch (e) {
    print("Error adding guide to fav: $e");
    return 500; // Handle any unexpected errors here
  }
}
