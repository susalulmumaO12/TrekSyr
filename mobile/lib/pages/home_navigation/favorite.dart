import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_tourism_app/components/guidsCoponent.dart';
import 'package:my_tourism_app/components/home_place_component.dart';
import 'package:my_tourism_app/controllers/tap_controller.dart';
import 'package:my_tourism_app/services/fav_guides_service.dart';
import 'package:my_tourism_app/services/fav_places_service.dart';
import 'package:my_tourism_app/shared/colors.dart';

class Favorite extends StatefulWidget {
  const Favorite({Key? key, required this.token, required this.userId})
      : super(key: key);
  final String token;
  final num userId;

  @override
  State<Favorite> createState() => _FavoriteState();
}

class _FavoriteState extends State<Favorite>
    with AutomaticKeepAliveClientMixin {
  TapController controller = Get.find();

  String _sortOption = 'Places';
  late PlaceService _placeService;
  late GuideService _guideService;
  List<Place> _places = [];
  List<Guide> _guides = [];
  bool _isLoadingPlaces = true;
  bool _isLoadingGuides = true;

  @override
  void initState() {
    super.initState();
    _placeService = PlaceService(widget.token);
    _guideService = GuideService(widget.token);
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_sortOption == 'Places') {
      _fetchPlaces();
    } else {
      _fetchGuides();
    }
  }

  Future<void> _fetchPlaces() async {
    setState(() {
      _isLoadingPlaces = true;
    });
    try {
      num userId = widget.userId;
      List<Place> places = await _placeService.fetchFavPlaces(userId);
      setState(() {
        _places = places;
        _isLoadingPlaces = false;
      });
    } catch (e) {
      print(e);
      setState(() {
        _isLoadingPlaces = false;
      });
    }
  }

  Future<void> _fetchGuides() async {
    setState(() {
      _isLoadingGuides = true;
    });
    try {
      num userId = widget.userId;
      List<Guide> guides = await _guideService.fetchfavGuides(userId);
      setState(() {
        _guides = guides;
        _isLoadingGuides = false;
      });
    } catch (e) {
      print(e);
      setState(() {
        _isLoadingGuides = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Scaffold(
      backgroundColor: MyColors.lightBlue,
      body: Padding(
        padding: const EdgeInsets.only(left: 23, right: 23, top: 5),
        child: Column(
          children: [
            Row(
              children: [
                Text(
                  'View by',
                  style: TextStyle(
                    fontSize: 15,
                    fontFamily: 'Inter',
                    fontWeight: FontWeight.w900,
                    color: Colors.black,
                  ),
                ),
                SizedBox(width: 10),
                DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: _sortOption,
                    icon: Icon(Icons.arrow_drop_down, color: Colors.black),
                    onChanged: (String? newValue) {
                      setState(() {
                        _sortOption = newValue!;
                        if (_sortOption == 'Places') {
                          _fetchPlaces();
                        } else {
                          _fetchGuides(); 
                        }
                      });
                    },
                    style: TextStyle(
                      color: Colors.black,
                    ),
                    items: <String>['Places', 'Guides']
                        .map<DropdownMenuItem<String>>((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(value),
                      );
                    }).toList(),
                  ),
                ),
              ],
            ),
            SizedBox(height: 20),
            Expanded(
              child: SizedBox(
                width: double.infinity,
                child: _sortOption == 'Places'
                    ? (_isLoadingPlaces
                        ? Center(child: CircularProgressIndicator())
                        : _places.isEmpty
                            ? Center(child: Text('No data to display'))
                            : ListView.builder(
                                itemCount: _places.length,
                                itemBuilder: (context, index) {
                                  final place = _places[index];
                                  return PlaceComponent(
                                    name: place.name,
                                    city: place.city,
                                    averageRating: place.averageRating,
                                    isFavorite: place.isFavorite,
                                    imageUrl: place.imageUrl,
                                    placeId: place.placeId,
                                    token: widget.token,
                                    userId: widget.userId,
                                  );
                                },
                              ))
                    : (_isLoadingGuides
                        ? Center(child: CircularProgressIndicator())
                        : _guides.isEmpty
                            ? Center(child: Text('No data to display'))
                            : ListView.builder(
                                itemCount: _guides.length,
                                itemBuilder: (context, index) {
                                  final guide = _guides[index];
                                  return GuidsComponent(firstName: guide.fname, lastName: guide.lcity, id: guide.guideId, token: widget.token, userId: widget.userId, averageRating: guide.averageRating, isFavorite: guide.isFavorite,
                                   
                                  );
                                },
                              )),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  bool get wantKeepAlive => true;
}
