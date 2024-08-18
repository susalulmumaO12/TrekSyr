import 'dart:convert';
import 'dart:ui';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:my_tourism_app/animation/pageTransitions.dart';
import 'package:my_tourism_app/components/average_rating_component.dart';
import 'package:my_tourism_app/components/place_trips_component.dart';
import 'package:my_tourism_app/controllers/tap_controller.dart';
import 'package:my_tourism_app/main.dart';
import 'package:my_tourism_app/pages/comments_screen.dart';
import 'package:my_tourism_app/pages/place_comments_screen.dart';
import 'package:my_tourism_app/screens/auth/Login.dart';
import 'package:my_tourism_app/screens/otherScreens/rate_screen.dart';
import 'package:my_tourism_app/services/place_trips_service.dart';
import 'package:my_tourism_app/shared/colors.dart';
import 'package:my_tourism_app/shared/components.dart';

class PlaceDetails extends StatefulWidget {

  const PlaceDetails({Key? key, required this.name, required this.city, required this.averageRating, required this.isFavorite, required this.placeId, required this.token, required this.userId}) : super(key: key);

  final String name;
  final String city;
  final double averageRating;
  final bool isFavorite;
  final num placeId;
  final String token;
  final num userId;

  @override
  State<PlaceDetails> createState() => _PlaceDetailsState();
}

class _PlaceDetailsState extends State<PlaceDetails> {
  late Dio _dio;
  List<String> _images = [];
  bool _isLoading = true;
  bool expandDescription = false;
  int imageIndex = 0;
  int imageSelected = 0;
  String selectedOption = 'Newest';
  List<String> options = ['Newest', 'Cheapest', 'Most rated'];
  TapController controller = Get.find();
  String description = '';
  int commentCount = 0;
  late PlaceTripsService _placeTripsService;
  bool _isLoadingTrips = true;
  List<Trip> _trips = [];

  @override
  void initState() {
    super.initState();
    fetchPlaceDetails(widget.token);
    _placeTripsService = PlaceTripsService(widget.token);
    _fetchTrips();
    _dio = Dio();
    _fetchImages();
  }

  Future<void> _fetchTrips() async {
    setState(() {
      _isLoadingTrips = true;
    });
    try {
      num placeId = widget.placeId; // Replace with actual user ID

      List<Trip> trips = await _placeTripsService.fetchPlaceTrips(placeId);
      setState(() {
        _trips = trips;
        _isLoadingTrips = false;
      });
    } catch (e) {
      print(e);
      setState(() {
        _isLoadingTrips = false;
      });
    }
  }

  Future<void> fetchPlaceDetails(String tokennn) async {
    Dio dio = Dio();
    String forToken = 'Bearer $tokennn';

    dio.options.headers = {
      'Authorization': forToken,
    };
    try {
      final response =
          await dio.get('$url/api/mutual/placeDetails/$lang/${widget.placeId}');
      if (response.statusCode == 200) {
        final data = response.data;
        print(response.data);
        setState(() {
          description = data['description'];
          commentCount = data['comment_count'];
        });
      } else {
        print('Error: ${response.statusCode}');
      }
    } catch (e) {
      print('Error: $e');
    }
  }

  Future<void> _fetchImages() async {
    try {
      final response = await _dio.get(
        '$url/api/mutual/placeImages/${widget.placeId}',
        options: Options(
          headers: {
            'Authorization': 'Bearer ${widget.token}',
          },
        ),
      );
      if (response.statusCode == 200) {
        print(response.data);
        setState(() {
          _images = List<String>.from(
              response.data.map((image) => image['image'] ?? ''));
          _isLoading = false;
        });
      } else {
        throw Exception('Failed to load images');
      }
    } catch (e) {
      print(e);
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyColors.lightBlue,
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: <Widget>[
          SliverAppBar(
            leading: const SizedBox(),
            pinned: true,
            stretch: true,
            elevation: 0,
            expandedHeight: 372.0,
            systemOverlayStyle: const SystemUiOverlayStyle(
              statusBarColor: Colors.transparent,
              statusBarIconBrightness: Brightness.light,
            ),
            flexibleSpace: FlexibleSpaceBar(
              stretchModes: const [StretchMode.zoomBackground],
              titlePadding: const EdgeInsets.all(0),
              expandedTitleScale: 1.2,
              title: Container(
                height: 43,
                width: double.infinity,
                decoration: BoxDecoration(
                  color: MyColors.lightBlue,
                  borderRadius: const BorderRadius.vertical(
                    top: Radius.circular(50),
                  ),
                  border: Border.all(color: MyColors.lightBlue, width: 0),
                ),
              ),
              background: Stack(
                fit: StackFit.expand,
                children: [
                  Container(
                    color: Colors.grey,
                  ),
                  if (_images.isNotEmpty)
                    Image.memory(
                      base64Decode(_images[imageSelected]),
                      fit: BoxFit.cover,
                    ),
                  Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 32, vertical: 56),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            InkWell(
                              onTap: () {
                                Navigator.pop(
                                  context,
                                );
                              },
                              child: Container(
                                height: 38,
                                width: 38,
                                clipBehavior: Clip.antiAlias,
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: BackdropFilter(
                                  filter:
                                      ImageFilter.blur(sigmaY: 2, sigmaX: 2),
                                  child: Container(
                                    color: Colors.white.withOpacity(0.5),
                                    child: const Icon(
                                      Icons.arrow_forward_ios,
                                      color: Colors.white,
                                      size: 19.393,
                                      textDirection: TextDirection.rtl,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            Container(
                              height: 38,
                              width: 38,
                              clipBehavior: Clip.antiAlias,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: BackdropFilter(
                                filter: ImageFilter.blur(sigmaY: 2, sigmaX: 2),
                                child: GetBuilder<TapController>(
                                  builder: (controller) => InkWell(
                                    onTap: () {
                                      controller.changeFavorite(controller.x);
                                    },
                                    child: Container(
                                      color: Colors.white.withOpacity(0.5),
                                      child: Icon(
                                        (controller
                                                .places[controller.x].favorite)
                                            ? Icons.favorite
                                            : Icons.favorite_border,
                                        color: MyColors.white,
                                        size: 19.393,
                                        textDirection: TextDirection.rtl,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const Expanded(child: SizedBox()),
                    ],
                  ),
                ],
              ),
            ),
          ),
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (BuildContext context, int index) {
                return Container(
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: MyColors.lightBlue,
                    border: Border.all(color: MyColors.lightBlue, width: 0),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsetsDirectional.only(
                            start: 32, end: 30.5, bottom: 5),
                        child: Row(
                          children: [
                            Text(
                              widget.city,
                              style: const TextStyle(
                                fontSize: 15,
                              ),
                            ),
                            const Expanded(child: SizedBox()),

                           AverageRating(averageRating: widget.averageRating, size: 14,),

                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsetsDirectional.only(
                            start: 32, bottom: 8),
                        child: Text(
                          widget.name,
                          style: const TextStyle(
                              fontSize: 25,
                              fontWeight: FontWeight.bold,
                              color: MyColors.blue),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsetsDirectional.only(start: 38),
                        child: InkWell(
                          onTap: () {},
                          child: InkWell(
                            onTap: () {
                              Navigator.pushReplacement(
                                  context,
                                  PageTransition(
                                      child: PlaceCommentsScreen(
                                        token: widget.token,
                                        id: widget.placeId,
                                      ),
                                      fade: true));
                            },
                            child: Row(
                              children: [
                                Container(
                                  child: (commentCount == 0)
                                      ? const SizedBox()
                                      : Stack(
                                          alignment: Alignment.centerLeft,
                                          children: [
                                            Container(
                                              height: 27,
                                              width: 27,
                                              decoration: BoxDecoration(
                                                  color: MyColors.lightBlue,
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          50)),
                                              child: Padding(
                                                padding:
                                                    const EdgeInsets.all(1),
                                                child: CircleAvatar(
                                                  backgroundColor:
                                                      const Color.fromRGBO(
                                                          200, 200, 202, 1),
                                                  backgroundImage: controller
                                                      .places[controller.x]
                                                      .comments[0]
                                                      .image,
                                                ),
                                              ),
                                            ),
                                            (commentCount < 2)
                                                ? const SizedBox()
                                                : Padding(
                                                    padding:
                                                        const EdgeInsets.only(
                                                            left: 20),
                                                    child: Container(
                                                      height: 27,
                                                      width: 27,
                                                      decoration: BoxDecoration(
                                                          color: MyColors
                                                              .lightBlue,
                                                          borderRadius:
                                                              BorderRadius
                                                                  .circular(
                                                                      50)),
                                                      child: Padding(
                                                        padding:
                                                            const EdgeInsets
                                                                .all(1),
                                                        child: CircleAvatar(
                                                          backgroundColor:
                                                              const Color
                                                                  .fromRGBO(200,
                                                                  200, 202, 1),
                                                          backgroundImage:
                                                              controller
                                                                  .places[
                                                                      controller
                                                                          .x]
                                                                  .comments[1]
                                                                  .image,
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                            (commentCount < 3)
                                                ? const SizedBox()
                                                : Padding(
                                                    padding:
                                                        const EdgeInsets.only(
                                                            left: 40),
                                                    child: Container(
                                                      height: 27,
                                                      width: 27,
                                                      decoration: BoxDecoration(
                                                          color: MyColors
                                                              .lightBlue,
                                                          borderRadius:
                                                              BorderRadius
                                                                  .circular(
                                                                      50)),
                                                      child: Padding(
                                                        padding:
                                                            const EdgeInsets
                                                                .all(1),
                                                        child: CircleAvatar(
                                                          backgroundColor:
                                                              const Color
                                                                  .fromRGBO(200,
                                                                  200, 202, 1),
                                                          backgroundImage:
                                                              controller
                                                                  .places[
                                                                      controller
                                                                          .x]
                                                                  .comments[2]
                                                                  .image,
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                            (commentCount < 4)
                                                ? const SizedBox()
                                                : Padding(
                                                    padding:
                                                        const EdgeInsets.only(
                                                            left: 60),
                                                    child: Container(
                                                      height: 27,
                                                      width: 27,
                                                      decoration: BoxDecoration(
                                                          color: MyColors
                                                              .lightBlue,
                                                          borderRadius:
                                                              BorderRadius
                                                                  .circular(
                                                                      50)),
                                                      child: Padding(
                                                        padding:
                                                            const EdgeInsets
                                                                .all(1),
                                                        child: CircleAvatar(
                                                          backgroundColor:
                                                              const Color
                                                                  .fromRGBO(200,
                                                                  200, 202, 1),
                                                          backgroundImage: (commentCount ==
                                                                  4)
                                                              ? controller
                                                                  .places[
                                                                      controller
                                                                          .x]
                                                                  .comments[3]
                                                                  .image
                                                              : const AssetImage(
                                                                  'assets/images/basics/cv_bg.png'),
                                                          child: Center(
                                                            child: Text(
                                                              (commentCount > 4)
                                                                  ? '+${(commentCount > 102) ? 99 : commentCount - 3}'
                                                                  : '',
                                                              style:
                                                                  const TextStyle(
                                                                color: Colors
                                                                    .white,
                                                                fontSize: 13,
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
                                const SizedBox(width: 6),
                                Padding(
                                  padding:
                                      const EdgeInsets.symmetric(vertical: 8),
                                  child: Column(
                                    children: [
                                      Text(
                                        (commentCount == 0)
                                            ? 'No Comments'
                                            : 'View Comments',
                                        style: TextStyle(
                                          fontSize: 8,
                                          fontWeight: FontWeight.w500,
                                          color: Colors.black.withOpacity(0.54),
                                        ),
                                      ),
                                      Container(
                                        width: 61,
                                        height: 0.8,
                                        color: (commentCount == 0)
                                            ? Colors.transparent
                                            : Colors.black.withOpacity(0.54),
                                      ),
                                    ],
                                  ),
                                ),
                                Icon(
                                  Icons.arrow_forward_ios,
                                  size: 9,
                                  color: (commentCount == 0)
                                      ? Colors.transparent
                                      : Colors.black.withOpacity(0.54),
                                ),
                                const SizedBox(
                                  width: 20,
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsetsDirectional.only(
                            start: 38, top: 26, end: 30),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                           
                            // const SizedBox(
                            //   height: 15,
                            // ),
                            const Text(
                              'Description',
                              style: TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.w500,
                                  color: Colors.black),
                            ),
                            const SizedBox(
                              height: 6,
                            ),
                            InkWell(
                              onTap: () {
                                setState(() {
                                  expandDescription =
                                      expandDescription ? false : true;
                                });
                              },
                              child: Text(
                                description,
                                style: const TextStyle(
                                    fontSize: 11,
                                    color: Color.fromRGBO(141, 141, 141, 1)),
                                overflow: TextOverflow.ellipsis,
                                maxLines: expandDescription ? 100 : 2,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(
                        height: 11,
                      ),
                      _isLoading
                          ? const Center(child: CircularProgressIndicator())
                          : SizedBox(
                              height: 79,
                              width: double.infinity,
                              child: ListView.builder(
                                scrollDirection: Axis.horizontal,
                                itemBuilder: (context, index) {
                                  return Padding(
                                    padding: (index == 0)
                                        ? const EdgeInsetsDirectional.only(
                                            start: 38,
                                            end: 12,
                                            top: 12,
                                            bottom: 12)
                                        : const EdgeInsetsDirectional.only(
                                            end: 12, top: 12, bottom: 12),
                                    child: InkWell(
                                      onTap: () {
                                        setState(() {
                                          imageSelected = index;
                                        });
                                      },
                                      child: Container(
                                        decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(5),
                                          border: Border.all(
                                              color: MyColors.lightBlue,
                                              width: 2),
                                          boxShadow: [
                                            BoxShadow(
                                              color: (index == imageSelected)
                                                  ? MyColors.black
                                                      .withOpacity(0.5)
                                                  : Colors.black.withOpacity(0),
                                              blurRadius: 8,
                                            ),
                                          ],
                                        ),
                                        clipBehavior: Clip.antiAlias,
                                        child: Container(
                                          decoration: BoxDecoration(
                                            borderRadius:
                                                BorderRadius.circular(5),
                                          ),
                                          clipBehavior: Clip.antiAlias,
                                          child: _images[index].isNotEmpty
                                              ? Image.memory(
                                                  base64Decode(_images[index]),
                                                  fit: BoxFit.cover,
                                                  height: 55,
                                                  width: 55,
                                                )
                                              : Image.asset(
                                                  'assets/images/temp/tourism.jpg',
                                                  fit: BoxFit.cover,
                                                  height: 55,
                                                  width: 55,
                                                ),
                                        ),
                                      ),
                                    ),
                                  );
                                },
                                itemCount: _images.length,
                              ),
                            ),
                      Padding(
                        padding: const EdgeInsetsDirectional.only(
                            start: 36, top: 21, end: 26),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            const Text(
                              'Trips',
                              style: TextStyle(
                                  fontSize: 15.5,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black),
                            ),
                            const Expanded(child: SizedBox()),
                            Container(
                              decoration: BoxDecoration(
                                  border: Border.all(
                                      color: MyColors.black.withOpacity(0.6),
                                      width: 1),
                                  borderRadius: BorderRadius.circular(5)),
                              child: DropdownButton<String>(
                                iconSize: 20,
                                padding: const EdgeInsets.only(
                                    left: 8, top: 2, bottom: 2),
                                value: selectedOption,
                                underline: const SizedBox(),
                                icon: const Icon(
                                  Icons.arrow_drop_down,
                                  color: MyColors.black,
                                  size: 20,
                                ),
                                dropdownColor: MyColors.lightBlue,
                                isDense: true,
                                style: const TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w400,
                                    color: MyColors.black),
                                items: options.map((String option) {
                                  return DropdownMenuItem<String>(
                                    value: option,
                                    child: Text(option),
                                  );
                                }).toList(),
                                onChanged: (String? newValue) {
                                  setState(() {
                                    selectedOption =
                                        newValue!; // تحديث القيمة المحددة عند تغيير الخيار
                                  });
                                },
                              ),
                            ),
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 36),
                        child: ListView.builder(

                          physics: const NeverScrollableScrollPhysics(),
                          shrinkWrap: true,
                          padding: const EdgeInsets.only(top: 14),
                          itemCount:
                             _trips.length,
                          itemBuilder: (context, index) {
                            final trip=_trips[index];
                            return PlaceTripComponent(tripId: trip.tripId, name: trip.name, startingTime: trip.starting_time, price: trip.price, duration: trip.duration, available: trip.available, image: trip.image, token: widget.token, guideId: trip.guideId, userId: widget.userId,);
                          } 
                        ),
                      ),
                       Padding(
  padding: const EdgeInsets.only(left: 34.0,bottom: 30),
  child: MaterialButton(
    onPressed: () {
showDialog(
        context: context,
        builder: (BuildContext context) {
          return  RateScreen(userId: widget.userId, placeId: widget.placeId, token:widget.token,); // استدعاء RateScreen هنا كـ Dialog
        },
      );    },
    color: Color.fromRGBO(228, 178, 0, 1),
    padding: const EdgeInsets.symmetric(vertical: 15.0, horizontal: 25.0), 
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(4.0), 
    ),
    child: Text(
      'Rate Place',
      style: const TextStyle(
        color: Colors.white,
        fontSize: 16,
        fontWeight: FontWeight.bold, 
      ),
    ),
  ),
),

                    ],
                  ),
                );
              },
              childCount: 1,
            ),
          ),
        ],
      ),
    );
  }
}
