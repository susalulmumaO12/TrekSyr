import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:dio/dio.dart';
// Replace these imports with your actual component imports
import 'package:my_tourism_app/components/dashLine.dart';
import 'package:my_tourism_app/components/itemTripDetails.dart';
import 'package:my_tourism_app/main.dart';
import 'package:my_tourism_app/models/trip_details_model.dart';
import 'package:my_tourism_app/models/trip_path_model.dart';
import 'package:my_tourism_app/services/stripe_service.dart';
import 'package:shared_preferences/shared_preferences.dart'; // Assuming this is where TripPathModel is defined

class TripDetails2 extends StatefulWidget {
  TripDetails2({
    Key? key,
    required this.token,
    required this.phone_number,
    required this.price,
    this.rate,
    required this.guide_fname,
    required this.guide_lname,
    required this.id,
    this.guide_image,
    required this.tripId,
    required this.userId,
  }) : super(key: key);

  final String token;
  final num tripId;
  final String phone_number;
  final String guide_fname;
  final String guide_lname;
  final num price;
  final double? rate;
  final num id;
  final String? guide_image;
  final num userId;

  @override
  State<TripDetails2> createState() => _TripDetails2State();
}

class _TripDetails2State extends State<TripDetails2> {
  late TripDetailsModel tripDetails;
  List<TripPathModel> tripPath = [];
  bool isLoading = true;
  bool isBookable = true; // Default to bookable
  bool isCancelable = false; // Default to cancelable
  bool isBooked = false; // Flag for booked status
  String buttonText = "Book Now"; // Initial button text
  String cancellationMessage = ""; // New variable to store the message

  @override
  void initState() {
    super.initState();
    fetchTripDetails();
    _checkBookableStatus().then((_) {
      print('isbooked after checking status: ${isBooked}');
      if (isBooked) {
        _checkCancelableStatus();
      }
    });
  }

  void fetchTripDetails() async {
    try {
      Dio dio = Dio();
      dio.options.headers["Authorization"] = "Bearer ${widget.token}";

      print('trip with id: ${widget.tripId}');
      // Fetching trip details
      final responseDetails = await dio.get(
        '${url}/api/user/tripDetails/$lang/${widget.tripId}',
        options: Options(
          validateStatus: (status) {
            return status != null;
          },
        ),
      );
      print('trip is: ${responseDetails.statusCode}');
      // Fetching trip path
      final responsePath = await dio.get(
        '${url}/api/user/tripPath/$lang/${widget.tripId}',
        options: Options(
          validateStatus: (status) {
            return status != null;
          },
        ),
      );

      if (responseDetails.statusCode == 200 && responsePath.statusCode == 200) {
        setState(() {
          tripDetails = TripDetailsModel.fromJson(responseDetails.data);
          tripPath = (responsePath.data as List)
              .map((e) => TripPathModel.fromJson(e))
              .toList();
          isLoading = false;
        });
      } else {
        // Handle other status codes here
        print('problem here');
        print(responseDetails);
        print(responsePath);
      }
    } catch (e) {
      // Handle error here
      print(e);
    }
  }

  Future<void> _checkBookableStatus() async {
    final Dio dio = Dio();
    String forToken = 'Bearer ${widget.token}';

    dio.options.headers = {
      'Authorization': forToken,
    };

    try {
      print("in check");
      Response response = await dio.get(
        '${url}/api/user/isBookable/${widget.userId}/${widget.tripId}',
        options: Options(
          validateStatus: (status) {
            return status != null;
          },
        ),
      );

      print("in check2");
      if (response.statusCode == 200) {
        //final data = jsonDecode(response.data);
        if (response.data['message'] == 'Already booked') {
          setState(() {
            print(response.data); // Print the response data
            isBookable = false;
            buttonText = "Cancel Booking";
            isBooked = true;
          });
        } else if (response.data['message'] == 'Booking is allowed') {
          setState(() {
            print(response.data); // Print the response data
            isBookable = true;
            buttonText = "Book Now";
          });
        }
      } else if (response.statusCode == 400) {
        setState(() {
          isBookable = false;
          buttonText =
              response.data['message']; // Access the 'message' from the Map
        });
      } else {
        // Handle errors (e.g., show an error message)
        print('heere ${response}');
        setState(() {
          isBookable = false;
          print('heeeeeeere ${response.data}');
          buttonText =
              "Error checking availability"; // Set button text to a string
        });
      }
    } catch (error) {
      print(error);
      // Handle network errors (e.g., show an error message)
      setState(() {
        isBookable = false;
        buttonText = "Error checking availability2";
      });
    }
  }

  Future<void> _checkCancelableStatus() async {
    final Dio dio = Dio();
    String forToken = 'Bearer ${widget.token}'; // Assuming you have a token

    dio.options.headers = {
      'Authorization': forToken,
    };

    try {
      print(
          'in cancel, user id is ${widget.userId}, trip id is ${widget.tripId}');
      Response response = await dio.get(
        '${url}/api/user/isCancelable/${widget.userId}/${widget.tripId}',
        options: Options(
          validateStatus: (status) {
            return status != null;
          },
        ),
      );

      if (response.statusCode == 200) {
        setState(() {
          print('in cancel 200');
          cancellationMessage = response.data['message'];
          isCancelable = true;
        });
      } else if (response.statusCode == 400) {
        setState(() {
          print('in cancel 400 ${response.data}');
          cancellationMessage = response.data['message'];
          isCancelable = false;
        });
      } else {
        // Handle errors
        print('in cancel ${response.statusCode}');
        setState(() {
          cancellationMessage = "Error";
          isCancelable = false;
        });
      }
    } catch (error) {
      // Handle network errors
      setState(() {
        print('in cancel error');
        cancellationMessage = "Error checking availability";
      });
    }
  }

  validateBooking() async {
    try {
      Dio dio = Dio();
      dio.options.headers["Authorization"] = "Bearer ${widget.token}";

      // Fetching trip details
      final response = await dio.get(
        '${url}/api/user/validateBooking/${widget.userId}/${widget.tripId}',
        options: Options(
          validateStatus: (status) {
            return status != null;
          },
        ),
      );

      return response;
    } catch (e) {
      // Handle error here
      print(e);
    }
  }

  bookTrip(String paymentIntentId) async {
    try {
      Dio dio = Dio();
      dio.options.headers["Authorization"] = "Bearer ${widget.token}";

      // Fetching trip details
      final response = await dio
          .post('${url}/api/user/bookTrip/${widget.userId}/${widget.tripId}',
              options: Options(
        validateStatus: (status) {
          return status != null;
        },
      ), data: {'paymentIntentId': paymentIntentId});
      print('booked---------------');
      return response;
    } catch (e) {
      // Handle error here
      print(e);
    }
  }

  handleRefund(String paymentIntentId) async {
    print('Refund processed successfully');
    // Validate the refund first
    Dio dio = Dio();

    dio.options.headers["Authorization"] = "Bearer ${widget.token}";

    var response =
        await dio.get("${url}/api/user/validateRefund/${widget.tripId}");

    print('Refund processed successfully');
    if (response.statusCode == 200) {
      var refundAmount = response.data['refund_amount'];
      if (refundAmount > 0) {
        // Process the refund
        print('Refund processed successfully');
        await StripeService.instance
            .processRefund(paymentIntentId, refundAmount);
      }

      var response2 = await dio.post("${url}/api/user/cancelBooking",
          data: {"user_id": widget.userId, "trip_id": widget.tripId});

      if (response2.statusCode == 200) {
        setState(() {
          isBooked = false;
          isBookable = true;
          buttonText = 'Book Now';
        });

        return response2.data;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xffEEF7F8),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.only(
                  left: 36,
                  right: 36,
                  top: 42,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    //  SizedBox(height: 20),
                    Row(
                      children: [
                        InkWell(
                          onTap: () {
                            Navigator.pop(context);
                          },
                          child: Container(
                            height: 38,
                            width: 38,
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: const Icon(
                              Icons.arrow_forward_ios,
                              color: Color(0xff23888E),
                              size: 19.393,
                              textDirection: TextDirection.rtl,
                            ),
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 20),
                    Container(
                      height: 80,
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
                            child: widget.guide_image != null
                                ? Image.network(
                                    widget.guide_image!,
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
                            child: Padding(
                              padding: const EdgeInsets.only(left: 10.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    '${widget.guide_fname} ${widget.guide_lname}',
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                    style: TextStyle(
                                      color: Color(0xff47AEB5),
                                      fontWeight: FontWeight.bold,
                                      fontFamily: 'Inter',
                                      fontSize: 18,
                                    ),
                                  ),
                                  SizedBox(height: 4),
                                  Row(
                                    children: List.generate(
                                      5,
                                      (index) => Icon(
                                        Icons.star,
                                        color: (widget.rate != null &&
                                                widget.rate! > index)
                                            ? Color(0xffE4B200)
                                            : Color(0xffD9D9D9),
                                        size: 13,
                                      ),
                                    ),
                                  ),
                                  SizedBox(height: 4),
                                  Text(
                                    '${widget.price} S.P.',
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontFamily: 'Inter',
                                      fontSize: 15,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 20),
                    Row(
                      children: [
                        Icon(
                          Icons.tour,
                          size: 18,
                        ),
                        SizedBox(width: 3),
                        Text(
                          'Tour details',
                          style: TextStyle(
                            fontFamily: 'Inter',
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 8),
                    Row(
                      children: [
                        SizedBox(width: 23),
                        Expanded(
                          child: Text(
                            "Name: ${tripDetails.name}",
                            style: TextStyle(
                              color: Color(0xff6D7272),
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Inter',
                              fontSize: 11,
                            ),
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 20),
                    ListView.separated(
                      physics: NeverScrollableScrollPhysics(),
                      shrinkWrap: true,
                      itemCount: tripPath.length,
                      separatorBuilder: (context, index) => SizedBox(
                        width: 10,
                        height: 30,
                        child: DashedLineVertical(),
                      ),
                      itemBuilder: (context, index) {
                        return ItemTripDetails(
                          tripDetailsModel: tripPath[index],
                        );
                      },
                    ),
                    SizedBox(height: 20),
                    Row(
                      children: [
                        Icon(
                          Icons.date_range,
                          size: 18,
                        ),
                        SizedBox(width: 3),
                        Text(
                          'Date',
                          style: TextStyle(
                            fontFamily: 'Inter',
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 8),
                    Row(
                      children: [
                        SizedBox(width: 23),
                        Expanded(
                          child: Text(
                            "Starting time: ${tripDetails.startingTime}",
                            style: TextStyle(
                              color: Color(0xff6D7272),
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Inter',
                              fontSize: 11,
                            ),
                          ),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        SizedBox(width: 23),
                        Expanded(
                          child: Text(
                            "Ending time: ${tripDetails.endingTime}",
                            style: TextStyle(
                              color: Color(0xff6D7272),
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Inter',
                              fontSize: 11,
                            ),
                          ),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        SizedBox(width: 23),
                        Expanded(
                          child: Text(
                            "Closing date: ${tripDetails.closingDate}",
                            style: TextStyle(
                              color: Color(0xff6D7272),
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Inter',
                              fontSize: 11,
                            ),
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 20),
                    Row(
                      children: [
                        Icon(
                          Icons.place,
                          size: 18,
                        ),
                        SizedBox(width: 3),
                        Text(
                          'Gathering place',
                          style: TextStyle(
                            fontFamily: 'Inter',
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 8),
                    Row(
                      children: [
                        SizedBox(width: 23),
                        Expanded(
                          child: Text(
                            '${tripDetails.gatheringPlace}',
                            style: TextStyle(
                              color: Color(0xff6D7272),
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Inter',
                              fontSize: 11,
                            ),
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 20),
                    Row(
                      children: [
                        Image.asset(
                          'assets/healthicons_running.png',
                          width: 18,
                        ),
                        SizedBox(width: 3),
                        Text(
                          'Number of tourists',
                          style: TextStyle(
                            fontFamily: 'Inter',
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 8),
                    Row(
                      children: [
                        SizedBox(width: 23),
                        Expanded(
                          child: Text(
                            "${tripDetails.capacity} tourists",
                            style: TextStyle(
                              color: Color(0xff6D7272),
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Inter',
                              fontSize: 11,
                            ),
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 34),
                    Container(
                      decoration: BoxDecoration(
                        color: !isBooked
                            ? !isBookable
                                ? Colors.grey
                                : Color(0xff47AEB5)
                            : Color.fromARGB(255, 183, 137, 137),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      width: double.infinity,
                      height: 55,
                      child: MaterialButton(
                        onPressed: !isBooked
                            ? isBookable
                                ? () async {
                                    //TODO await validateBooking(userId, tripId);
                                    var responseValidate =
                                        await validateBooking();

                                    ScaffoldMessenger.of(context).showSnackBar(
                                      SnackBar(
                                        margin: EdgeInsets.only(
                                            bottom: MediaQuery.of(context)
                                                    .size
                                                    .height -
                                                100,
                                            left: 10,
                                            right: 10),
                                        content: Text(
                                            "${responseValidate.data['message']}"),
                                        backgroundColor:
                                            (responseValidate.statusCode == 200)
                                                ? Colors.green
                                                : Colors.red,
                                        behavior: SnackBarBehavior.floating,
                                      ),
                                    );

                                    if (responseValidate.statusCode == 200) {
                                      print(
                                          'isbooked inside first: ${isBooked}');

                                      StripeService.instance
                                          .makePayment((widget.price.toInt()));

                                      print('id is ${paymentIntentId}');
                                      print('hellooooooooooooo');
                                      //TODO await bookTrip(userId, tripId);

                                      print('paid');
                                      var responseBook = await bookTrip(
                                          'pi_3PobJlLCgNcgzUrX0isRSgg2');
                                      if (responseBook.statusCode == 200) {
                                        setState(() {
                                          isBooked = true;
                                          isBookable = false;
                                          buttonText = 'Cancel Booking';
                                        });
                                      }
                                      ScaffoldMessenger.of(context)
                                          .showSnackBar(
                                        SnackBar(
                                          margin: EdgeInsets.only(
                                              bottom: MediaQuery.of(context)
                                                      .size
                                                      .height -
                                                  100,
                                              left: 10,
                                              right: 10),
                                          content: Text(
                                              "${responseBook.data['message']}"),
                                          backgroundColor:
                                              (responseBook.statusCode == 200)
                                                  ? Colors.green
                                                  : Colors.red,
                                          behavior: SnackBarBehavior.floating,
                                        ),
                                      );
                                    }
                                  }
                                : () {
                                    print('not bookable');
                                  }
                            : () async {
                                //TODO await validaterRefund(userId, tripdId);
                                print('isbooked inside second: ${isBooked}');
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    margin: EdgeInsets.only(
                                        bottom:
                                            MediaQuery.of(context).size.height -
                                                100,
                                        left: 10,
                                        right: 10),
                                    content: Text("$cancellationMessage"),
                                    backgroundColor: isCancelable
                                        ? Colors.green
                                        : Colors.red,
                                    behavior: SnackBarBehavior.floating,
                                  ),
                                );

                                //TODO await cancelBooking(userId, tripId);
                                var res =
                                    handleRefund('pi_3Po8k2LCgNcgzUrX0RIYwjkw');

                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    margin: EdgeInsets.only(
                                        bottom:
                                            MediaQuery.of(context).size.height -
                                                100,
                                        left: 10,
                                        right: 10),
                                    content: Text("$res"),
                                    backgroundColor: Colors.green,
                                    behavior: SnackBarBehavior.floating,
                                  ),
                                );
                              }, // Disable button if not bookable
                        child: Text(
                          buttonText, // Display dynamic button text
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 15,
                          ),
                        ),
                      ),
                    ),
                    SizedBox(height: 34),
                    Column(
                      // crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Contact us',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 11,
                            color: Color(0xff47AEB5),
                            fontFamily: 'Inter',
                          ),
                        ),
                        SizedBox(height: 11),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.call,
                              size: 15,
                              color: Color(0xff6D7272),
                            ),
                            SizedBox(width: 4),
                            Text(
                              widget.phone_number,
                              style: TextStyle(
                                color: Color(0xff6D7272),
                                fontWeight: FontWeight.bold,
                                fontFamily: 'Inter',
                                fontSize: 11,
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 8),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.place,
                              size: 15,
                              color: Color(0xff6D7272),
                            ),
                            SizedBox(width: 4),
                            Text(
                              "Palmyra,meaw street",
                              style: TextStyle(
                                color: Color(0xff6D7272),
                                fontWeight: FontWeight.bold,
                                fontFamily: 'Inter',
                                fontSize: 11,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                    SizedBox(height: 35),
                  ],
                ),
              ),
            ),
    );
  }
}
