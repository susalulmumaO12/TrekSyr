import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:my_tourism_app/components/guid_trips_component.dart';
import 'package:my_tourism_app/components/guidsCoponent.dart';
import 'package:my_tourism_app/components/home_place_component.dart';
import 'package:my_tourism_app/components/place_trips_component.dart';
import 'package:my_tourism_app/main.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key, required this.token, required this.userId});
  final String token;
  final num userId;

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  String _placeSearch = '';
  String _guideSearch = '';
  String _tripSearch = '';
  List<dynamic> _placesResults = [];
  List<dynamic> _guidesResults = [];
  List<dynamic> _tripsResults=[];
  bool _isLoading = false;
  bool _isLoadingGuides = false;
  bool _isLoadingTrips = false;
  final Dio _dio = Dio();

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Widget _buildSearchField(String hintText, ValueChanged<String> onChanged) {
    return Container(
      margin: const EdgeInsets.all(16.0),
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20.0),
        boxShadow: null,
      ),
      child: Row(
        children: [
          Icon(Icons.search,
              color: Color.fromARGB(255, 71, 174, 181), size: 20),
          SizedBox(width: 10),
          Expanded(
            child: TextField(
              cursorColor: Color.fromARGB(255, 71, 174, 181),
              onChanged: onChanged,
              decoration: InputDecoration(
                border: InputBorder.none,
                hintText: hintText,
                hintStyle: TextStyle(color: Colors.grey[400]),
              ),
            ),
          ),
        ],
      ),
    );
  }

  ///places
  Future<void> _searchPlaces(String query) async {
    setState(() {
      _isLoading = true;
    });

    try {
      Response response = await _dio.get(
        '$url/api/user/searchPlaces/$lang/${widget.userId}/?query=$query',
        options: Options(
          headers: {
            'Authorization': 'Bearer ${widget.token}',
          },
        ),
      );

      if (response.statusCode == 200) {
        setState(() {
          _placesResults = response.data;
        });
      } else {
        setState(() {
          _placesResults = [];
        });
      }
    } catch (e) {
      print('Error: $e');
      setState(() {
        _placesResults = [];
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Widget _buildPlacesList() {
    if (_isLoading) {
      return Center(child: CircularProgressIndicator());
    }

    if (_placesResults.isEmpty) {
      return Center(child: Text('No results found.'));
    }

    return ListView.builder(
      itemCount: _placesResults.length,
      itemBuilder: (context, index) {
        final place = _placesResults[index];
        return PlaceComponent(
          name: place['name'] ?? 'Unknown Place',
          city: place['city'] ?? 'Unknown City',
          averageRating: place['average_rating'] != null &&
                  place['average_rating'] is String
              ? double.tryParse(place['average_rating']) ?? 0.0
              : 0.0,
          isFavorite: place['isFavorite'] == 1,
          imageUrl: place['image'] ?? '', // assume base64
          placeId: place['place_id'] ?? 0,
          token: widget.token,
          userId: widget.userId,
        );
      },
    );
  }

  ///guides
  Future<void> _searchGuides(String query) async {
    setState(() {
      _isLoadingGuides = true;
    });

    try {
      Response response = await _dio.get(
        '$url/api/user/searchGuides/$lang/${widget.userId}/?query=$query',
        options: Options(
          headers: {
            'Authorization': 'Bearer ${widget.token}',
          },
        ),
      );

      if (response.statusCode == 200) {
        setState(() {
          _guidesResults = response.data;
        });
      } else {
        setState(() {
          _guidesResults = [];
        });
      }
    } catch (e) {
      print('Error: $e');
      setState(() {
        _guidesResults = [];
      });
    } finally {
      setState(() {
        _isLoadingGuides = false;
      });
    }
  }

  Widget _buildGuidesList() {
    if (_isLoadingGuides) {
      return Center(child: CircularProgressIndicator());
    }

    if (_placesResults.isEmpty) {
      return Center(child: Text('No results found.'));
    }

    return ListView.builder(
      itemCount: _guidesResults.length,
      itemBuilder: (context, index) {
        final guide = _guidesResults[index];
        return GuidsComponent(
          averageRating: guide['average_rating'] != null &&
                  guide['average_rating'] is String
              ? double.tryParse(guide['average_rating']) ?? 0.0
              : 0.0,
          isFavorite: guide['isFavorite'] == 1,
          imageUrl: guide['image'] ?? '', // assume base64

          token: widget.token,
          userId: widget.userId, firstName: guide['first_name'] ?? '',
          lastName: guide['last_name'] ?? '', id: guide['id'] ?? 0,
        );
      },
    );
  }

  ///trips
  Future<void> _searchTrips(String query) async {
    setState(() {
      _isLoadingTrips = true;
    });

    try {
      Response response = await _dio.get(
        '$url/api/user/searchTrips/$lang/${widget.userId}/?query=$query',
        options: Options(
          headers: {
            'Authorization': 'Bearer ${widget.token}',
          },
        ),
      );

      if (response.statusCode == 200) {
        setState(() {
          _tripsResults = response.data;
        });
      } else {
        setState(() {
          _tripsResults = [];
        });
      }
    } catch (e) {
      print('Error: $e');
      setState(() {
       _tripsResults = [];
      });
    } finally {
      setState(() {
        _isLoadingTrips= false;
      });
    }
  }

  Widget _buildTripsList() {
    if (_isLoadingTrips) {
      return Center(child: CircularProgressIndicator());
    }

    if (_placesResults.isEmpty) {
      return Center(child: Text('No results found.'));
    }

    return ListView.builder(
      itemCount: _tripsResults.length,
      itemBuilder: (context, index) {
        final trip = _tripsResults[index];
        return PlaceTripComponent(tripId: trip['trip_id']?? 0, name: trip['name']?? '', startingTime: trip['starting_time']?? '', price: trip['price']?? 0, duration: trip['duration'], available: 1, image: trip['image'] ?? '', token: widget.token, guideId: trip['guide_id'], userId: widget.userId,);
        // return GuidsComponent(
        
        //   isFavorite: trip['isFavorite'] == 1,
        //   imageUrl: trip['image'] ?? '', // assume base64
          
        //   token: widget.token,
        //   userId: widget.userId, firstName: trip['first_name'] ?? '',
        //   lastName: trip['last_name'] ?? '', id: trip['id'] ?? 0,
        // );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        title:
            const Text('Search Screen', style: TextStyle(color: Colors.black)),
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () => Navigator.pop(context),
        ),
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(text: 'Places'),
            Tab(text: 'Guides'),
            Tab(text: 'Trips'),
          ],
          indicatorColor: Color.fromARGB(255, 71, 174, 181),
          labelColor: Color.fromARGB(255, 71, 174, 181),
          unselectedLabelColor: Colors.black,
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          Container(
            color: Color.fromARGB(255, 238, 247, 248),
            child: Column(
              children: [
                _buildSearchField(
                  'Search for places...',
                  (text) {
                    setState(() {
                      _placeSearch = text;
                    });
                    _searchPlaces(text); // استدعاء دالة البحث عند تغيير النص
                  },
                ),
                Expanded(child: _buildPlacesList()),
              ],
            ),
          ),
          Container(
            color: Color.fromARGB(255, 238, 247, 248),
            child: Column(
              children: [
                _buildSearchField(
                  'Search for guides...',
                  (text) {
                    setState(() {
                      _guideSearch = text;
                    });
                    print('Guides search: $_guideSearch');
                    _searchGuides(text);
                  },
                ),
                Expanded(child: _buildGuidesList()),
              ],
            ),
          ),
          Container(
            color: Color.fromARGB(255, 238, 247, 248),
            child: Column(
              children: [
                _buildSearchField(
                  'Search for trips...',
                  (text) {
                    setState(() {
                      _tripSearch = text;
                    });
                    print('Trips search: $_tripSearch');
                   _searchTrips(text);
                  },
                ),
                 Expanded(child: _buildTripsList()),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
