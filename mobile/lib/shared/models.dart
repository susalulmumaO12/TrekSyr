import 'package:flutter/cupertino.dart';

class Place {

  final int rate;
  bool favorite;
  final String name;
  final String cityName;
  final String description;
  final List<ImageProvider> images;
  final List<Trip> trips;
  final List<Comment> comments;

  Place({
    required this.rate,
    required this.favorite,
    required this.name,
    required this.cityName,
    required this.description,
    required this.images,
    required this.trips,
    required this.comments,
  });
}

class Comment {

  final int rate;
  final ImageProvider image;
  final String name;
  final String comment;
  final String date;

  Comment({
    required this.rate,
    required this.image,
    required this.name,
    required this.comment,
    required this.date,
  });
}

class Trip {

  final int price;
  final int rate;
  final int tourists;
  final bool available;
  final ImageProvider image;
  final String name;
  final String date;
  final String duration;
  final String gatheringPlace;
  final List<PlanDot> plan;

  Trip({
    required this.price,
    required this.rate,
    required this.tourists,
    required this.available,
    required this.image,
    required this.name,
    required this.date,
    required this.duration,
    required this.gatheringPlace,
    required this.plan,
  });
}

class PlanDot {

  final ImageProvider image;
  final String name;
  final String date;

  PlanDot({
    required this.image,
    required this.name,
    required this.date,
  });
}