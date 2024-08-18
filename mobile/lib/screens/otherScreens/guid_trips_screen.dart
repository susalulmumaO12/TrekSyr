import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:my_tourism_app/components/guid_trips_component.dart';
import 'package:my_tourism_app/main.dart';
import 'package:my_tourism_app/screens/otherScreens/rate_guide_screen.dart';
import 'package:my_tourism_app/screens/otherScreens/rate_screen.dart'; // تأكد من استيراد المسار الصحيح لـ URL الأساسي

class GuidTripScreen extends StatefulWidget {
  final num id;
  final String token;
  final num userId;

  const GuidTripScreen(
      {super.key, required this.id, required this.token, required this.userId});

  @override
  State<GuidTripScreen> createState() => _GuidTripScreenState();
}

class _GuidTripScreenState extends State<GuidTripScreen> {
  Map<String, dynamic>? guideDetails;
  List<dynamic>? trips;

  @override
  void initState() {
    super.initState();
    fetchGuideDetails();
    fetchGuideTrips();
  }

  Future<void> fetchGuideDetails() async {
    Dio dio = Dio();
    dio.options.headers = {
      'Authorization': 'Bearer ${widget.token}',
    };

    try {
      Response response =
          await dio.get("${url}/api/user/getGuide/${widget.id}");
      setState(() {
        guideDetails = response.data;
        if (guideDetails != null && guideDetails!['average_rating'] != null) {
          guideDetails!['average_rating'] =
              double.tryParse(guideDetails!['average_rating']);
        }
      });
    } on DioError catch (e) {
      print("Error fetching guide details: ${e.response?.statusCode}");
    }
  }

  Future<void> fetchGuideTrips() async {
    Dio dio = Dio();
    dio.options.headers = {
      'Authorization': 'Bearer ${widget.token}',
    };

    try {

      Response response =
          await dio.get("${url}/api/user/guideTrips/${widget.id}/0");

      print('trips for guide with id: ${widget.id}');
      


      setState(() {
        trips = response.data;
      });
    } on DioError catch (e) {
      print(e);
      print("Error fetching guide trips: ${e.response?.statusCode}");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xffEEF7F8),
      body: guideDetails == null
          ? Center(child: CircularProgressIndicator())
          : Center(
              child: Padding(
                padding: const EdgeInsets.only(
                  left: 36,
                  right: 36,
                  top: 42,
                ),
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(bottom: 20.0),
                      child: Row(
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
                                    color: Colors.black.withOpacity(0.05),
                                    blurRadius: 10,
                                  ),
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
                              'Trips',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                color: Colors.black,
                                fontSize: 20,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      height: 100,
                      width: double.infinity,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Row(
                        children: [
                          Padding(
                            padding:
                                const EdgeInsets.symmetric(horizontal: 10.0),
                            child: guideDetails!['image'] != null
                                ? Image.network(
                                    guideDetails!['image'],
                                    height: 48,
                                    width: 40,
                                  )
                                : Image.asset(
                                    'assets/logo1.png',
                                    height: 48,
                                    width: 40,
                                  ),
                          ),
                          Flexible(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  '${guideDetails!['first_name']} ${guideDetails!['last_name']}',
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                  style: TextStyle(
                                    color: Color(0xff47AEB5),
                                    fontWeight: FontWeight.bold,
                                    fontFamily: 'Inter',
                                    fontSize: 18,
                                  ),
                                ),
                                SizedBox(height: 5),
                                Text(
                                  guideDetails!['phone_number'] ??
                                      'No phone number',
                                  style: TextStyle(
                                    color: Colors.grey,
                                    fontSize: 14,
                                    fontFamily: 'Inter',
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SizedBox(
                            width: 50,
                          ),
                          Padding(
                            padding:
                                const EdgeInsets.only(right: 11.0, top: 22),
                            child: Column(
                              children: [
                                Row(
                                  children: List.generate(
                                    5,
                                    (index) => Icon(
                                      Icons.star,
                                      color: (guideDetails!['average_rating'] !=
                                                  null &&
                                              guideDetails!['average_rating'] >
                                                  index)
                                          ? Color(0xffE4B200)
                                          : Color(0xffD9D9D9),
                                      size: 13,
                                    ),
                                  ),
                                ),
                                SizedBox(height: 8),
                                TextButton(
                                    onPressed: () {
                                      showDialog(
                                        context: context,
                                        builder: (BuildContext context) {
                                          return RateGuideScreen(userId: widget.userId, token: widget.token, guideId: widget.id,);
                                        },
                                      );
                                    },
                                    child: Text(
                                      'Rate Guide',
                                      style:
                                          TextStyle(color: Color(0xffE4B200)),
                                    ))
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 20),
                    Expanded(
                      child: trips == null
                          ? Center(child: CircularProgressIndicator())
                          : ListView.builder(
                              itemCount: trips!.length,
                              itemBuilder: (context, index) {
                                return GuidTripComponent(
                                  guid_fname: guideDetails!['first_name'],
                                  guid_lname: guideDetails!['last_name'],
                                  guid_phone: guideDetails!['phone_number'],
                                  guid_rate: guideDetails!['average_rating'],
                                  guid_image: guideDetails!['image'],
                                  trip: trips![index],
                                  token: widget.token,
                                  id: widget.id,
                                  userId: widget.userId,
                                );
                              },
                            ),
                    ),
                  ],
                ),
              ),
            ),
    );
  }
}
