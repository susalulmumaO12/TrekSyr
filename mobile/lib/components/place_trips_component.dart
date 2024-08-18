import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:my_tourism_app/animation/pageTransitions.dart';
import 'package:my_tourism_app/main.dart';
import 'package:my_tourism_app/screens/otherScreens/tripdetails2.dart';
import 'package:my_tourism_app/shared/colors.dart';

class PlaceTripComponent extends StatefulWidget {
  const PlaceTripComponent({super.key, required this.tripId, required this.name, required this.startingTime, required this.price, required this.duration, required this.available, required this.image, required this.token, required this.guideId, required this.userId});
  final num tripId;
  final num guideId;
  final String name;
  final String startingTime;
  final num price;
  final num duration;
  final num available;
  final String image;
  final String token;
  final num userId;

  @override
  State<PlaceTripComponent> createState() => _PlaceTripComponentState();
}

class _PlaceTripComponentState extends State<PlaceTripComponent> {
  Map<String, dynamic>? guideDetails;
  @override
  void initState() {
    super.initState();
    fetchGuideDetails();
   
  }

  Future<void> fetchGuideDetails() async {
    Dio dio = Dio();
    dio.options.headers = {
      'Authorization': 'Bearer ${widget.token}',
    };

    try {
      Response response = await dio.get("$url/api/user/getGuide/${widget.guideId}");
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
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Container(
        height: 138,
        width: double.infinity,
        decoration: BoxDecoration(
          color: MyColors.white,
          borderRadius: BorderRadius.circular(7),
        ),
        child: Padding(
          padding:
              const EdgeInsets.only(left: 21, bottom: 13, right: 20, top: 17),
          child: Column(
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  CircleAvatar(
                    radius: 22,
                    foregroundImage: widget.image.isNotEmpty
                        ? Image.memory(
                            base64Decode(widget.image),
                            width: double.infinity,
                            height: double.infinity,
                            fit: BoxFit.cover,
                          ).image
                        : Image.asset(
                            'assets/images/temp/tourism.jpg',
                            width: double.infinity,
                            height: double.infinity,
                            fit: BoxFit.cover,
                          ).image,
                    backgroundColor: MyColors.grey,
                  ),
                  const SizedBox(
                    width: 12,
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(
                        height: 11,
                      ),
                      Text(
                        widget.name,
                        style: const TextStyle(
                            color: MyColors.blue,
                            fontSize: 14,
                            fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(
                        height: 7,
                      ),
                      Text(
                        widget.startingTime,
                        style: TextStyle(
                          color: MyColors.black.withOpacity(0.8),
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                  const Expanded(child: SizedBox()),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      const SizedBox(
                        height: 12,
                      ),
                      Row(
                        children: [
                          Text(
                            widget.price.toString(),
                            style: const TextStyle(
                                color: MyColors.black,
                                fontSize: 13,
                                fontWeight: FontWeight.w600),
                          ),
                          const Text(
                            'sp',
                            style: TextStyle(
                                color: MyColors.black,
                                fontSize: 9,
                                fontWeight: FontWeight.w600),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 8,
                      ),
                      Row(
                        children: [
                          Text(
                            widget.available == 1 ? 'Available' : 'Unavailable',
                            style: TextStyle(
                              color: widget.available == 1
                                  ? MyColors.green
                                  : Color.fromARGB(255, 177, 32, 22),
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          CircleAvatar(
                            radius: 4,
                            backgroundColor: widget.available == 1
                                ? MyColors.green
                                : Color.fromARGB(255, 177, 32, 22),
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
              const Expanded(child: SizedBox()),
              Row(
                children: [
                  InkWell(
                    onTap: () {
                      ///navigate to book screen
                    },
                    child: Container(
                      width: 120,
                      height: 36,
                      decoration: BoxDecoration(
                        color: MyColors.blue,
                        borderRadius: BorderRadius.circular(3),
                      ),
                      child: const Center(
                        child: Text(
                          'Book Now',
                          style: TextStyle(
                              color: MyColors.white,
                              fontSize: 11.5,
                              fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                  ),
                  const Expanded(child: SizedBox()),
                  InkWell(
                    onTap: () {
                    Navigator.pushReplacement(context, PageTransition(child:TripDetails2(token: widget.token, phone_number:guideDetails?['phone_number'] , price: widget.price, guide_fname: guideDetails!['first_name'], guide_lname: guideDetails!['last_name'], id: widget.guideId, tripId: widget.tripId, userId: widget.userId,), fade:true));
                    },
                    child: const Row(
                      children: [
                        Padding(
                          padding: EdgeInsets.only(bottom: 0.5),
                          child: Text(
                            'See Details',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                        Icon(
                          Icons.arrow_back_ios,
                          size: 12,
                          textDirection: TextDirection.rtl,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
