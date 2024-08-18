import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:my_tourism_app/main.dart';
import 'package:my_tourism_app/screens/otherScreens/resetPassword.dart';
import 'package:my_tourism_app/screens/auth/vrification.dart';


class Profile extends StatefulWidget {
   Profile({super.key, required this.userId, required this.token});
  final num userId;
  final String token;

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  var firstName = TextEditingController();
  var lastName = TextEditingController();
  var emailController = TextEditingController();
  String userFirstName = 'Raneem';
  String userLastName = 'Last name';
  String userEmail = 'email';
  File? _image;

  ValueNotifier<bool> isFormChanged = ValueNotifier(false);

  @override
  void initState() {
    super.initState();
    firstName.addListener(_checkFormChanged);
    lastName.addListener(_checkFormChanged);
    emailController.addListener(_checkFormChanged);

    _fetchUserData(); // جلب البيانات من الخادم عند تهيئة الصفحة
  }

  Future<void> _fetchUserData() async {
  try {
    // قم بتكوين URL باستخدام userId الخاص بالمستخدم
    final String urll = '$url/api/mutual/profile/${widget.userId}';
    
    // قم بإنشاء Dio instance
    Dio dio = Dio();
    
    // استدعاء الـ API باستخدام Dio
    Response response = await dio.get(
      urll,
      options: Options(
        headers: {
          'Authorization': 'Bearer ${widget.token}',
        },
      ),
    );
    

    if (response.statusCode == 200) {
      final Map<String, dynamic> data = response.data;
      
      setState(() {
        userFirstName = data['first_name'] ?? userFirstName;
        userLastName = data['last_name'] ?? userLastName;
        userEmail = data['email'] ?? userEmail;
        
        // تحديث الحقول بناءً على البيانات المستلمة
        firstName.text = userFirstName;
        lastName.text = userLastName;
        emailController.text = userEmail;

        if (data['image_path'] != null) {
          _image = File(data['image_path']);
        }
      });
    } else {
      // التعامل مع حالة الخطأ هنا إذا لزم الأمر
      print('Failed to load profile data');
    }
  } catch (e) {
    // التعامل مع الأخطاء في حال حدوث مشكلة أثناء استدعاء الـ API
    print('Error fetching user data: $e');
  }
}


  void _checkFormChanged() {
    isFormChanged.value = firstName.text.isNotEmpty ||
        lastName.text.isNotEmpty ||
        emailController.text.isNotEmpty ||
        _image != null;
  }

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      setState(() {
        _image = File(pickedFile.path);
        _checkFormChanged(); // استدعاء _checkFormChanged لتحديث حالة الزر
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xffEEF7F8),
      body: Padding(
        padding: const EdgeInsets.only(top: 56.0, right: 30, left: 30),
        child: Column(
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                InkWell(
                  onTap: () {
                    Navigator.pop(context);
                  },
                  child: Container(
                    height: 37,
                    width: 37,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Icon(
                      Icons.arrow_forward_ios,
                      color: Color(0xff23888E),
                      size: 15,
                      textDirection: TextDirection.rtl,
                    ),
                  ),
                ),
                Spacer(
                  flex: 1,
                ),
                Text(
                  'My Profile',
                  style: TextStyle(
                      fontFamily: 'Inter',
                      fontWeight: FontWeight.bold,
                      fontSize: 18),
                ),
                Spacer(
                  flex: 2,
                ),
              ],
            ),
            Stack(
              children: <Widget>[
                Container(
                  margin: EdgeInsets.only(top: 27, bottom: 14),
                  width: 128,
                  height: 128,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: _image != null
                          ? FileImage(_image!)
                          : AssetImage("assets/Group.png") as ImageProvider,
                      fit: BoxFit.cover,
                    ),
                    color: Colors.black12,
                    borderRadius: BorderRadius.circular(100),
                  ),
                ),
                Positioned(
                  right: 4,
                  bottom: 18,
                  child: InkWell(
                    onTap: _pickImage,
                    hoverColor: Colors.black12,
                    child: Container(
                      height: 22,
                      width: 22,
                      decoration: BoxDecoration(
                        color: Color(0xff47AEB5),
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(5),
                          topRight: Radius.circular(5),
                          bottomRight: Radius.circular(5),
                        ),
                      ),
                      child: Icon(
                        Icons.edit,
                        size: 11,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ],
            ),
            
            SizedBox(height: 32),
            TextFormField(
              cursorColor: Colors.white24,
              controller: firstName,
              decoration: InputDecoration(
                filled: true,
                fillColor: Color(0xffC9E7E9),
                hintText: userFirstName,
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
                  child: Icon(Icons.person, size: 18, color: Colors.white),
                ),
                suffixIcon: Padding(
                  padding: const EdgeInsets.only(right: 20),
                  child: Icon(
                    Icons.edit,
                    size: 18,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
            SizedBox(height: 13),
            TextFormField(
              cursorColor: Colors.white24,
              controller: lastName,
              decoration: InputDecoration(
                filled: true,
                fillColor: Color(0xffC9E7E9),
                hintText: userLastName,
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
                  child: Icon(Icons.person, size: 18, color: Colors.white),
                ),
                suffixIcon: Padding(
                  padding: const EdgeInsets.only(right: 20),
                  child: Icon(
                    Icons.edit,
                    size: 18,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
            SizedBox(height: 13),
            TextFormField(
              cursorColor: Colors.white24,
              controller: emailController,
              keyboardType: TextInputType.emailAddress,
              decoration: InputDecoration(
                filled: true,
                fillColor: Color(0xffC9E7E9),
                hintText: userEmail,
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
                suffixIcon: Padding(
                  padding: const EdgeInsets.only(right: 20),
                  child: Icon(
                    Icons.edit,
                    size: 18,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
            SizedBox(height: 25),
            ValueListenableBuilder(
              valueListenable: isFormChanged,
              builder: (context, value, child) {
                return Container(
                  decoration: BoxDecoration(
                    color: value ? Color(0xff47AEB5) : Colors.grey,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  width: double.infinity,
                  height: 55,
                  child: MaterialButton(
                    onPressed: value
                        ? () {
                            if (_image != null) {
                              profilePic();
                            }
                            if (firstName.text.isNotEmpty ||
                                lastName.text.isNotEmpty) {
                              resetName();
                            }
                            if (emailController.text.isNotEmpty) {
                              resetemail();
                            }
                          }
                        : null,
                    child: Text(
                      "Save",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 15,
                      ),
                    ),
                  ),
                );
              },
            ),
            SizedBox(height: 20),
            InkWell(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => ResetPassword(
                            token: widget.token,
                          )),
                );
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.lock,
                    color: Color(0xff47AEB5),
                  ),
                  Text(
                    'reset password',
                    style: TextStyle(
                      fontFamily: 'Inter',
                      fontWeight: FontWeight.bold,
                      color: Color(0xff47AEB5),
                      fontSize: 15,
                      decoration: TextDecoration.underline,
                      decorationColor: Color(0xff47AEB5),
                    ),
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }



  resetName() async {
    if (kDebugMode) {
      print("fname=${firstName.text}");
      print("lname=${lastName.text}");
    }
    Dio dio = Dio();
    String tokenn = widget.token;
    String forToken = 'Bearer $tokenn';

    dio.options.headers = {
      'Authorization': forToken,
    };

    try {
      Response response = await dio.post(
        "${url}/api/users/resetName",
        data: {
          'first_name': firstName.text,
          'last_name': lastName.text,
          'user_id': widget.userId,
        },
      );

      if (response.statusCode == 201) {
        var data = response.data;
        String message = data['message'];

        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text("Success"),
              content: Text(message),
              actions: [
                TextButton(
                  child: Text("OK"),
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                ),
              ],
            );
          },
        );
        firstName.clear();
        lastName.clear();
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text("not working"),
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

  resetemail() async {
    if (kDebugMode) {
      print("email=${emailController.text}");
    }
    Dio dio = Dio();
    String tokenn = widget.token;
    String forToken = 'Bearer $tokenn';

    dio.options.headers = {
      'Authorization': forToken,
    };
    try {
      Response response = await dio.post(
        "${url}/api/users/resetEmail",
        data: {
          'new_email': emailController.text,
          'user_id': widget.userId,
        },
      );

      if (response.statusCode == 201) {
        var data = response.data;
        String message = data['message'];

        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text("Success"),
              content: Text(message),
              actions: [
                TextButton(
                  child: Text("OK"),
                  onPressed: () {
                    Navigator.of(context).pop();
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                          builder: (context) =>
                              VerificationCode(email: emailController.text)),
                    );
                  },
                ),
              ],
            );
          },
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Email already registered'),
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

  Future<void> profilePic() async {
    if (_image == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Please select an image'),
          backgroundColor: Colors.red,
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    Dio dio = Dio();
    String tokenn = widget.token;
    String forToken = 'Bearer $tokenn';

    dio.options.headers = {
      'Authorization': forToken,
      'Content-Type': 'multipart/form-data',
    };

    try {
      FormData formData = FormData.fromMap({
        'user_id': widget.userId,
        'profileImage': await MultipartFile.fromFile(
          _image!.path,
          filename: _image!.path.split('/').last,
        ),
      });

      Response response = await dio.post(
        "${url}/api/users/profilePic",
        data: formData,
      );

      if (response.statusCode == 201) {
        var data = response.data;
        String message = data['message'];

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(message),
            backgroundColor: Colors.green,
            behavior: SnackBarBehavior.floating,
          ),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error: ${response.data}'),
            backgroundColor: Colors.red,
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    } on DioError catch (e) {
      String errorMessage = e.response?.data?.toString() ?? 'Unknown error';

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Error: $errorMessage"),
          backgroundColor: Colors.red,
          behavior: SnackBarBehavior.floating,
        ),
      );
      if (kDebugMode) {
        print("Error from server: $errorMessage");
      }
    }
  }
}
