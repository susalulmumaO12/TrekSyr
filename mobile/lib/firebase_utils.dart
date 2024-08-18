import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:dio/dio.dart';
import 'package:my_tourism_app/main.dart';

final dio = Dio();

Future<String?> getFcmToken() async {
  final fcmToken = await FirebaseMessaging.instance.getToken();
  print("FCM Token: $fcmToken");
  return fcmToken;
}

Future<void> postFcmToken(userId, fcmToken) async {
  try {
    final response = await dio.post(
      '${url}/api/mutual/fcmToken',
      data: {
        'token': fcmToken,
        'user_id': userId,
      },
    );
    print("FCM Token Response: ${response.data}");
  } catch (e) {
    print("Error posting FCM token: $e");
  }
}
