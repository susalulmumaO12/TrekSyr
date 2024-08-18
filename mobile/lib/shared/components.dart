import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_tourism_app/controllers/tap_controller.dart';
import 'package:my_tourism_app/shared/colors.dart';
import 'package:my_tourism_app/services/stripe_service.dart';

Widget buildPlace(
  ImageProvider image,
  int rate,
  bool favorite,
  String city,
  String name,
  int x,
) {
  TapController controller = Get.find();
  return Padding(
    padding: const EdgeInsets.only(bottom: 18.0),
    child: Stack(
      children: [
        Row(
          children: [
            Expanded(
              flex: 215,
              child: Container(
                height: 156,
                decoration: BoxDecoration(
                  color: MyColors.blue.withOpacity(0.5),
                  borderRadius: BorderRadius.circular(10),
                ),
                clipBehavior: Clip.antiAlias,
                child: Image(
                  image: image,
                  fit: BoxFit.cover,
                ),
              ),
            ),
            const Expanded(
              flex: 70,
              child: SizedBox(),
            ),
          ],
        ),
        Row(
          children: [
            const Expanded(
              flex: 115,
              child: SizedBox(),
            ),
            Expanded(
              flex: 180,
              child: Padding(
                padding: const EdgeInsets.only(top: 16.0),
                child: Container(
                  height: 124,
                  decoration: BoxDecoration(
                    color: MyColors.white,
                    borderRadius: BorderRadius.circular(15),
                    boxShadow: [
                      BoxShadow(
                          color: MyColors.blue.withOpacity(0.25),
                          blurRadius: 15),
                    ],
                  ),
                  child: Stack(
                    alignment: Alignment.topRight,
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(14.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              city,
                              style: const TextStyle(
                                  color: Color.fromRGBO(97, 97, 97, 1),
                                  fontSize: 11,
                                  fontWeight: FontWeight.w500),
                            ),
                            const SizedBox(
                              height: 4.5,
                            ),
                            Text(
                              name,
                              style: const TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.w500,
                                color: MyColors.blue,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                            const SizedBox(
                              height: 7,
                            ),
                            Row(
                              children: [
                                Icon(
                                  Icons.star,
                                  size: 10,
                                  color: (rate > 0)
                                      ? const Color.fromRGBO(228, 178, 0, 1)
                                      : const Color.fromRGBO(217, 217, 217, 1),
                                ),
                                Icon(
                                  Icons.star,
                                  size: 10,
                                  color: (rate > 1)
                                      ? const Color.fromRGBO(228, 178, 0, 1)
                                      : const Color.fromRGBO(217, 217, 217, 1),
                                ),
                                Icon(
                                  Icons.star,
                                  size: 10,
                                  color: (rate > 2)
                                      ? const Color.fromRGBO(228, 178, 0, 1)
                                      : const Color.fromRGBO(217, 217, 217, 1),
                                ),
                                Icon(
                                  Icons.star,
                                  size: 10,
                                  color: (rate > 3)
                                      ? const Color.fromRGBO(228, 178, 0, 1)
                                      : const Color.fromRGBO(217, 217, 217, 1),
                                ),
                                Icon(
                                  Icons.star,
                                  size: 10,
                                  color: (rate > 4)
                                      ? const Color.fromRGBO(228, 178, 0, 1)
                                      : const Color.fromRGBO(217, 217, 217, 1),
                                ),
                              ],
                            ),
                            const Expanded(child: SizedBox()),
                            const Align(
                              alignment: Alignment.bottomRight,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.end,
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
                      ),
                      InkWell(
                        onTap: () {
                          controller.changeFavorite(x);
                        },
                        child: Padding(
                          padding: const EdgeInsets.all(14.0),
                          child: Icon(
                            favorite ? Icons.favorite : Icons.favorite_border,
                            size: 20,
                            color: MyColors.blue,
                            shadows: const [
                              Shadow(
                                  color: Color.fromRGBO(35, 141, 148, 0.3),
                                  blurRadius: 8),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ],
    ),
  );
}

Widget buildBooked(
  ImageProvider image,
  int rate,
  String date,
  String placeName,
  String name,
) {
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
                Image(
                  image: image,
                  width: double.infinity,
                  height: double.infinity,
                  fit: BoxFit.cover,
                ),
                Container(
                  height: double.infinity,
                  width: double.infinity,
                  color: MyColors.black.withOpacity(0.5),
                  child: ClipRRect(
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 2, sigmaY: 2),
                      child: Padding(
                        padding: const EdgeInsets.only(
                            left: 21, bottom: 17, right: 20, top: 17),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  placeName,
                                  style: const TextStyle(
                                      color: MyColors.white,
                                      fontSize: 15,
                                      fontWeight: FontWeight.w600),
                                ),
                                const Expanded(child: SizedBox()),
                                Text(
                                  date,
                                  style: TextStyle(
                                    color: MyColors.white.withOpacity(1),
                                    fontSize: 10.5,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ],
                            ),
                            const Expanded(child: SizedBox()),
                            Row(
                              children: [
                                CircleAvatar(
                                  radius: 14,
                                  foregroundImage: image,
                                  backgroundColor: MyColors.grey,
                                ),
                                const SizedBox(
                                  width: 8,
                                ),
                                Text(
                                  name,
                                  style: TextStyle(
                                    color: MyColors.white.withOpacity(1),
                                    fontSize: 12,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                              ],
                            ),
                            const Expanded(child: SizedBox()),
                            Row(
                              children: [
                                /* InkWell(
                                  onTap: () {
                                    ///navigate to book screen
                                    ///
                                    StripeService.instance.makePayment(100);
                                  },
                                  child: Container(
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
                                            fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                  ),
                                ), */
                                const Expanded(child: SizedBox()),
                                InkWell(
                                  onTap: () {
                                    ///navigate to trip details
                                  },
                                  child: const Row(
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
        Container(
          height: 140,
          width: double.infinity,
          decoration: BoxDecoration(
            borderRadius: BorderRadiusDirectional.circular(12),
            border: Border.all(color: MyColors.lightBlue, width: 3),
          ),
        ),
      ],
    ),
  );
}

Widget buildTrip(
  ImageProvider image,
  String name,
  String date,
  int price,
  bool available,
) {
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
                  foregroundImage: image,
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
                      name,
                      style: const TextStyle(
                          color: MyColors.blue,
                          fontSize: 14,
                          fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(
                      height: 7,
                    ),
                    Text(
                      date,
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
                          '$price ',
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
                    const Row(
                      children: [
                        Text(
                          'Available  ',
                          style: TextStyle(
                              color: MyColors.green,
                              fontSize: 12,
                              fontWeight: FontWeight.bold),
                        ),
                        CircleAvatar(
                          radius: 4,
                          backgroundColor: MyColors.green,
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
                    ///
                    StripeService.instance.makePayment(price);
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
                    ///navigate to trip details
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

Widget buildComment(
  ImageProvider image,
  String name,
  String date,
  String comment,
  int rate,
  bool extended,
) {
  return Padding(
    padding: const EdgeInsets.only(bottom: 18.0),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            CircleAvatar(
              foregroundImage: image,
              radius: 19,
              backgroundColor: MyColors.lightGrey,
            ),
            const SizedBox(
              width: 10,
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(
                  height: 10,
                ),
                Text(
                  name,
                  textAlign: TextAlign.start,
                  style: const TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w600,
                      color: MyColors.black),
                ),
                SizedBox(
                  height: 10,
                  child: (rate == 0)
                      ? const SizedBox()
                      : Row(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            const SizedBox(
                              width: 3,
                            ),
                            Icon(
                              Icons.star,
                              size: 8,
                              color: (rate > 0)
                                  ? const Color.fromRGBO(228, 178, 0, 1)
                                  : const Color.fromRGBO(217, 217, 217, 1),
                            ),
                            Icon(
                              Icons.star,
                              size: 8,
                              color: (rate > 1)
                                  ? const Color.fromRGBO(228, 178, 0, 1)
                                  : const Color.fromRGBO(217, 217, 217, 1),
                            ),
                            Icon(
                              Icons.star,
                              size: 8,
                              color: (rate > 2)
                                  ? const Color.fromRGBO(228, 178, 0, 1)
                                  : const Color.fromRGBO(217, 217, 217, 1),
                            ),
                            Icon(
                              Icons.star,
                              size: 8,
                              color: (rate > 3)
                                  ? const Color.fromRGBO(228, 178, 0, 1)
                                  : const Color.fromRGBO(217, 217, 217, 1),
                            ),
                            Icon(
                              Icons.star,
                              size: 8,
                              color: (rate > 4)
                                  ? const Color.fromRGBO(228, 178, 0, 1)
                                  : const Color.fromRGBO(217, 217, 217, 1),
                            ),
                          ],
                        ),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8.0),
              child: Container(
                height: 2.5,
                width: 2.5,
                decoration: BoxDecoration(
                    color: MyColors.black,
                    borderRadius: BorderRadiusDirectional.circular(20)),
              ),
            ),
            Text(
              date,
              style: TextStyle(
                fontSize: 10.5,
                fontWeight: FontWeight.w500,
                color: MyColors.black.withOpacity(0.6),
              ),
            ),
          ],
        ),
        const SizedBox(
          height: 10,
        ),
        Text(
          comment,
          style: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w400,
            color: MyColors.black.withOpacity(0.6),
          ),
          overflow: TextOverflow.ellipsis,
          maxLines: extended ? 30 : 4,
        ),
      ],
    ),
  );
}
