import 'package:flutter/material.dart';
import 'package:my_tourism_app/components/dashLine.dart';
import 'package:my_tourism_app/models/trip_path_model.dart';

class ItemTripDetails extends StatelessWidget {
  const ItemTripDetails({super.key, required this.tripDetailsModel});
  final TripPathModel tripDetailsModel;

  @override
  Widget build(BuildContext context) {
    String imagePath = 'assets/ic_round-tour.png'; // صورة افتراضية

    if (tripDetailsModel.type == 'Ruin') {
      imagePath = 'assets/museum.png';
    } else if (tripDetailsModel.type == 'Restaurant') {
      imagePath = 'assets/fork 1.png';
    } else if (tripDetailsModel.type == 'Hotel') {
      imagePath = 'assets/hotel (1) 2.png';
    }
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        SizedBox(
          width: 60,
          child: Text(tripDetailsModel.place,style: TextStyle(
            fontFamily: 'Inter',
            fontWeight: FontWeight.w600,
            fontSize: 11
          ),),
        ),
        SizedBox(
          width: 10,
        ),
        CircleAvatar(
          backgroundColor: Color(0xff47AEB5),
          radius: 20,
          
          child: Image.asset(imagePath,width: 20,),
        ),
         SizedBox(
          width: 10,
        ),
        SizedBox(
          width: 60,
          child: Text(tripDetailsModel.time,
          style: TextStyle(
            fontFamily: 'Inter',
            fontWeight: FontWeight.w600,
            fontSize: 11,
            color: Color(0xff8acbd0)
          ),
          ),
        ),
      ],
    );
  }
}
