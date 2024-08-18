import 'package:flutter/material.dart';

class AverageRating extends StatelessWidget {
  const AverageRating({super.key, required this.averageRating, required this.size});
  final double averageRating;
 final double size;
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(
          Icons.star,

          size: size,

          

          color: (averageRating > 0)
              ? const Color.fromRGBO(228, 178, 0, 1)
              : const Color.fromRGBO(217, 217, 217, 1),
        ),
        Icon(
          Icons.star,

          size: size,

          color: (averageRating > 1)
              ? const Color.fromRGBO(228, 178, 0, 1)
              : const Color.fromRGBO(217, 217, 217, 1),
        ),
        Icon(
          Icons.star,

          size: size,


          color: (averageRating > 2)
              ? const Color.fromRGBO(228, 178, 0, 1)
              : const Color.fromRGBO(217, 217, 217, 1),
        ),
        Icon(
          Icons.star,

          size: size,

          color: (averageRating > 3)
              ? const Color.fromRGBO(228, 178, 0, 1)
              : const Color.fromRGBO(217, 217, 217, 1),
        ),
        Icon(
          Icons.star,

          size: size,

          color: (averageRating > 4)
              ? const Color.fromRGBO(228, 178, 0, 1)
              : const Color.fromRGBO(217, 217, 217, 1),
        ),
      ],
    );
  }
}
