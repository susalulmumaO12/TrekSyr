import 'dart:convert'; // لاستيراد base64Decode
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:my_tourism_app/screens/otherScreens/tripdetails2.dart';
import 'package:my_tourism_app/services/stripe_service.dart';

class GuidTripComponent extends StatefulWidget {
  final Map<String, dynamic> trip;
  final String token;
  final num id;
  final String guid_fname;
  final String guid_lname;
  final String guid_phone;
  final double? guid_rate;
  final String? guid_image;
  final num userId;
  const GuidTripComponent(
      {super.key,
      required this.trip,
      required this.token,
      required this.id,
      required this.guid_fname,
      required this.guid_lname,
      required this.guid_phone,
      this.guid_rate,
      this.guid_image,
      required this.userId});

  @override
  State<GuidTripComponent> createState() => _GuidTripComponentState();
}

class _GuidTripComponentState extends State<GuidTripComponent> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Stack(
        children: [
          Padding(
            padding: const EdgeInsets.all(1.0),
            child: Container(
              height: 138,
              width: double.infinity,
              clipBehavior: Clip.antiAlias,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
              ),
              child: Stack(
                children: [
                  widget.trip['image'] != null
                      ? Image.memory(
                          base64Decode(widget.trip['image']),
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
                  Container(
                    height: double.infinity,
                    width: double.infinity,
                    color: Colors.black.withOpacity(0.5),
                    child: ClipRRect(
                      child: BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 2, sigmaY: 2),
                        child: Padding(
                          padding: const EdgeInsets.only(
                            left: 21,
                            bottom: 17,
                            right: 20,
                            top: 17,
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Expanded(
                                    child: Text(
                                      widget.trip['name'],
                                      style: const TextStyle(
                                        color: Colors.white,
                                        fontSize: 15,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ),
                                  const SizedBox(width: 10),
                                  Text(
                                    widget.trip['starting_time'],
                                    style: TextStyle(
                                      color: Colors.white.withOpacity(1),
                                      fontSize: 10.5,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ],
                              ),
                              const Expanded(child: SizedBox()),
                              Row(
                                children: [
                                  /* MaterialButton(
                                    onPressed: () {
                                      //TODO check if bookable
                                      StripeService.instance.makePayment((widget.trip['price']).toInt());
                                      //TODO APPLY BOOKING
                                    },
                                    color: Color(0xff47AEB5),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(3),
                                    ),
                                    child: const Text(
                                      'Book now',
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 11,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ), */
                                  const Expanded(child: SizedBox()),
                                  InkWell(
                                    onTap: () {
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) => TripDetails2(
                                            token: widget.token,
                                            phone_number: widget.guid_phone,
                                            price: widget.trip['price'],
                                            rate: widget.guid_rate,
                                            guide_fname: widget.guid_fname,
                                            guide_lname: widget.guid_lname,
                                            guide_image: widget.guid_image,
                                            id: widget.id,
                                            tripId: widget.trip['trip_id'],
                                            userId: widget.userId,
                                          ),
                                        ),
                                      );
                                    },
                                    child: const Row(
                                      children: [
                                        Padding(
                                          padding: EdgeInsets.only(bottom: 0.5),
                                          child: Text(
                                            'See Details',
                                            style: TextStyle(
                                              color: Colors.white,
                                              fontSize: 12,
                                              fontFamily: 'Inter',
                                            ),
                                          ),
                                        ),
                                        Icon(
                                          Icons.arrow_back_ios,
                                          size: 12,
                                          textDirection: TextDirection.rtl,
                                          color: Colors.white,
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
                    ),
                  ),
                ],
              ),
            ),
          ),
          IgnorePointer(
            // تعطيل Container الخارجي
            child: Container(
              height: 140,
              width: double.infinity,
              decoration: BoxDecoration(
                borderRadius: BorderRadiusDirectional.circular(12),
                border: Border.all(color: Color(0xffEEF7F8), width: 3),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
