import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_tourism_app/components/booked_trips_component.dart';
import 'package:my_tourism_app/controllers/tap_controller.dart';
import 'package:my_tourism_app/services/booked_trips_service.dart';
import 'package:my_tourism_app/services/guids_service.dart';
import 'package:my_tourism_app/shared/colors.dart';
import 'package:my_tourism_app/shared/components.dart';

class MyBooked extends StatefulWidget {
  const MyBooked({Key? key, required this.token, required this.userId}) : super(key: key);
  final String token;
  final num userId;
  @override
  State<MyBooked> createState() => _MyBookedState();
}

class _MyBookedState extends State<MyBooked> with AutomaticKeepAliveClientMixin {
  TapController controller = Get.find();
  List<Map<String, dynamic>> bookedTripsList = [];
  String? errorMessage;  // متغير لحفظ رسالة الخطأ

  @override
  void initState() {
    super.initState();
    fetchBookedTrips(); // جلب الرحلات المحجوزة
  }

  void fetchBookedTrips() async {
    try {
      var data = await getBookedTrips(widget.token, widget.userId);
      setState(() {
        bookedTripsList = data.map<Map<String, dynamic>>((trip) {
          return {
            'trip_id': trip['trip_id'],
            'guide_id': trip['guide_id'],
            'name': trip['name'],
            'price': trip['price'],
            'image': trip['image'],
            'starting_time': trip['starting_time'],
            'duration': trip['duration'],
            'info': trip['info'],
          };
        }).toList();
        errorMessage = null;  // لا توجد أخطاء
      });
    } catch (e) {
      setState(() {
        errorMessage = e.toString();  // حفظ رسالة الخطأ
        bookedTripsList = [];  // مسح قائمة الرحلات عند وجود خطأ
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Scaffold(
      backgroundColor: MyColors.lightBlue,
      body: Padding(
        padding: const EdgeInsets.only(left: 23, right: 23, top: 5),
        child: SizedBox(
          width: double.infinity,
          // التحقق مما إذا كان هناك رسالة خطأ
          child: errorMessage != null
              ? Center(
                  child: Text(
                    errorMessage!,  // عرض رسالة الخطأ
                    style: TextStyle(
                     
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                )
              : ListView.builder(
                  itemCount: bookedTripsList.length,
                  padding: const EdgeInsets.only(top: 25),
                  itemBuilder: (context, index) {
                    var bookedTrip = bookedTripsList[index];
                    return BookedTripsComponent(
                      tripId: bookedTrip['trip_id'],
                      guideId: bookedTrip['guide_id'],
                      tripName: bookedTrip['name'],
                      price: bookedTrip['price'],
                      startingTime: bookedTrip['starting_time'],
                      duration: bookedTrip['duration'],
                      info: bookedTrip['info'],
                      image: bookedTrip['image'], token: widget.token, userId: widget.userId,
                    );
                  },
                ),
        ),
      ),
    );
  }

  @override
  bool get wantKeepAlive => true;
}

