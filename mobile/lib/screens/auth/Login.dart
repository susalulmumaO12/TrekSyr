import 'dart:core';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:my_tourism_app/animation/pageTransitions.dart';
import 'package:my_tourism_app/main.dart';
import 'package:my_tourism_app/pages/comments_screen.dart';
import 'package:my_tourism_app/pages/home_navigation/screens_tab_view.dart';
import 'package:my_tourism_app/screens/onBoardings/getStarted.dart';
import 'package:my_tourism_app/screens/otherScreens/GuidsScreen.dart';
import 'package:my_tourism_app/screens/otherScreens/pickImage.dart';
import 'package:my_tourism_app/screens/otherScreens/resetPassword.dart';
import 'package:my_tourism_app/screens/otherScreens/tripdetails2.dart';
import 'package:my_tourism_app/screens/auth/ForgetPassword.dart';
import 'package:my_tourism_app/screens/auth/Sign%20Up.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:my_tourism_app/screens/otherScreens/profile.dart';
import 'package:my_tourism_app/firebase_utils.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  var emailController = TextEditingController();
  var passwordController = TextEditingController();
  bool keepMeLoggedIn = false;
  bool secure = true;
  SharedPreferences? sharedPreferences;
  bool isUserLoggedIn = false;
  String? token;
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) async {
      final SharedPreferences sharedPreferences =
          await SharedPreferences.getInstance();
      token = sharedPreferences.getString('token');
      if (token != null) {
        isUserLoggedIn = true;
      }
    });
  }

  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
            image: DecorationImage(
                image: AssetImage(
                  "assets/Login.png",
                ),
                fit: BoxFit.cover)),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 34),
          child: Column(
            children: [
              Spacer(
                flex: 1,
              ),
              Row(
                children: [
                  Text(
                    "Login",
                    style: TextStyle(
                        fontSize: 30,
                        fontFamily: 'Inter',
                        fontWeight: FontWeight.w600),
                  ),
                ],
              ),
              SizedBox(
                height: 40,
              ),
              SizedBox(
                height: 13,
              ),
              TextFormField(
                cursorColor: Colors.white24,
                controller: emailController,
                onFieldSubmitted: (String value) {
                  print(value);
                },
                onChanged: (String value) {
                  print(value);
                },
                keyboardType: TextInputType.emailAddress,
                decoration: InputDecoration(
                    filled: true,
                    fillColor: Color(0xffC9E7E9),
                    hintText: 'Email',
                    hintStyle:
                        const TextStyle(color: Colors.white, fontSize: 15),
                    enabledBorder: OutlineInputBorder(
                      borderSide: const BorderSide(
                        color: Colors.white24,
                      ),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: const BorderSide(
                        color: Colors.white24,
                      ),
                    ),
                    prefixIcon: Padding(
                      padding: const EdgeInsets.only(left: 20.0, right: 10),
                      child: Icon(
                        Icons.email,
                        size: 18,
                        color: Colors.white,
                      ),
                    )),
              ),
              SizedBox(
                height: 13,
              ),
              TextFormField(
                cursorColor: Colors.white24,
                controller: passwordController,
                onFieldSubmitted: (String value) {
                  print(value);
                },
                onChanged: (String value) {
                  print(value);
                },
                obscureText: secure,
                keyboardType: TextInputType.visiblePassword,
                decoration: InputDecoration(
                    suffixIcon: Padding(
                      padding: const EdgeInsets.only(right: 8.0),
                      child: IconButton(
                        iconSize: 20,
                        onPressed: () {
                          setState(() {
                            secure = !secure;
                          });
                        },
                        icon: Icon(
                          secure ? Icons.visibility_off : Icons.visibility,
                          color: Color(0xff47AEB5),
                        ),
                      ),
                    ),
                    filled: true,
                    fillColor: Color(0xffC9E7E9),
                    hintText: 'Password',
                    hintStyle:
                        const TextStyle(color: Colors.white, fontSize: 15),
                    enabledBorder: OutlineInputBorder(
                      borderSide: const BorderSide(
                        color: Colors.white24,
                      ),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: const BorderSide(
                        color: Colors.white24,
                      ),
                    ),
                    prefixIcon: Padding(
                      padding: const EdgeInsets.only(left: 20.0, right: 10),
                      child: Icon(
                        Icons.lock_rounded,
                        size: 18,
                        color: Colors.white,
                      ),
                    )),
              ),
              SizedBox(
                height: 13,
              ),
              Row(
                children: [
                  Checkbox(
                      //visualDensity: VisualDensity.compact,
                      side: BorderSide(color: Color(0xff47AEB5), width: 1),
                      //fillColor: MaterialStatePropertyAll(Colors.amber),
                      activeColor: Color(0xff47AEB5),
                      checkColor: Colors.white,
                      value: keepMeLoggedIn,
                      onChanged: (value) {
                        setState(() {
                          keepMeLoggedIn = value!;
                        });
                      }),
                  const Text(
                    'Remember Me',
                    style: TextStyle(
                      color: Color(0xff47AEB5),
                      fontSize: 10,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
              SizedBox(
                height: 16,
              ),
              Container(
                decoration: BoxDecoration(
                  color: Color(0xff47AEB5),
                  borderRadius: BorderRadius.circular(10),
                ),
                width: double.infinity,
                height: 55,
                child: MaterialButton(
                  onPressed: () async {
                    //print('omar');
                    if (emailController.text.isEmpty ||
                        passwordController.text.isEmpty) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text("Both email and password are required"),
                          backgroundColor: Colors.red,
                          behavior: SnackBarBehavior.floating,
                        ),
                      );
                      return;
                    }
                    loggingIn();
                  },
                  child: Text(
                    "Login",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 15,
                    ),
                  ),
                ),
              ),
              SizedBox(
                height: 13,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    "don't have an account?",
                    style: TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 10,
                        fontWeight: FontWeight.bold),
                  ),
                  SizedBox(
                    width: 3,
                  ),
                  InkWell(
                    onTap: () {
                      Navigator.pushReplacement(
                          context, PageTransition(child: SignUp(), fade: true));
                    },
                    child: Text(
                      "Sign Up",
                      style: TextStyle(
                          decoration: TextDecoration.underline,
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          fontFamily: 'Inter',
                          color: Color(0xff47AEB5)),
                    ),
                  ),
                ],
              ),
              SizedBox(
                height: 11,
              ),
              InkWell(
                onTap: () {
                  Navigator.push(context,
                      PageTransition(child: ForgetPassword(), fade: true));
                },
                child: Text(
                  "Forget password?",
                  style: TextStyle(
                      fontSize: 9,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Inter',
                      color: Color(0xff47AEB5)),
                ),
              ),
              Spacer(
                flex: 1,
              ),
            ],
          ),
        ),
      ),
    );
  }

  loggingIn() async {
  if (kDebugMode) {
    print("email=${emailController.text}");
    print("password=${passwordController.text}");
  }

  Dio dio = Dio();
  try {
    Response response = await dio.post(
      "${url}/api/users/loginUser",
      data: {
        'email': emailController.text,
        'login_password': passwordController.text,
      },
    );

    if (!mounted) return; // تأكد أن الـ widget لا يزال موجودًا

    if (response.statusCode == 200) {
      var data = response.data;
      String token = data['token'];
      String message = data['message'];
      num userId = data['user_id'];

      // حفظ التوكن في SharedPreferences
      SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
      await sharedPreferences.setString('token', token);

      final fcmToken = await getFcmToken();
      if (fcmToken != null && userId != null) {
        await postFcmToken(userId, fcmToken);
      } else {
        print("FCM Token or User ID is null");
      }

      if (kDebugMode) {
        print("token: $token");
        print("message: $message");
        print("id: $userId");
      }

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(message),
            backgroundColor: Colors.green,
            behavior: SnackBarBehavior.floating,
          ),
        );

        // الانتقال إلى الشاشة التالية بعد تسجيل الدخول الناجح
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => ScreensTabView(
              token: token,
              id: userId,
            ),
          ),
        );
      }
    } else {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text("Check your email or password and try again."),
            backgroundColor: Colors.red,
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    }
  } on DioError catch (e) {
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("please enter a valid email and password"),
          backgroundColor: Colors.red,
          behavior: SnackBarBehavior.floating,
        ),
      );
    }
    if (kDebugMode) {
      print("Error from server: $e");
    }
  }
}

}
