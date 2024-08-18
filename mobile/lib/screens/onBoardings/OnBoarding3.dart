import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:my_tourism_app/animation/pageTransitions.dart';
import 'package:my_tourism_app/screens/onBoardings/OnBoarding2.dart';
import 'package:my_tourism_app/screens/onBoardings/getStarted.dart';

class OnBoarding3 extends StatefulWidget {
  const OnBoarding3({super.key});

  @override
  State<OnBoarding3> createState() => _OnBoarding3State();
}

class _OnBoarding3State extends State<OnBoarding3> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:Container(
      //  padding: EdgeInsets.only(top: 60),
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/The rest of the temple of Bel of Palmyra in Syria.png'),
              fit: BoxFit.cover,
            )
          ),
          child: Column(
          //mainAxisAlignment: MainAxisAlignment.end,
            children: [
              Spacer(
                flex: 5,
              ),
             Padding(
               padding: const EdgeInsets.symmetric(horizontal: 20),
               child: Container(
               height: 142,
               width: double.infinity,
               decoration: BoxDecoration(
                 //borderRadius: BorderRadius.circular(8),
               ),
               child: ClipRRect(
                 borderRadius: BorderRadius.circular(8),
                 child: BackdropFilter(
                   filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10), // ضبابية الخلفية
                   child: Container(
                     color: Colors.black.withOpacity(0.3),
                     child:Padding(
                       padding: const EdgeInsets.all(8.0),
                       child: Column(
                         crossAxisAlignment: CrossAxisAlignment.start,
                         children: [
                Text("Take control of ",
                          style: TextStyle(
                            fontFamily: 'Sora',
                            color: Colors.white,
                            fontSize: 22,
                          ),
                          ),
                          SizedBox(
                            height: 5,
                          ),
                          Text("your travel destiny ",
                      style: TextStyle(
                        fontFamily: 'Sora',
                        color: Colors.white,
                        fontSize: 22,
                        fontWeight: FontWeight.bold
                      ),
                      
                      ),
                       SizedBox(
                            height: 5,
                          ),
                       Text("providing you with comprehensive travel information and personalized recommendations.",
                      style: TextStyle(
                        fontFamily: 'Sora',
                        color: Color.fromRGBO(255, 255, 255, 0.74),
                        fontSize: 11,
                        //fontWeight: FontWeight.bold
                      ),
                      
                      ),

                         ],
                       ),
                     ), // لون التعتيم
                   ),
                 ),
               ),
               
             ),
             ),
              SizedBox(
                           height: 10,
                          ),
             Padding(
               padding: const EdgeInsets.only(left:22.0),
               child: Row(
                          children: [
                            
                           
                            CircleAvatar(
                              radius:3,
                              backgroundColor: Colors.white,
                            ),
                           
                             SizedBox(
                             width: 5,
                            ),
                             CircleAvatar(
                              radius:3,
                              backgroundColor: Colors.white,
                            ),
                             SizedBox(
                             width: 5,
                            ),
                            Container(
                              height: 6,
                              width: 15,
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(20)
                              ),
                            ),
                          ],
                        ),
             ),
             Padding(
               padding: const EdgeInsets.only(right: 25),
               child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  InkWell(
                    onTap: () {
                  Navigator.push(context, PageTransition(child:GetStarted(), fade:true));
                    },
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(10),
                      child: BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                        child: Container(
                                          height: 40,
                                          width: 40,
                                          decoration: BoxDecoration(
                        color: Color.fromRGBO(0, 0, 0, 0.298),
                        borderRadius: BorderRadius.circular(10),
                                          ),
                                          child: Transform.rotate(
                        angle: 3.14, // زاوية الدوران (بالراديان) لتدوير الأيقونة بزاوية 180 درجة
                        child: Center(
                          child: Icon(
                            
                            Icons.arrow_back_ios,
                            size: 16,
                            color: Colors.white,
                          ),
                        ),
                                          ),
                        ),
                      ),
                    ),
                  ),
                ],
                           ),
             ),
 Spacer(
                flex: 1,
              ),

            ],
          )
          ),
    );
  }
}