class TripDetailsModel {
  final String name;
  final double price;
  final String startingTime;
  final String endingTime;
  final String gatheringPlace;
  final int capacity;
  final String closingDate;
  final String? image;

  TripDetailsModel({
    required this.name,
    required this.price,
    required this.startingTime,
    required this.endingTime,
    required this.gatheringPlace,
    required this.capacity,
    required this.closingDate,
    this.image,
  });

  factory TripDetailsModel.fromJson(Map<String, dynamic> json) {
    return TripDetailsModel(
      name: json['name'],
      price: json['price'].toDouble(),
      startingTime: json['starting_time'],
      endingTime: json['ending_time'],
      gatheringPlace: json['gathering_place'],
      capacity: json['capacity'],
      closingDate: json['closing_date'],
      image: json['image'],
    );
  }
}
