import 'package:dio/dio.dart';
import 'package:my_tourism_app/main.dart';

Future<List<dynamic>> getGuidsComments(String? tokennn, num id) async {
  Dio dio = Dio();
  String forToken = 'Bearer $tokennn';

  dio.options.headers = {
    'Authorization': forToken,
  };



  try {
    Response response = await dio.get("${url}/api/user/guideComments/${id}");
    print(response.data);
    if (response.data is List) {
      return response.data;
    } else {
      print('Unexpected response format: ${response.data}');
      return [];
    }
  } on DioError catch (e) {
    print("error is: ${e.response!.statusCode}");
    return [];
  }
}