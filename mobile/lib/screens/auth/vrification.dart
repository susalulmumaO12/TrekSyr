import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:my_tourism_app/main.dart';
import 'package:my_tourism_app/pages/home_navigation/screens_tab_view.dart';
import 'package:my_tourism_app/screens/otherScreens/tripdetails2.dart';
import 'package:pinput/pinput.dart';
import 'package:shared_preferences/shared_preferences.dart';

class VerificationCode extends StatefulWidget {
  const VerificationCode({super.key, required this.email,});
final String email;
  @override
  State<VerificationCode> createState() => _VerificationCodeState();
}

class _VerificationCodeState extends State<VerificationCode> {
  String verificationCode = ""; // متغير لتخزين الكود المدخل
  SharedPreferences? sharedPreferences;
  bool isUserLoggedIn=false;
  String? token;
  @override
  void initState(){
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) async {
     final SharedPreferences sharedPreferences=await SharedPreferences.getInstance() ;
      token= sharedPreferences.getString('token');
     if(token != null){
      isUserLoggedIn=true;
     }
     });
  }
  Widget build(BuildContext context) {
    final defaultPinTheme = PinTheme(
      width: 40,
      height: 60,
      textStyle: TextStyle(
        fontSize: 20,
        fontFamily: 'Inter',
      ),
      decoration: BoxDecoration(
        color: Color(0xffC9E7E9),
        borderRadius: BorderRadius.circular(6),
      ),
    );

    return Scaffold(
      backgroundColor: Color(0xffEEF7F8),
      body: Padding(
        padding: const EdgeInsets.only(left: 35.0, top: 70, right: 35),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Enter the code please",
              style: TextStyle(
                fontSize: 20,
                fontFamily: 'Inter',
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 30),
            Container(
              child: Pinput(
                length: 6,
                defaultPinTheme: defaultPinTheme,
                focusedPinTheme: defaultPinTheme.copyWith(
                  decoration: defaultPinTheme.decoration!.copyWith(
                    border: Border.all(color: Color.fromARGB(255, 99, 207, 214)),
                  ),
                ),
                onChanged: (value) {
                  setState(() {
                    verificationCode = value;
                    print(verificationCode) ;// تحديث المتغير بالقيمة المدخلة
                  });
                },
              ),
            ),
            SizedBox(height: 35),
            Container(
              decoration: BoxDecoration(
                color: Color(0xff47AEB5),
                borderRadius: BorderRadius.circular(10),
              ),
              width: double.infinity,
              height: 55,
              child: MaterialButton(
                onPressed: ()async {
                  // يمكنك استخدام verificationCode هنا
                  print(verificationCode);
                  verificationService();
                },
                child: Text(
                  "verify",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 15,
                  ),
                ),
              ),
            ),
            SizedBox(height: 11),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                TextButton(
                  onPressed: ()async {
                    sendCodeService();
                  },
                  child: Text(
                    "resend code?",
                    style: TextStyle(
                      color: Color(0xff47AEB5),
                      fontSize: 11,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
  verificationService() async {
  if (kDebugMode) {
    print("email=${widget.email}");
    print("code=${verificationCode}");
  }
  Dio dio = Dio();
  try {
    Response response = await dio.post(
      "${url}/api/users/verifyUser",
      data: {
        'email': widget.email,
        'code':verificationCode,
      },
    );

    if (response.statusCode == 200) {
      var data = response.data;
      String token = data['token'];
      String message = data['message'];
      num userId=data['user_id'];
      // حفظ التوكن في SharedPreferences
      SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
      await sharedPreferences.setString('token', token);

      if (kDebugMode) {
        print("token: $token");
        print("message: $message");
      }

      // عرض رسالة النجاح
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(message),
          backgroundColor: Colors.green,
          behavior: SnackBarBehavior.floating,
        ),
      );

      // // الانتقال إلى الشاشة التالية بعد تسجيل الدخول الناجح
      Navigator.pushReplacement(
        context,
      // MaterialPageRoute(builder: (context) => ResetPassword(token: token,))
       //MaterialPageRoute(builder: (context) => Profile(userId: userId, token: token,)),
        MaterialPageRoute(builder: (context) => ScreensTabView(token: token, id: userId,)),
      );

    } else {
      // معالجة حالة الاستجابة غير الناجحة
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Check your email or password and try again."),
          backgroundColor: Colors.red,
          behavior: SnackBarBehavior.floating,
        ),
      );
    }
  } on DioError catch (e) {
    // عرض رسالة الخطأ في حالة حدوث استثناء
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text("An error occurred: ${e.response?.data['error']}"),
        backgroundColor: Colors.red,
        behavior: SnackBarBehavior.floating,
      ),
    );
    if (kDebugMode) {
      print("Error from server: $e");
    }
  }
}

sendCodeService() async {
  if (kDebugMode) {
    print("email=${widget.email}");
  }
  Dio dio = Dio();
  try {
    Response response = await dio.post(
      "${url}/api/users/sendCode",
      data: {
        'email': widget.email,
        
      },
    );

    if (response.statusCode == 200) {
      var data = response.data;
      String message = data['message'];


      if (kDebugMode) {
        print("message: $message");
      }

      // عرض رسالة النجاح
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(message),
          backgroundColor: Colors.green,
          behavior: SnackBarBehavior.floating,
        ),
      );

      
     

    } else {
      // معالجة حالة الاستجابة غير الناجحة
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Check your email or password and try again."),
          backgroundColor: Colors.red,
          behavior: SnackBarBehavior.floating,
        ),
      );
    }
  } on DioError catch (e) {
    // عرض رسالة الخطأ في حالة حدوث استثناء
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text("An error occurred: ${e.response?.data['error']}"),
        backgroundColor: Colors.red,
        behavior: SnackBarBehavior.floating,
      ),
    );
    if (kDebugMode) {
      print("Error from server: $e");
    }
  }
}
}
