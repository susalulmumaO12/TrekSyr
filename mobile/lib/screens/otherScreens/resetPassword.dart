import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:my_tourism_app/main.dart';

class ResetPassword extends StatefulWidget {
  const ResetPassword({super.key, required this.token});
  final String token;


  @override
  State<ResetPassword> createState() => _ResetPasswordState();
}

class _ResetPasswordState extends State<ResetPassword> {
  bool secure = true;
  bool secure2 = true;
  var currentpasswordController = TextEditingController();
  var newpasswordController = TextEditingController();
   var emailController = TextEditingController();
   final _formKey = GlobalKey<FormState>();
   final _formKeyy = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
       backgroundColor: Color(0xffEEF7F8),
       body: Padding(padding: EdgeInsets.only(left: 36,right: 36,top: 36,),
       child: Column(
        children: [
          Row(
                              children: [
                                InkWell(
                                  onTap: () {
                                    Navigator.pop(context);
                                  },
                                  child: Container(
                                    height: 38,
                                    width: 38,
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(10),
                                      boxShadow: [
                                        BoxShadow(
                                            color: Colors.black
                                                .withOpacity(0.05),
                                            blurRadius: 10),
                                      ],
                                      color: Colors.white,
                                    ),
                                    child: const Icon(
                                      Icons.arrow_back_ios_new,
                                      color: Color(0xff47AEB5),
                                      size: 18,
                                    ),
                                  ),
                                ),
                                const Expanded(
                                  child: Text(
                                    'Reset Password',
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                        //color: MyColors.black,
                                        fontSize: 20,
                                        fontWeight: FontWeight.w500),
                                  ),
                                ),
                              ],
                            ),
                            SizedBox(
                              height: 30,
                            ),
          Text(
            'please enter your email, your current and new password',
            style: TextStyle(
              fontSize: 14,
              fontFamily: 'Inter',
              fontWeight: FontWeight.bold
            ),
          ),
          SizedBox(height: 30,),
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
                    hintStyle: const TextStyle(color: Colors.white, fontSize: 15),
                    enabledBorder: OutlineInputBorder(
                      borderSide: const BorderSide(color: Colors.white24),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: const BorderSide(color: Colors.white24),
                    ),
                    prefixIcon: Padding(
                      padding: const EdgeInsets.only(left: 20.0, right: 10),
                      child: Icon(Icons.email, size: 18, color: Colors.white),
                    ),
                  ),
                ),
                SizedBox(height: 13),
                Form(
                  key: _formKey,
                  autovalidateMode: AutovalidateMode.always,
                  child: TextFormField(
                    cursorColor: Colors.white24,
                    controller: currentpasswordController,
                    onFieldSubmitted: (String value) {
                      print(value);
                    },
                    onChanged: (String value) {
                      print(value);
                    },
                    obscureText: secure,
                    // validator: (value) {
                    //   if (value!.length < 8) {
                    //     return 'it must be at least 8 characters';
                    //   }
                    //   return null;
                    // },
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
                      hintText: 'Current Password',
                      hintStyle: const TextStyle(color: Colors.white, fontSize: 15),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.white24),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(color: Colors.white24),
                      ),
                      prefixIcon: Padding(
                        padding: const EdgeInsets.only(left: 20.0, right: 10),
                        child: Icon(Icons.lock_rounded, size: 18, color: Colors.white),
                      ),
                    ),
                  ),
                ),
                SizedBox(height: 13),
                Form(
                  key: _formKeyy,
                  autovalidateMode: AutovalidateMode.always,
                  child: TextFormField(
                    cursorColor: Colors.white24,
                    controller: newpasswordController,
                    onFieldSubmitted: (String value) {
                      print(value);
                    },
                    onChanged: (String value) {
                      print(value);
                    },
                    obscureText: secure2,
                    validator: (value) {
                      if (value!.length < 8) {
                        return 'it must be at least 8 characters';
                      }
                      return null;
                    },
                    decoration: InputDecoration(
                      suffixIcon: Padding(
                        padding: const EdgeInsets.only(right: 8.0),
                        child: IconButton(
                          iconSize: 20,
                          onPressed: () {
                            setState(() {
                              secure2 = !secure2;
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
                      hintText: 'New Password',
                      hintStyle: const TextStyle(color: Colors.white, fontSize: 15),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.white24),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(color: Colors.white24),
                      ),
                      prefixIcon: Padding(
                        padding: const EdgeInsets.only(left: 20.0, right: 10),
                        child: Icon(Icons.lock_rounded, size: 18, color: Colors.white),
                      ),
                    ),
                  ),
                ),
                SizedBox(height: 16),
                Container(
              decoration: BoxDecoration(
                color: Color(0xff47AEB5),
                borderRadius: BorderRadius.circular(10),

              ),
              width: double.infinity,
              height: 55,
              child: MaterialButton(onPressed: (){
                resetPassword();
               // resetName();
               //resetemail();
             //  profilePic();
              },
              child: Text("Reset Password",style: TextStyle(
                color: Colors.white,
                fontSize: 15,
              ),),
              ),
             ),
        ],
       ),
       ),
    );
  }
   Future<void> resetPassword() async {
    if (kDebugMode) {
      print("email=${emailController.text}");
      print("current_password=${currentpasswordController.text}");
      print("new_password=${newpasswordController.text}");
    }

    Dio dio = Dio();
    String tokenn = widget.token;
    String forToken = 'Bearer $tokenn';

    dio.options.headers = {
      'Authorization': forToken,
    };

    try {
      Response response = await dio.post(
        "${url}/api/users/resetPassword",
        data: {
          'email': emailController.text,
          'current_password': currentpasswordController.text,
          'new_password': newpasswordController.text,
        },
      );

      if (response.statusCode == 200) {
        var data = response.data;
        String message = data['message'];

        // عرض رسالة النجاح
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(message),
            backgroundColor: Colors.green,
            behavior: SnackBarBehavior.floating,
          ),
        );

        // الانتقال إلى الشاشة التالية بعد تسجيل الدخول الناجح
        // Navigator.pushReplacement(
        //   context,
        //   MaterialPageRoute(builder: (context) => Profile(userId: userId, token: token,)),
        // );
      } else {
        var data = response.data;
        String message = data['message'];
        // معالجة حالة الاستجابة غير الناجحة
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(message),
            backgroundColor: Colors.red,
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    } on DioError catch (e) {
      String? errorMessage = "Unknown error occurred";

      if (e.response != null && e.response?.data != null) {
        if (e.response?.data['message'] != null) {
          errorMessage = e.response?.data['message'];
        } else {
          errorMessage = e.response!.data.toString();
        }
      } else {
        errorMessage = e.message;
      }

      // عرض رسالة الخطأ في حالة حدوث استثناء
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(errorMessage!),
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