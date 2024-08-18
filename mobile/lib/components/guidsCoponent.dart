import 'package:flutter/material.dart';
import 'package:my_tourism_app/components/average_rating_component.dart';
import 'package:my_tourism_app/pages/guids_comments_screen.dart';
import 'package:my_tourism_app/screens/otherScreens/guid_trips_screen.dart';
import 'package:my_tourism_app/services/add_guid_to_fav_service.dart';

class GuidsComponent extends StatefulWidget {
  final num id;
  final String firstName;
  final String lastName;
  final String? imageUrl;
  final double? averageRating;
  final bool isFavorite;
  final String token;
  final num userId;
  const GuidsComponent({
    super.key,
    required this.firstName,
    required this.lastName,
    this.imageUrl,
   
    this.averageRating,
    required this.isFavorite,

    required this.id,
    required this.token,
    required this.userId,
  });

  @override
  State<GuidsComponent> createState() => _GuidsComponentState();
}

class _GuidsComponentState extends State<GuidsComponent> {
  late bool isFavorited;

  @override
  void initState() {
    super.initState();
    isFavorited = widget.isFavorite;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: 15),
      height: 100,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(7),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 12),
        child: Row(
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    CircleAvatar(
                      radius: 13.0,
                      backgroundImage: widget.imageUrl != null
                          ? NetworkImage(widget.imageUrl!)
                          : AssetImage('assets/logo1.png') as ImageProvider,
                      backgroundColor: Colors.white,
                    ),
                    SizedBox(
                      width: 10,
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '${widget.firstName} ${widget.lastName}',
                          style: TextStyle(
                            fontSize: 12,
                            fontFamily: 'Inter',
                            fontWeight: FontWeight.bold,
                            color: Color(0xff47AEB5),
                          ),
                        ),
                        SizedBox(
                          height: 5,
                        ),
                        AverageRating(averageRating: widget.averageRating!, size: 8,),
                        // Row(
                        //   children: List.generate(
                        //     5,
                        //     (index) => Icon(
                        //       Icons.star,
                        //       size: 8,
                        //       color: (widget.averageRating != null &&
                        //               widget.averageRating! > index)
                        //           ? const Color.fromRGBO(228, 178, 0, 1)
                        //           : const Color.fromRGBO(217, 217, 217, 1),
                        //     ),
                        //   ),
                        // ),
                      ],
                    ),
                  ],
                ),
                SizedBox(
                  height: 15,
                ),
                Container(
                  height: 30,
                  width: 106,
                  decoration: BoxDecoration(
                    color: Color(0xffA7A7A7),
                    borderRadius: BorderRadius.circular(3),
                  ),
                  child: MaterialButton(
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => GuidsCommentsScreen(
                                    token: widget.token,
                                    id: widget.id,
                                  ))
                          //MaterialPageRoute(builder: (context) => Profile(userId: userId, token: token,)),
                          // MaterialPageRoute(builder: (context) => ScreensTabView(token: token, id: userId,)),
                          );
                    },
                    child: Text(
                      'view comments',
                      style: TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ],
            ),
            Spacer(
              flex: 1,
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                InkWell(
                  onTap: () async {
                    setState(() {
                      isFavorited = !isFavorited;
                    });
                    int state = await AddGuidToFavService(
                        widget.userId, widget.id, widget.token);
                    if (state == 200) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text("Added to favorite successfully"),
                          backgroundColor: Colors.green,
                          behavior: SnackBarBehavior.floating,
                        ),
                      );
                    } else if (state == 204) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text("Removed from favorite successfully"),
                          backgroundColor: Colors.red,
                          behavior: SnackBarBehavior.floating,
                        ),
                      );
                    } else if (state == 401) {
                      setState(() {
                        isFavorited = !isFavorited;
                      });
                      print('guest cannot');
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text("You need to login first!"),
                          backgroundColor: Colors.red,
                          behavior: SnackBarBehavior.floating,
                        ),
                      );
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text("An error has occured"),
                          backgroundColor: Colors.red,
                          behavior: SnackBarBehavior.floating,
                        ),
                      );
                    }
                  },
                  child: Icon(
                    isFavorited ? Icons.favorite : Icons.favorite_outline,
                    color: Color(0xff47AEB5),
                    size: 20,
                  ),
                ),
                SizedBox(
                  height: 30,
                ),
                InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => GuidTripScreen(
                          id: widget.id,
                          token: widget.token,
                          userId: widget.userId,
                        ),
                      ),
                    );
                  },
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
                            fontFamily: 'Inter',
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
    );
  }
}
