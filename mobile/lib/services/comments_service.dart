import 'package:dio/dio.dart';
import 'package:my_tourism_app/main.dart';

Future<List<dynamic>> getComments(String? tokennn) async {
  Dio dio = Dio();
  String forToken = 'Bearer $tokennn';

  dio.options.headers = {
    'Authorization': forToken,
  };



  try {
    Response response = await dio.get("${url}/api/user/placeComments/15");
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

// import 'package:dio/dio.dart';
// import 'package:my_tourism_app/main.dart';

// class DioClient {
//   final Dio _dio = Dio();

//   DioClient() {
//     _dio.options.baseUrl = '${url}/api/';
//     _dio.options.headers = {
//       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiU3VuIEp1bCAwNyAyMDI0IDE0OjU4OjU3IEdNVCswMzAwIChHTVQrMDM6MDApIiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsImlhdCI6MTcyMDM1MzUzNywiZXhwIjoxNzIxNjQ5NTM3fQ.MnPgVZBpTSswHwoc0wkWgmbaEHmz4RqvMd9g6q4DHTY',
//     };
//   }

//   Future<List<dynamic>> fetchGuides() async {
//     try {
//       Response response = await _dio.get('user/getAllGuides/true');
//       return response.data;
//     } catch (e) {
//       print('Error: $e');
//       return [];
//     }
//   }
// }


// import 'package:dio/dio.dart';
// import 'package:my_tourism_app/main.dart';

//  getGuids(String? tokennn)async{
// Dio dio=Dio();
// String forToken;

// forToken='Bearer $tokennn';

// dio.options.headers={
//   'token':forToken
 
//   };

  
  
//   try{
//     Response response=await dio.get("${url}/api/user/getAllGuides/true");
//     print(response.data);
//     return response.data;
    
   
//   }on DioError catch(e){
//     print("error is:${e.response!.statusCode}");
//   }
  
//    }




// import 'package:dio/dio.dart';
// import 'package:my_tourism_app/main.dart';

// class NetworkService {
//   final Dio _dio = Dio();
  
//   Future<List<Map<String, dynamic>>> fetchComments() async {
//     //final String url = 'http://your_api_base_url/api/user/placeComments/15';
//     try {
//       final response = await _dio.get('{$url}/api/user/placeComments/15');
//       if (response.statusCode == 200) {
//         List<dynamic> data = response.data;
//         return data.map((item) => item as Map<String, dynamic>).toList();
//       } else {
//         throw Exception('Failed to load comments');
//       }
//     } on DioError catch (e) {
//       throw Exception('Failed to load comments: $e');
//     }
//   }
// }
