import 'dart:convert';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:my_tourism_app/screens/otherScreens/tripdetails2.dart';
import 'package:my_tourism_app/services/guid_details_service.dart';
import 'package:my_tourism_app/services/guide_details.dart';
import 'package:my_tourism_app/shared/colors.dart';

class BookedTripsComponent extends StatefulWidget {
  const BookedTripsComponent({
    super.key,
    required this.tripId,
    required this.guideId,
    required this.tripName,
    required this.price,
    required this.startingTime,
    required this.duration,
    required this.info,
    required this.image,
    required this.token, required this.userId,
    
  });

  final num tripId;
  final num guideId;
  final String tripName;
  final num price;
  final String startingTime;
  final num duration;
  final String info;
  final String image;
  final String token;
  final num userId;
  @override
  State<BookedTripsComponent> createState() => _BookedTripsComponentState();
}

class _BookedTripsComponentState extends State<BookedTripsComponent> {
  String? guideFirstName;
  String? guideLastName;

  @override
  void initState() {
    super.initState();
    _fetchGuideDetails();
  }

  Future<void> _fetchGuideDetails() async {
    try {
      print('Fetching guide details...');
      var guideDetails = await getGuideDetails2(widget.token, widget.guideId);

      if (guideDetails != null) {
        setState(() {
          guideFirstName = guideDetails['first_name'];
          guideLastName = guideDetails['last_name'];
        });
        print('Guide details fetched successfully.');
      } else {
        print("Failed to fetch guide details.");
      }
    } catch (e) {
      print("Error: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () async {
        print('Button tapped!'); // تحقق من طباعة الرسالة

        try {
          var guideDetails = await getGuideDetails2(widget.token, widget.guideId);

          if (guideDetails != null) {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (BuildContext context) => TripDetails2(
                  token: widget.token,
                  phone_number: guideDetails['phone_number'],
                  price: widget.price,
                  guide_fname: guideDetails['first_name'],
                  guide_lname: guideDetails['last_name'],
                  tripId: widget.tripId,
                  id: widget.guideId, userId: widget.userId,
                ),
              ),
            );
          } else {
            print("Failed to fetch guide details.");
          }
        } catch (e) {
          print("Error: $e");
        }
      },
      child: Padding(
        padding: const EdgeInsets.only(bottom: 10),
        child: Stack(
          children: [
            Container(
              height: 138,
              width: double.infinity,
              clipBehavior: Clip.antiAlias,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
              ),
              child: widget.image != null
                  ? Image.memory(
                      base64Decode(widget.image),
                      width: double.infinity,
                      height: double.infinity,
                      fit: BoxFit.cover,
                    )
                  : Image.asset(
                      'assets/images/temp/temple1.png',
                      width: double.infinity,
                      height: double.infinity,
                      fit: BoxFit.cover,
                    ),
            ),
            Container(
              height: 138,
              width: double.infinity,
              decoration: BoxDecoration(
                color: MyColors.black.withOpacity(0.5),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.tripName,
                          style: const TextStyle(
                            color: MyColors.white,
                            fontSize: 15,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const Spacer(),
                        Text(
                          widget.startingTime,
                          style: TextStyle(
                            color: MyColors.white.withOpacity(1),
                            fontSize: 10.5,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                    const Spacer(),
                    Row(
                      children: [
                        CircleAvatar(
                          radius: 14,
                          foregroundImage: AssetImage('assets/logo1.png'),
                          backgroundColor: MyColors.grey,
                        ),
                        const SizedBox(width: 8),
                        Text(
                         
                              '$guideFirstName $guideLastName'
                              ,// عرض الاسم الأول واسم العائلة إذا كانا موجودين
                          style: TextStyle(
                            color: MyColors.white.withOpacity(1),
                            fontSize: 12,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                    const Spacer(),
                    Row(
                      children: [
                        Container(
                          width: 120,
                          height: 34,
                          decoration: BoxDecoration(
                            color: MyColors.white.withOpacity(0.4),
                            borderRadius: BorderRadius.circular(3),
                          ),
                          child: const Center(
                            child: Text(
                              'Cancel Booking',
                              style: TextStyle(
                                color: MyColors.white,
                                fontSize: 11,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                        const Spacer(),
                        const Row(
                          children: [
                            Padding(
                              padding: EdgeInsets.only(bottom: 0.5),
                              child: Text(
                                'See Details',
                                style: TextStyle(
                                  color: MyColors.white,
                                  fontSize: 12,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                            ),
                            Icon(
                              Icons.arrow_back_ios,
                              size: 12,
                              textDirection: TextDirection.rtl,
                              color: MyColors.white,
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            Positioned.fill(
              child: Align(
                alignment: Alignment.center,
                child: Container(
                  height: 140,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: MyColors.lightBlue, width: 3),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
