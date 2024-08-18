import 'package:dio/dio.dart';
import 'package:my_tourism_app/main.dart';
import 'package:my_tourism_app/screens/auth/Sign%20Up.dart';

Future<bool> SignUpService(String firstName, String lastName, String email, String phoneNumber, String password) async {
  Dio dio = Dio();

  try {
    Response response = await dio.post(
      '${url}/api/users/registerUser',
      data: {
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "phone_number": phoneNumber,
        "password": password,
      },
      // Override the default validateStatus to always return true (don't throw exceptions)
      options: Options(validateStatus: (status) => true),
    );

    if (response.statusCode == 201) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    print("Error registering user: $e");
    return false; // Handle any unexpected errors here
  }
}
