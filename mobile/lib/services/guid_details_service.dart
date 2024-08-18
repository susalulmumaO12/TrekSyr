import 'package:dio/dio.dart';
import 'package:my_tourism_app/main.dart';

getGuideDetails(String? tokennn,num id) async {
  Dio dio = Dio();
  String forToken = 'Bearer $tokennn';

  dio.options.headers = {
    'Authorization': forToken,
  };
Response response = await dio.get("${url}/api/user/getGuide/${id}");
  return response.data;
  
}
