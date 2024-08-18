import 'package:dio/dio.dart';
import 'package:my_tourism_app/main.dart';
import 'package:my_tourism_app/screens/auth/Sign%20Up.dart';

Future<bool> ForgetPasswordService(String email) async {
  Dio dio = Dio();

  try {
    Response response = await dio.post(
      '${url}/api/users/sendPassword',
      data: {
        "email": email,
      },
      // Override the default validateStatus to always return true (don't throw exceptions)
      options: Options(validateStatus: (status) => true),
    );

    if (response.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    print("Error registering user: $e");
    return false; // Handle any unexpected errors here
  }
}
