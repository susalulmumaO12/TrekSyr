import 'package:flutter/material.dart';
import 'package:my_tourism_app/animation/pageTransitions.dart';
import 'package:my_tourism_app/screens/auth/Login.dart';
import 'package:my_tourism_app/screens/auth/vrification.dart';
import 'package:my_tourism_app/services/sign_up_service.dart';

class SignUp extends StatefulWidget {
  const SignUp({super.key});

  @override
  State<SignUp> createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  bool secure = true;
  bool secure2 = true;
  final _formKey = GlobalKey<FormState>();
  var firstName = TextEditingController();
  var lastName = TextEditingController();
  var emailController = TextEditingController();
  var phone = TextEditingController();
  var passwordController = TextEditingController();
  var coniformPasswordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScopeNode currentFocus = FocusScope.of(context);
        if (!currentFocus.hasPrimaryFocus) {
          currentFocus.unfocus();
        }
      },
      child: Scaffold(
        body: Container(
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage("assets/Sign Up.png"),
              fit: BoxFit.cover,
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 34),
            child: Column(
              children: [
                Spacer(flex: 1),
                Row(
                  children: [
                    Text(
                      "Sign Up",
                      style:
                          TextStyle(fontSize: 30, fontWeight: FontWeight.w500),
                    ),
                  ],
                ),
                SizedBox(height: 40),
                TextFormField(
                  cursorColor: Colors.white24,
                  controller: firstName,
                  onFieldSubmitted: (String value) {
                    print(value);
                  },
                  onChanged: (String value) {
                    print(value);
                  },
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Color(0xffC9E7E9),
                    hintText: 'First name',
                    hintStyle:
                        const TextStyle(color: Colors.white, fontSize: 15),
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
                  ),
                ),
                SizedBox(height: 13),
                TextFormField(
                  cursorColor: Colors.white24,
                  controller: lastName,
                  onFieldSubmitted: (String value) {
                    print(value);
                  },
                  onChanged: (String value) {
                    print(value);
                  },
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Color(0xffC9E7E9),
                    hintText: 'Last name',
                    hintStyle:
                        const TextStyle(color: Colors.white, fontSize: 15),
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
                  ),
                ),
                SizedBox(height: 13),
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
                TextFormField(
                  cursorColor: Colors.white24,
                  controller: phone,
                  onFieldSubmitted: (String value) {
                    print(value);
                  },
                  onChanged: (String value) {
                    print(value);
                  },
                  keyboardType: TextInputType.phone,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Color(0xffC9E7E9),
                    hintText: 'Phone number',
                    hintStyle:
                        const TextStyle(color: Colors.white, fontSize: 15),
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
                      child: Icon(Icons.phone, size: 18, color: Colors.white),
                    ),
                  ),
                ),
                SizedBox(height: 13),
                Form(
                  key: _formKey,
                  autovalidateMode: AutovalidateMode.always,
                  child: TextFormField(
                    cursorColor: Colors.white24,
                    controller: passwordController,
                    onFieldSubmitted: (String value) {
                      print(value);
                    },
                    onChanged: (String value) {
                      print(value);
                    },
                    obscureText: secure,
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
                        borderSide: const BorderSide(color: Colors.white24),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(color: Colors.white24),
                      ),
                      prefixIcon: Padding(
                        padding: const EdgeInsets.only(left: 20.0, right: 10),
                        child: Icon(Icons.lock_rounded,
                            size: 18, color: Colors.white),
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
                  height: 50,
                  child: MaterialButton(
                    onPressed: () async {
                      if (firstName.text.isEmpty ||
                          lastName.text.isEmpty ||
                          emailController.text.isEmpty ||
                          phone.text.isEmpty ||
                          passwordController.text.isEmpty) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text("All fields are required"),
                            backgroundColor: Colors.red,
                            behavior: SnackBarBehavior.floating,
                          ),
                        );
                        return;
                      }
                      setState(() {});
                      bool state = await SignUpService(
                          firstName.text,
                          lastName.text,
                          emailController.text,
                          phone.text,
                          passwordController.text);
                      if (state) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text("You signed up successfully"),
                            backgroundColor: Colors.green,
                            behavior: SnackBarBehavior.floating,
                          ),
                        );
                        Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(
                              builder: (context) => VerificationCode(
                                    email: emailController.text,
                                  )),
                        );
                      } else if (state == false) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text(
                                "You already have an account with this email or phone number."),
                            backgroundColor: Colors.red,
                            behavior: SnackBarBehavior.floating,
                          ),
                        );
                      }
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
                SizedBox(height: 13),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      "Already have an account?",
                      style:
                          TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
                    ),
                    InkWell(
                      onTap: () {
                        Navigator.pushReplacement(context,
                            PageTransition(child: Login(), fade: true));
                      },
                      child: Text(
                        "Login",
                        style: TextStyle(
                          decoration: TextDecoration.underline,
                          decorationColor: Color(0xff47AEB5),
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          color: Color(0xff47AEB5),
                        ),
                      ),
                    ),
                  ],
                ),
                Spacer(flex: 2),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
