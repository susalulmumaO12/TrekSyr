import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:my_tourism_app/components/comment_component.dart';
import 'package:my_tourism_app/controllers/tap_controller.dart';
import 'package:my_tourism_app/services/comments_service.dart';
import 'package:my_tourism_app/shared/colors.dart';
import 'package:my_tourism_app/shared/components.dart';


class Comments extends StatefulWidget {
  const Comments({Key? key, required this.token}) : super(key: key);
   final String token;
  @override
  State<Comments> createState() => _CommentsState();
}

class _CommentsState extends State<Comments> {
  List<Map<String, dynamic>> comments = [];

  @override
  void initState() {
    super.initState();
    fetchComments(); // Default to fetching guides sorted by name
  }

  void fetchComments() async {
    var data = await getComments(widget.token);
    setState(() {
      comments = data.map<Map<String, dynamic>>((comment) {
        // Convert average_rating to double if possible, otherwise set to 0.0
        // var averageRating = guide['average_rating'];
        // double? rating;
        // if (averageRating is String) {
        //   averageRating = averageRating.trim(); // Remove any leading/trailing spaces
        //   rating = double.tryParse(averageRating) ?? 0.0;
        // } else if (averageRating is double) {
        //   rating = averageRating;
        // } else {
        //   rating = 0.0; // Default value if not a valid number
        // }

        return {
          'name': comment['name'],
          'time': comment['time'],
          'comment': comment['comment'],
          'rate': comment['rate'],
          'user_id': comment['user_id'],
          'image': comment['image'],
        };
      }).toList();
    });
  }
  int extendedIndex = 0;
  bool keyboardOpen = false;
  TextEditingController addComment = TextEditingController();
  final FocusNode _focusNode = FocusNode();
  TapController controller = Get.find();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyColors.lightBlue,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        shadowColor: Colors.transparent,
        systemOverlayStyle: const SystemUiOverlayStyle(
            statusBarColor: Colors.transparent,
            statusBarIconBrightness: Brightness.dark),
        toolbarHeight: 0,
      ),
      body: SizedBox(
        width: double.infinity,
        height: double.infinity,
        child: FocusScope(
          child: Column(
            children: [
              Expanded(
                child: CustomScrollView(
                  slivers: <Widget>[
                    SliverAppBar(
                      expandedHeight: 80,
                      floating: true,
                      snap: true,
                      leading: const SizedBox(),
                      leadingWidth: 0,
                      forceMaterialTransparency: false,
                      toolbarHeight: 80,
                      backgroundColor: Colors.transparent,
                      titleSpacing: 0,
                      title: Container(
                        color: MyColors.lightBlue,
                        child: Center(
                          child: Padding(
                            padding: const EdgeInsets.only(
                                left: 36, right: 73, top: 42, bottom: 30),
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
                                            color: MyColors.black
                                                .withOpacity(0.05),
                                            blurRadius: 10),
                                      ],
                                      color: MyColors.white,
                                    ),
                                    child: const Icon(
                                      Icons.arrow_back_ios_new,
                                      color: MyColors.blue,
                                      size: 18,
                                    ),
                                  ),
                                ),
                                const Expanded(
                                  child: Text(
                                    'comments',
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                        color: MyColors.black,
                                        fontSize: 20,
                                        fontWeight: FontWeight.w500),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                      stretch: true,
                    ),
                    SliverList(
                      delegate: SliverChildBuilderDelegate(
                        (context, index) => Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.only(
                                left: 36,
                                right: 36,
                                top: 8,
                              ),
                              child: SizedBox(
                                width: double.infinity,
                                child: ListView.builder(
                                  shrinkWrap: true,
                                  physics: const NeverScrollableScrollPhysics(),
                                  itemCount: comments.length,
                                  itemBuilder: ((context, index) {
                                    var comment=comments[index];
                                  return CommentComponent(image: comment['image'], name: comment['name'], rate: comment['rate'], comment: comment['comment'], time: comment['time'],);
                                })),
                               
                              ),
                            ),
                          ],
                        ),
                        childCount: 1,
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                height: (keyboardOpen) ? 345 - 285 : 60,
                width: double.infinity,
                decoration: BoxDecoration(
                  color: MyColors.lightBlue,
                  boxShadow: [
                    BoxShadow(
                        color: MyColors.black.withOpacity(0.5), blurRadius: 1),
                  ],
                ),
                child: Align(
                  alignment: Alignment.topCenter,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 36, vertical: 10),
                    child: Row(
                      children: [
                        Expanded(
                          child: Container(
                            height: 40,
                            decoration: BoxDecoration(
                              color: MyColors.white,
                              borderRadius: BorderRadiusDirectional.circular(5),
                              boxShadow: [
                                BoxShadow(
                                  color: MyColors.black.withOpacity(0.06),
                                  blurRadius: 20,
                                ),
                              ],
                            ),
                            child: Padding(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 8.0),
                              child: TextFormField(
                                controller: addComment,
                                focusNode: _focusNode,
                                style: TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.w400,
                                  color: MyColors.black.withOpacity(0.8),
                                ),
                                textAlignVertical: TextAlignVertical.bottom,
                                decoration: InputDecoration(
                                  hintText: 'Add your comment',
                                  hintStyle: TextStyle(
                                    fontSize: 11,
                                    fontWeight: FontWeight.w600,
                                    color: MyColors.black.withOpacity(0.54),
                                  ),
                                  border: const OutlineInputBorder(
                                      borderSide: BorderSide.none),
                                ),
                                cursorWidth: 1,
                                onFieldSubmitted: (value) {
                                  /// submit text form field
                                  addComment.clear();
                                },
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(
                          width: 9,
                        ),
                        InkWell(
                          onTap: () {
                            /// submit text form field
                            addComment.clear();
                            _focusNode.unfocus();
                          },
                          child: Container(
                            height: 40,
                            width: 60,
                            decoration: BoxDecoration(
                              color: MyColors.blue,
                              borderRadius: BorderRadiusDirectional.circular(5),
                              boxShadow: [
                                BoxShadow(
                                  color: MyColors.black.withOpacity(0.06),
                                  blurRadius: 20,
                                ),
                              ],
                            ),
                            child: const Center(
                              child: Text(
                                'send',
                                style: TextStyle(
                                    color: MyColors.white,
                                    fontSize: 11,
                                    fontWeight: FontWeight.w600),
                              ),
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
      ),
    );
  }
}
