import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:my_tourism_app/main.dart';
import 'package:my_tourism_app/pages/home_navigation/home.dart';
import 'package:my_tourism_app/pages/home_navigation/screens_tab_view.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:my_tourism_app/animation/pageTransitions.dart';
import 'package:my_tourism_app/screens/auth/Login.dart';
import 'package:my_tourism_app/screens/auth/Sign%20Up.dart';

class GetStarted extends StatefulWidget {
  const GetStarted({super.key});

  @override
  State<GetStarted> createState() => _GetStartedState();
}

class _GetStartedState extends State<GetStarted> {
  Future<String?> loginGuest() async {
    final dio = Dio();

    try {
      final response = await dio.get('$url/api/user/loginGuest');

      if (response.statusCode == 201) {
        final token = response.data['token'];
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('token', token);

        print('Guest session launched successfully. Token: $token');
        return token;
      } else {
        print(
            'Failed to launch guest session. Status code: ${response.statusCode}');
        return null;
      }
    } catch (e) {
      print('Error: $e');
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/t-a-h-i-t-i.png'),
            fit: BoxFit.cover,
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 35.0),
          child: Column(
            children: [
              Spacer(flex: 5),
              Row(
                children: [
                  Text(
                    "Let’s Get Started",
                    style: TextStyle(
                        fontFamily: 'Sora',
                        color: Colors.white,
                        fontSize: 25,
                        fontWeight: FontWeight.w600),
                  ),
                ],
              ),
              SizedBox(
                height: 30,
              ),
              Container(
                decoration: BoxDecoration(
                  color: Color(0xff47AEB5),
                  borderRadius: BorderRadius.circular(10),
                ),
                width: double.infinity,
                height: 50,
                child: MaterialButton(
                  onPressed: () {
                    Navigator.pushReplacement(
                        context, PageTransition(child: SignUp(), fade: true));
                  },
                  child: Text(
                    "Sign up",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 15,
                    ),
                  ),
                ),
              ),
              SizedBox(
                height: 12,
              ),
              Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(10),
                ),
                width: double.infinity,
                height: 50,
                child: MaterialButton(
                  onPressed: () {
                    Navigator.pushReplacement(
                        context, PageTransition(child: Login(), fade: true));
                  },
                  child: Text(
                    "Login",
                    style: TextStyle(
                      color: Color(0xff47AEB5),
                      fontSize: 15,
                    ),
                  ),
                ),
              ),
              SizedBox(
                height: 12,
              ),
              InkWell(
                onTap: () async {
                  String? token = await loginGuest();
                  if (token != null) {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                        builder: (context) => ScreensTabView(
                          token: token,
                          id: 0,
                        ),
                      ),
                    );
                  } else {
                    print('failed');
                  }
                },
                child: ClipRRect(
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                    child: Container(
                      height: 50,
                      width: double.infinity,
                      decoration: BoxDecoration(
                        color: Color.fromARGB(88, 255, 255, 255),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Center(
                        child: Text(
                          "Enter as a guest",
                          style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w500,
                              fontSize: 15),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              Spacer(flex: 1),
            ],
          ),
        ),
      ),
    );
  }
}
