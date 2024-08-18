class TripPathModel {
  final String type;
  final String time;
  final String place;

  TripPathModel({
    required this.type,
    required this.time,
    required this.place,
  });

  factory TripPathModel.fromJson(Map<String, dynamic> json) {
    return TripPathModel(
      type: json['type'],
      time: json['time'],
      place: json['place'],
    );
  }
}
