import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:my_tourism_app/animation/pageTransitions.dart';
import 'package:my_tourism_app/screens/onBoardings/OnBoarding3.dart';

class OnBoarding2 extends StatefulWidget {
  const OnBoarding2({super.key});

  @override
  State<OnBoarding2> createState() => _OnBoarding2State();
}

class _OnBoarding2State extends State<OnBoarding2> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:Container(
      //  padding: EdgeInsets.only(top: 60),
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/latakia, Syria 1.png'),
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
                Text("Get Ready For ",
                          style: TextStyle(
                            fontFamily: 'Sora',
                            color: Colors.white,
                            fontSize: 22,
                          ),
                          ),
                          SizedBox(
                            height: 5,
                          ),
                          Text("Next Trip!",
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
                       Text("Get ready to embark on a journey of a lifetime as our tourism app takes you on an immersive exploration of captivating cities and natural wonders.",
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
                            Container(
                              height: 6,
                              width: 15,
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(20)
                              ),
                            ),
                             SizedBox(
                             width: 5,
                            ),
                             CircleAvatar(
                              radius:3,
                              backgroundColor: Colors.white,
                            )
                          ],
                        ),
             ),
             Padding(
               padding: const EdgeInsets.only(right: 25,),
               child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  InkWell(
                    onTap: () {
                  Navigator.push(context, PageTransition(child:OnBoarding3(),  fade: true ));
                    },
                    child: ClipRRect(
                      child: BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                        child: Container(
                                          height: 40,
                                          width: 40,
                                          decoration: BoxDecoration(
                        color: Color.fromRGBO(255, 255, 255, 0.3),
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