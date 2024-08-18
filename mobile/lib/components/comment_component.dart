import 'package:flutter/material.dart';
import 'package:my_tourism_app/shared/colors.dart';

class CommentComponent extends StatelessWidget {
  final String? image;
  final String name;
  final int rate;
  final String comment;
  final String time;

  const CommentComponent({
    Key? key,
    required this.image,
    required this.name,
    required this.rate,
    required this.comment,
    required this.time,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 18.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(
                foregroundImage: image != null && image!.isNotEmpty ? NetworkImage(image!) : AssetImage('assets/𝑩𝒂𝒋𝒊✩.jpg') as ImageProvider,
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
                            children: List.generate(5, (index) {
                              return Icon(
                                Icons.star,
                                size: 8,
                                color: (rate > index)
                                    ? const Color.fromRGBO(228, 178, 0, 1)
                                    : const Color.fromRGBO(217, 217, 217, 1),
                              );
                            }),
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
                time,
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
          ),
        ],
      ),
    );
  }
}
