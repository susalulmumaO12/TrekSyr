import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:my_tourism_app/animation/pageTransitions.dart';
import 'package:my_tourism_app/pages/place_details.dart';
import 'package:my_tourism_app/services/add_place_to_fav_service.dart';
import 'package:my_tourism_app/services/places_service.dart';

class PlaceComponent extends StatefulWidget {
  final String name;
  final String city;
  final double averageRating;
  bool isFavorite;
  final String imageUrl;
  final num placeId;
  final String token;
  final num userId ; // Assuming it's a base64 string for the image

  PlaceComponent({
    Key? key,
    required this.name,
    required this.city,
    required this.averageRating,
    required this.isFavorite,
    required this.imageUrl,
    required this.placeId,

    required this.token, required this.userId,

    
  }) : super(key: key);

  @override
  State<PlaceComponent> createState() => _PlaceComponentState();
}

class _PlaceComponentState extends State<PlaceComponent> {
  @override
  Widget build(BuildContext context) {
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
                      color: Color(0xff47AEB5).withOpacity(0.5),
                      borderRadius: BorderRadius.circular(10),
                      boxShadow: [
                        BoxShadow(
                          color: Color(0xff47AEB5).withOpacity(
                              0.5), // نفس اللون المستخدم في الخلفية
                          blurRadius: 15, // يمكن تعديل هذا لتغيير شدة التظليل
                          offset: Offset(
                              0, 4), // يمكن تعديل هذا لتغيير اتجاه التظليل
                        ),
                      ],
                    ),
                    clipBehavior: Clip.antiAlias,

                    child: widget.imageUrl.isNotEmpty
                        ? (widget.imageUrl != null
                            ? Image.memory(
                                base64Decode(widget.imageUrl))
                            : Image.asset(
                                'assets/images/temp/tourism.jpg',
                                width: double.infinity,
                                height: double.infinity,
                                fit: BoxFit.cover,
                              ))
                        : Image.asset(
                            'assets/images/temp/tourism.jpg',
                            width: double.infinity,
                            height: double.infinity,
                            fit: BoxFit.cover,
                          ),
                  )),
                  
              const Expanded(
                flex: 70,
                child: SizedBox(),
              ),
            
             
            ],
          ),
          InkWell(
            onTap: () {
              Navigator.push(
                  context,
                  PageTransition(
                      child: PlaceDetails(

                        name: widget.name,
                        city: widget.city,
                        averageRating: widget.averageRating,
                        isFavorite: widget.isFavorite,
                        placeId: widget.placeId,
                        token: widget.token, userId: widget.userId,

                      ),
                      fade: true));
            },
            child: Row(
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
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(15),
                        boxShadow: [
                          BoxShadow(
                              color: Color(0xff47AEB5).withOpacity(0.25),
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
                                  widget.city,
                                  style: const TextStyle(
                                      color: Color.fromRGBO(97, 97, 97, 1),
                                      fontSize: 11,
                                      fontWeight: FontWeight.w500),
                                ),
                                const SizedBox(
                                  height: 4.5,
                                ),
                                Text(
                                  widget.name,
                                  style: const TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.w500,
                                    color: Color(0xff47AEB5),
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                                const SizedBox(
                                  height: 7,
                                ),
                                Row(
                                  children: List.generate(5, (index) {
                                    return Icon(
                                      Icons.star,
                                      size: 10,
                                      color: (index < widget.averageRating)
                                          ? const Color.fromRGBO(228, 178, 0, 1)
                                          : const Color.fromRGBO(
                                              217, 217, 217, 1),
                                    );
                                  }),
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
                            onTap: () async {
                              // تحديث حالة `isFavorite`
                              bool newIsFavorite = !widget.isFavorite;

                              // استدعاء الخدمة لإضافة أو إزالة من المفضلة
                              int state = await AddPlaceToFavService(
                                  widget.userId, widget.placeId, widget.token);

                              // التحقق من حالة الاستجابة وتحديث الواجهة بناءً على ذلك
                              if (state == 200 || state == 204) {
                                setState(() {
                                  // تحديث حالة `isFavorite` بناءً على نجاح الإضافة أو الإزالة
                                  widget.isFavorite = newIsFavorite;
                                });

                                // عرض رسالة نجاح للمستخدم
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(state == 200
                                        ? "Added to favorite successfully"
                                        : "Removed from favorite successfully"),
                                    backgroundColor: state == 200
                                        ? Colors.green
                                        : Colors.red,
                                    behavior: SnackBarBehavior.floating,
                                  ),
                                );
                              } else {
                                // عرض رسالة خطأ في حالة الفشل
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text("An error has occurred"),
                                    backgroundColor: Colors.red,
                                    behavior: SnackBarBehavior.floating,
                                  ),
                                );
                              }
                            },
                            child: Padding(
                              padding: const EdgeInsets.all(14.0),
                              child: Icon(

                                widget.isFavorite

                              
                                    ? Icons.favorite
                                    : Icons.favorite_border,
                                size: 20,
                                color: Color(0xff47AEB5),
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
          ),
        ],
      ),
    );
  }
}
