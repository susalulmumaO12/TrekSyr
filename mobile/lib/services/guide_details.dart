import 'package:dio/dio.dart';
import 'package:my_tourism_app/main.dart';

Future<Map<String, dynamic>?> getGuideDetails2(String token, num guideId) async {
  Dio dio = Dio();
  String forToken = 'Bearer $token';
  
  dio.options.headers = {
    'Authorization': forToken,
  };

  try {
    Response response = await dio.get("${url}/api/user/getGuide/$guideId");
    print('Response: ${response.data}');
    
    if (response.statusCode == 200 && response.data != null) {
      return response.data as Map<String, dynamic>;
    } else {
      print('Unexpected response format: ${response.data}');
      return null;
    }
  } on DioError catch (e) {
    if (e.response != null) {
      print("Error occurred: ${e.response!.statusCode} - ${e.response!.data}");
    } else {
      print("Error without response: ${e.message}");
    }
    return null;
  }
}
