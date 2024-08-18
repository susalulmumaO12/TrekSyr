import 'package:flutter/material.dart';
import 'package:my_tourism_app/animation/pageTransitions.dart';
import 'package:my_tourism_app/screens/onBoardings/OnBoarding2.dart';

class OnBoarding1 extends StatefulWidget {
  const OnBoarding1({super.key});

  @override
  State<OnBoarding1> createState() => _OnBoarding1State();
}

class _OnBoarding1State extends State<OnBoarding1> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xff47AEB5),
      body:  Column(
          children: [
      
            Stack(
              children: [Container(
                height: 650,
                width: double.infinity,
                child: Image.asset("assets/places.png",
                fit: BoxFit.cover,
                ),
              ),
              
              Positioned(
                bottom: 80,
                child: Padding(
                  padding:  EdgeInsets.only(left:20.0),
                  child: Column(
      
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Discover ",
                      style: TextStyle(
                        fontFamily: 'Sora',
                        color: Colors.white,
                        fontSize: 22,
                        
                      ),
                      
                      ),
                       Text("Our Amazing",
                      style: TextStyle(
                        fontFamily: 'Sora',
                        color: Colors.white,
                        fontSize: 22,
                        fontWeight: FontWeight.bold
                      ),
                      
                      ),
                       Text("Places To VISIT!!",
                      style: TextStyle(
                        fontFamily: 'Sora',
                        color: Colors.white,
                        fontSize: 22,
                        fontWeight: FontWeight.bold
                      ),
                      
                      ),
                      SizedBox(height: 10,),
                      Row(
                        children: [
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
                      SizedBox(
                        height: 10,
                      ),
                      
                    ],
                  ),
                ),
              ),
               Positioned(
                right: 25,
                bottom: 50,
                 child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    InkWell(
                      onTap: () {
                    Navigator.push(context, PageTransition(child:OnBoarding2(),  fade: true ));
                      },
                      child: Container(
                    height: 40,
                    width: 40,
                    decoration: BoxDecoration(
                      color: Color(0xff7EC6CB),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Transform.rotate(
                      angle: 3.14, 
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
                  ],
                             ),
               )
              //FloatingActionButton(onPressed: (){})
             
              ]
            )
          ],
        ),
        
    );
  }
}
// class PageTransition extends PageRouteBuilder {
//   final Widget child;

//   PageTransition({required this.child})
//       : super(
//           transitionDuration: Duration(milliseconds: 500),
//           transitionsBuilder: (BuildContext context,
//               Animation<double> animation,
//               Animation<double> secondaryAnimation,
//               Widget child) {
//             animation = CurvedAnimation(
//               parent: animation,
//               curve: Curves.easeInOut,
//             );
//             return ScaleTransition(
//               alignment: Alignment.center,
//               scale: animation,
//               child: child,
//             );
//           },
//           pageBuilder: (BuildContext context, Animation<double> animation,
//               Animation<double> secondaryAnimation) {
//             return child;
//           },
//         );
// }
// class PageTransition extends PageRouteBuilder {
//   final Widget child;

//   PageTransition({required this.child})
//       : super(
//           transitionDuration: Duration(milliseconds: 500),
//           transitionsBuilder: (BuildContext context,
//               Animation<double> animation,
//               Animation<double> secondaryAnimation,
//               Widget child) {
//             return FadeTransition(
//               opacity: animation,
//               child: child,
//             );
//           },
//           pageBuilder: (BuildContext context, Animation<double> animation,
//               Animation<double> secondaryAnimation) {
//             return child;
//           },
//         );
// }
