import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:iconify_flutter/iconify_flutter.dart';
import 'package:iconify_flutter/icons/ant_design.dart';
import 'package:my_tourism_app/main.dart';
import '../../shared/colors.dart';

class RateScreen extends StatefulWidget {
  final num userId;
  final num placeId;
  final String token;

  const RateScreen({
    Key? key,
    required this.userId,
    required this.placeId,
    required this.token,
  }) : super(key: key);

  @override
  State<RateScreen> createState() => _RateScreenState();
}

class _RateScreenState extends State<RateScreen> {
  String destination = 'Bel Temple';
  String tourGuide = ' AlMosafiroon AlArab';
  int rate = 0; // عدد النجوم الافتراضي
  String? comment; // التعليق (يمكن أن يكون فارغًا)

  Future<void> ratePlace(String token, num placeId, num rating, num userId, String? comment) async {
    final dio = Dio();
    String forToken = 'Bearer $token';

    dio.options.headers = {
      'Authorization': forToken,
    };
    String url1 = '$url/api/user/ratePlace'; // ضع رابط الـ API الصحيح هنا

    final data = {
      "user_id": userId,
      "place_id": placeId,
      "rate": rating + 1, // +1 لأن النجوم تبدأ من 0
      if (comment != null && comment.isNotEmpty) "comment": comment, // إضافة التعليق إذا لم يكن فارغًا
    };

    try {
      final response = await dio.post(url1, data: data);

      if (response.statusCode == 201) {
        // تم التقييم بنجاح
        ScaffoldMessenger.of(context).showSnackBar(

          const SnackBar(content: Text('Place rated successfully!',
          
          ),
          backgroundColor: Colors.green,
          ),
        );
        Navigator.pop(context); // إغلاق الـ Dialog بعد النجاح
      } else {
        print('${response.statusCode}');
        // في حال الفشل
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to rate place: ${response.statusCode}'),
          backgroundColor: Colors.red,
          ),
        );
      }
    } catch (e) {
      print('$e');
      // في حال حدوث خطأ
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.transparent,
      clipBehavior: Clip.antiAlias,
      child: IntrinsicHeight(
        // لجعل الحاوية تتكيف مع محتواها
        child: Container(
          width: double.infinity,
          decoration: BoxDecoration(
            color: MyColors.white,
            borderRadius: BorderRadius.circular(30),
          ),
          child: Padding(
            padding: const EdgeInsets.all(27),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(height: 4),
                const Text(
                  'Rate Place',
                  style: TextStyle(fontSize: 15),
                ),
              
                const SizedBox(height: 14),
                SizedBox(
                  height: 49,
                  width: 250,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: 5,
                    itemBuilder: (context, index) => SizedBox(
                      height: 49,
                      width: 50,
                      child: Center(
                        child: InkWell(
                          onTap: () {
                            setState(() {
                              rate = index;
                            });
                          },
                          child: Iconify(
                            AntDesign.star_fill,
                            color: (rate >= index)
                                ? const Color.fromRGBO(228, 178, 0, 1)
                                : MyColors.grey,
                            size: 49,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 14),
                TextField(
                  onChanged: (value) {
                    setState(() {
                      comment = value;
                    });
                  },
                  decoration: const InputDecoration(
                    hintText: 'Leave a comment (optional)',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 14),
                ElevatedButton(
                  onPressed: () {
                    // استدعاء ratePlace مع تمرير القيم
                    ratePlace(widget.token, widget.placeId, rate, widget.userId, comment);
                  },
                  child: const Text('Submit Rating',),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color.fromRGBO(228, 178, 0, 1),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
