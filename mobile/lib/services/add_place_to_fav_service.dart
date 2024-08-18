import 'package:dio/dio.dart';
import 'package:my_tourism_app/main.dart';
import 'package:my_tourism_app/screens/auth/Sign%20Up.dart';

Future<int> AddPlaceToFavService(num userId, num placeId,String? tokennn) async {
  Dio dio = Dio();
  String forToken = 'Bearer $tokennn';

  dio.options.headers = {
    'Authorization': forToken,
  };
  try {
    Response response = await dio.post(
      '${url}/api/user/favPlace',
      data: {
        "user_id": userId,
        "place_id": placeId,
        
      },
      // Override the default validateStatus to always return true (don't throw exceptions)
     // options: Options(validateStatus: (status) => true),
    );

    if (response.statusCode == 200) {

      return 200;
    } else if(response.statusCode == 204){
      return 204;
    } else{
      return 400;
    }
  } catch (e) {
    print("Error adding place to fav: $e");
    return 500; // Handle any unexpected errors here
  }
}
