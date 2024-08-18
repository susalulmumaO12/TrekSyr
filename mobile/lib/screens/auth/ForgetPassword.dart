import 'package:flutter/material.dart';
import 'package:my_tourism_app/animation/pageTransitions.dart';
import 'package:my_tourism_app/screens/auth/Login.dart';
import 'package:my_tourism_app/services/forget_password_service.dart';

class ForgetPassword extends StatefulWidget {
  const ForgetPassword({super.key});

  @override
  State<ForgetPassword> createState() => _ForgetPasswordState();
}

class _ForgetPasswordState extends State<ForgetPassword> {
  var emailController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xffEEF7F8),
      body: Padding(
        padding: const EdgeInsets.only(top:60.0,left:30,right:30,),
        child: Column(
          children: [
           Text(
            'Enter your email please to send you the new password',
            style: TextStyle(
              fontFamily: 'Inter',
              fontWeight: FontWeight.bold,
              fontSize: 15
            ),
           ),
           SizedBox(
            height: 20,
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
                        hintText:'Email',
                        hintStyle: const TextStyle(color: Colors.white,fontSize: 15),
                        enabledBorder: OutlineInputBorder(
                          borderSide:const BorderSide(
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
                       padding: const EdgeInsets.only(left:20.0,right: 10),
                       child: Icon(Icons.email,size: 18,color: Colors.white,),
                     )
                      ),
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
              child: MaterialButton(onPressed: ()async{
                if (
                    emailController.text.isEmpty
                          ) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text("enter your email first"),
                            backgroundColor: Colors.red,
                            behavior: SnackBarBehavior.floating,
                          ),
                        );
                        return;
                      }
                      setState(() {});
             bool state= await ForgetPasswordService(emailController.text);
            
                      if (state) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text("The new password is sent to your inbox! Please change your password once you log in!"),
                            backgroundColor: Colors.green,
                            behavior: SnackBarBehavior.floating,
                          ),
                        );
                       
                      } else if(state==false){
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text("enter valid email please"),
                            backgroundColor: Colors.red,
                            behavior: SnackBarBehavior.floating,
                          ),
                        );
                      }
              },
              child: Text("Send Password",style: TextStyle(
                color: Colors.white,
                fontSize: 15,
               
                
              ),),
              ),
             ),
             SizedBox(height: 30,),
             TextButton(onPressed: (){
              Navigator.push(context, PageTransition(child: Login(), fade: true));
             }, child: Text('Back to Login?',style: 
                                                 TextStyle(
                            decoration: TextDecoration.underline,
                            decorationColor: Color(0xff47AEB5),
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                            fontFamily: 'Inter',
                            color:Color(0xff47AEB5) 
                                                 ),),),
          ],
        ),
      ),
    );
  }
}