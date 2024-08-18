import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';
import '../shared/models.dart';

class TapController extends GetxController {

  final int _notification = 4;

  int get notification => _notification;

  int _x = 0;

  int get x => _x;

  void setX(int x) {
    update();
    _x = x;
  }

  int _city = 0;

  int get city => _city;

  void setCity(int x) {
    update();
    _city = x;
  }

  int _category = 0;

  int get category => _category;

  void setCategory(int x) {
    update();
    _category = x;
  }

  final List<Place> _places = [
    Place(
      rate: 0,
      favorite: false,
      name: 'Temple of Bel',
      cityName: 'Palmyra',
      description:
          'Situated to the east of the city on the edge of the oasis, on a small manmade hill, probably the site of the early settlement, the sanctuary of Bel in its present state occupies a surface area.',
      images: [
        const AssetImage('assets/images/temp/temple2.png'),
        const AssetImage('assets/images/temp/temple1.png'),
        const AssetImage('assets/images/temp/temple3.png'),
        const AssetImage('assets/images/temp/temple4.png'),
        const AssetImage('assets/images/temp/temple5.png'),
        const AssetImage('assets/images/temp/temple6.png'),
      ],
      trips: [
        Trip(
          price: 90000,
          rate: 3,
          tourists: 25,
          available: true,
          image: const AssetImage('assets/images/temp/logo1.png'),
          name: 'AlMosafiron AlArab',
          date: '19/6/2024',
          duration: '24 hours',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 150000,
          rate: 5,
          tourists: 50,
          available: true,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'Jazaerly Travelling',
          date: '22/6/2024',
          duration: '2 days',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 90000,
          rate: 3,
          tourists: 25,
          available: true,
          image: const AssetImage('assets/images/temp/logo1.png'),
          name: 'AlMosafiron AlArab',
          date: '19/6/2024',
          duration: '24 hours',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 150000,
          rate: 5,
          tourists: 50,
          available: true,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'Jazaerly Travelling',
          date: '22/6/2024',
          duration: '2 days',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
      ],
      comments: [
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment:
              'Visiting the Bel Temple was an awe-inspiring experience. The sheer grandeur of the ancient architecture left me speechless. Its truly a testament to the incredible craftsmanship of the past.',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
      ],
    ),
    Place(
      rate: 3,
      favorite: false,
      name: 'Blue Beach',
      cityName: 'Latakia',
      description:
          'Situated to the east of the city on the edge of the oasis, on a small manmade hill, probably the site of the early settlement, the sanctuary of Bel in its present state occupies a surface area.',
      images: [
        const AssetImage('assets/images/temp/beach1.png'),
      ],
      trips: [
        Trip(
          price: 90000,
          rate: 3,
          tourists: 25,
          available: true,
          image: const AssetImage('assets/images/temp/logo1.png'),
          name: 'AlMosafiron AlArab',
          date: '19/6/2024',
          duration: '24 hours',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 150000,
          rate: 5,
          tourists: 50,
          available: true,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'Jazaerly Travelling',
          date: '22/6/2024',
          duration: '2 days',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 90000,
          rate: 3,
          tourists: 25,
          available: true,
          image: const AssetImage('assets/images/temp/logo1.png'),
          name: 'AlMosafiron AlArab',
          date: '19/6/2024',
          duration: '24 hours',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 150000,
          rate: 5,
          tourists: 50,
          available: true,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'Jazaerly Travelling',
          date: '22/6/2024',
          duration: '2 days',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
      ],
      comments: [
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
      ],
    ),
    Place(
      rate: 4,
      favorite: false,
      name: 'Temple of Bel',
      cityName: 'Palmyra',
      description:
          'Situated to the east of the city on the edge of the oasis, on a small manmade hill, probably the site of the early settlement, the sanctuary of Bel in its present state occupies a surface area.',
      images: [
        const AssetImage('assets/images/temp/temple1.png'),
        const AssetImage('assets/images/temp/temple2.png'),
        const AssetImage('assets/images/temp/temple3.png'),
        const AssetImage('assets/images/temp/temple4.png'),
        const AssetImage('assets/images/temp/temple5.png'),
        const AssetImage('assets/images/temp/temple6.png'),
      ],
      trips: [
        Trip(
          price: 90000,
          rate: 3,
          tourists: 25,
          available: true,
          image: const AssetImage('assets/images/temp/logo1.png'),
          name: 'AlMosafiron AlArab',
          date: '19/6/2024',
          duration: '24 hours',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 150000,
          rate: 5,
          tourists: 50,
          available: true,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'Jazaerly Travelling',
          date: '22/6/2024',
          duration: '2 days',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 90000,
          rate: 3,
          tourists: 25,
          available: true,
          image: const AssetImage('assets/images/temp/logo1.png'),
          name: 'AlMosafiron AlArab',
          date: '19/6/2024',
          duration: '24 hours',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 150000,
          rate: 5,
          tourists: 50,
          available: true,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'Jazaerly Travelling',
          date: '22/6/2024',
          duration: '2 days',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
      ],
      comments: [
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
      ],
    ),
    Place(
      rate: 0,
      favorite: false,
      name: 'Temple of Bel',
      cityName: 'Palmyra',
      description:
          'Situated to the east of the city on the edge of the oasis, on a small manmade hill, probably the site of the early settlement, the sanctuary of Bel in its present state occupies a surface area.',
      images: [
        const AssetImage('assets/images/temp/temple2.png'),
        const AssetImage('assets/images/temp/temple1.png'),
        const AssetImage('assets/images/temp/temple3.png'),
        const AssetImage('assets/images/temp/temple4.png'),
        const AssetImage('assets/images/temp/temple5.png'),
        const AssetImage('assets/images/temp/temple6.png'),
      ],
      trips: [
        Trip(
          price: 90000,
          rate: 3,
          tourists: 25,
          available: true,
          image: const AssetImage('assets/images/temp/logo1.png'),
          name: 'AlMosafiron AlArab',
          date: '19/6/2024',
          duration: '24 hours',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 150000,
          rate: 5,
          tourists: 50,
          available: true,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'Jazaerly Travelling',
          date: '22/6/2024',
          duration: '2 days',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 90000,
          rate: 3,
          tourists: 25,
          available: true,
          image: const AssetImage('assets/images/temp/logo1.png'),
          name: 'AlMosafiron AlArab',
          date: '19/6/2024',
          duration: '24 hours',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 150000,
          rate: 5,
          tourists: 50,
          available: true,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'Jazaerly Travelling',
          date: '22/6/2024',
          duration: '2 days',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
      ],
      comments: [
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment:
              'Visiting the Bel Temple was an awe-inspiring experience. The sheer grandeur of the ancient architecture left me speechless. Its truly a testament to the incredible craftsmanship of the past.',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
      ],
    ),
    Place(
      rate: 3,
      favorite: false,
      name: 'Blue Beach',
      cityName: 'Latakia',
      description:
          'Situated to the east of the city on the edge of the oasis, on a small manmade hill, probably the site of the early settlement, the sanctuary of Bel in its present state occupies a surface area.',
      images: [
        const AssetImage('assets/images/temp/beach1.png'),
      ],
      trips: [
        Trip(
          price: 90000,
          rate: 3,
          tourists: 25,
          available: true,
          image: const AssetImage('assets/images/temp/logo1.png'),
          name: 'AlMosafiron AlArab',
          date: '19/6/2024',
          duration: '24 hours',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 150000,
          rate: 5,
          tourists: 50,
          available: true,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'Jazaerly Travelling',
          date: '22/6/2024',
          duration: '2 days',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 90000,
          rate: 3,
          tourists: 25,
          available: true,
          image: const AssetImage('assets/images/temp/logo1.png'),
          name: 'AlMosafiron AlArab',
          date: '19/6/2024',
          duration: '24 hours',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 150000,
          rate: 5,
          tourists: 50,
          available: true,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'Jazaerly Travelling',
          date: '22/6/2024',
          duration: '2 days',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
      ],
      comments: [
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
      ],
    ),
    Place(
      rate: 4,
      favorite: false,
      name: 'Temple of Bel',
      cityName: 'Palmyra',
      description:
          'Situated to the east of the city on the edge of the oasis, on a small manmade hill, probably the site of the early settlement, the sanctuary of Bel in its present state occupies a surface area.',
      images: [
        const AssetImage('assets/images/temp/temple1.png'),
        const AssetImage('assets/images/temp/temple2.png'),
        const AssetImage('assets/images/temp/temple3.png'),
        const AssetImage('assets/images/temp/temple4.png'),
        const AssetImage('assets/images/temp/temple5.png'),
        const AssetImage('assets/images/temp/temple6.png'),
      ],
      trips: [
        Trip(
          price: 90000,
          rate: 3,
          tourists: 25,
          available: true,
          image: const AssetImage('assets/images/temp/logo1.png'),
          name: 'AlMosafiron AlArab',
          date: '19/6/2024',
          duration: '24 hours',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 150000,
          rate: 5,
          tourists: 50,
          available: true,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'Jazaerly Travelling',
          date: '22/6/2024',
          duration: '2 days',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 90000,
          rate: 3,
          tourists: 25,
          available: true,
          image: const AssetImage('assets/images/temp/logo1.png'),
          name: 'AlMosafiron AlArab',
          date: '19/6/2024',
          duration: '24 hours',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 150000,
          rate: 5,
          tourists: 50,
          available: true,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'Jazaerly Travelling',
          date: '22/6/2024',
          duration: '2 days',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
      ],
      comments: [
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
      ],
    ),
  ];

  List<Place> get places => _places;

  final List<Place> _favoritePlaces = [
    Place(
      rate: 0,
      favorite: false,
      name: 'Temple of Bel',
      cityName: 'Palmyra',
      description:
      'Situated to the east of the city on the edge of the oasis, on a small manmade hill, probably the site of the early settlement, the sanctuary of Bel in its present state occupies a surface area.',
      images: [
        const AssetImage('assets/images/temp/temple2.png'),
        const AssetImage('assets/images/temp/temple1.png'),
        const AssetImage('assets/images/temp/temple3.png'),
        const AssetImage('assets/images/temp/temple4.png'),
        const AssetImage('assets/images/temp/temple5.png'),
        const AssetImage('assets/images/temp/temple6.png'),
      ],
      trips: [
        Trip(
          price: 90000,
          rate: 3,
          tourists: 25,
          available: true,
          image: const AssetImage('assets/images/temp/logo1.png'),
          name: 'AlMosafiron AlArab',
          date: '19/6/2024',
          duration: '24 hours',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 150000,
          rate: 5,
          tourists: 50,
          available: true,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'Jazaerly Travelling',
          date: '22/6/2024',
          duration: '2 days',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 90000,
          rate: 3,
          tourists: 25,
          available: true,
          image: const AssetImage('assets/images/temp/logo1.png'),
          name: 'AlMosafiron AlArab',
          date: '19/6/2024',
          duration: '24 hours',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 150000,
          rate: 5,
          tourists: 50,
          available: true,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'Jazaerly Travelling',
          date: '22/6/2024',
          duration: '2 days',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
      ],
      comments: [
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment:
          'Visiting the Bel Temple was an awe-inspiring experience. The sheer grandeur of the ancient architecture left me speechless. Its truly a testament to the incredible craftsmanship of the past.',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
      ],
    ),
    Place(
      rate: 3,
      favorite: false,
      name: 'Blue Beach',
      cityName: 'Latakia',
      description:
      'Situated to the east of the city on the edge of the oasis, on a small manmade hill, probably the site of the early settlement, the sanctuary of Bel in its present state occupies a surface area.',
      images: [
        const AssetImage('assets/images/temp/beach1.png'),
      ],
      trips: [
        Trip(
          price: 90000,
          rate: 3,
          tourists: 25,
          available: true,
          image: const AssetImage('assets/images/temp/logo1.png'),
          name: 'AlMosafiron AlArab',
          date: '19/6/2024',
          duration: '24 hours',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 150000,
          rate: 5,
          tourists: 50,
          available: true,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'Jazaerly Travelling',
          date: '22/6/2024',
          duration: '2 days',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 90000,
          rate: 3,
          tourists: 25,
          available: true,
          image: const AssetImage('assets/images/temp/logo1.png'),
          name: 'AlMosafiron AlArab',
          date: '19/6/2024',
          duration: '24 hours',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
        Trip(
          price: 150000,
          rate: 5,
          tourists: 50,
          available: true,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'Jazaerly Travelling',
          date: '22/6/2024',
          duration: '2 days',
          gatheringPlace: 'Syria, Damascus, Baramkeh',
          plan: [],
        ),
      ],
      comments: [
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
        Comment(
          rate: 5,
          image: const AssetImage('assets/images/temp/ali.jpg'),
          name: 'name',
          comment: 'comment',
          date: 'date',
        ),
      ],
    ),
  ];

  List<Place> get favoritePlaces => _favoritePlaces;

  void insertToFavorite(int x){
    update();
    _favoritePlaces.add(_places[x]);
  }

  void deleteFromFavorite(int x){
    update();
    _favoritePlaces.removeWhere((item) => item == _favoritePlaces[x]);
  }

  void changeFavorite(int x) {
    update();
    _places[x].favorite = !_places[x].favorite;
  }
}
