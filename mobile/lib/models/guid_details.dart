// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

class GuidDeatils {
  num id;
  String first_name;
  String last_name;
  String phone_number;
  String? image;
  double? average_rating;
  bool isFavorite;
  GuidDeatils({
    required this.id,
    required this.first_name,
    required this.last_name,
    required this.phone_number,
    this.image,
    this.average_rating,
    required this.isFavorite,
  });

  GuidDeatils copyWith({
    num? id,
    String? first_name,
    String? last_name,
    String? phone_number,
    String? image,
    double? average_rating,
    bool? isFavorite,
  }) {
    return GuidDeatils(
      id: id ?? this.id,
      first_name: first_name ?? this.first_name,
      last_name: last_name ?? this.last_name,
      phone_number: phone_number ?? this.phone_number,
      image: image ?? this.image,
      average_rating: average_rating ?? this.average_rating,
      isFavorite: isFavorite ?? this.isFavorite,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'first_name': first_name,
      'last_name': last_name,
      'phone_number': phone_number,
      'image': image,
      'average_rating': average_rating,
      'isFavorite': isFavorite,
    };
  }

  factory GuidDeatils.fromMap(Map<String, dynamic> map) {
    return GuidDeatils(
      id: map['id'] as num,
      first_name: map['first_name'] as String,
      last_name: map['last_name'] as String,
      phone_number: map['phone_number'] as String,
      image: map['image'] != null ? map['image'] as String : null,
      average_rating: map['average_rating'] != null
          ? map['average_rating'] as double
          : null,
      isFavorite: map['isFavorite'],
    );
  }

  String toJson() => json.encode(toMap());

  factory GuidDeatils.fromJson(String source) =>
      GuidDeatils.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'GuidDeatils(id: $id, first_name: $first_name, last_name: $last_name, phone_number: $phone_number, image: $image, average_rating: $average_rating)';
  }

  @override
  bool operator ==(covariant GuidDeatils other) {
    if (identical(this, other)) return true;

    return other.id == id &&
        other.first_name == first_name &&
        other.last_name == last_name &&
        other.phone_number == phone_number &&
        other.image == image &&
        other.average_rating == average_rating &&
        other.isFavorite == isFavorite;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        first_name.hashCode ^
        last_name.hashCode ^
        phone_number.hashCode ^
        image.hashCode ^
        average_rating.hashCode ^
        isFavorite.hashCode;
  }
}
