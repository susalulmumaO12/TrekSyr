import 'package:flutter/material.dart';
import 'package:my_tourism_app/components/home_place_component.dart';
import 'package:my_tourism_app/screens/otherScreens/search_screen.dart';
import 'package:my_tourism_app/services/categories_service.dart';
import 'package:my_tourism_app/services/cities_service.dart';
import 'package:my_tourism_app/services/places_service.dart';
import 'package:my_tourism_app/shared/colors.dart';

class Home extends StatefulWidget {
  Home({Key? key, required this.token, required this.userId}) : super(key: key);
  final String token;
  final num userId;

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> with AutomaticKeepAliveClientMixin {
  
  List<City> _cities = [];
  List<Category> _categories = [];
  List<Place> _places = [];


  bool _isLoading = true;
  bool _isLoading1 = true;
  bool _isLoadingPlaces = true;
  late CityService _cityService;
  late CategoryService _categoryService;
  late PlaceService _placeService;

  int _selectedCityId = 0; // Default to "All"
  int _selectedCategoryId = 0; // Default to "Popular"

  @override
  void initState() {
    super.initState();
    _cityService = CityService(widget.token);
    _categoryService = CategoryService(widget.token);
    _placeService = PlaceService(widget.token);
    _fetchCities();
    _fetchCategories();
    _fetchPlaces(); // Load places initially
  }

  Future<void> _fetchCities() async {
    try {
      List<City> cities = await _cityService.fetchCities();
      setState(() {
        // Add "All" to the beginning of the list
        _cities = [
          City(cityId: 0, name: 'All'),
          ...cities,
        ];
        _isLoading = false;
        // Set default city to "All"
        _selectedCityId = 0;
      });
    } catch (e) {
      print(e);
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> _fetchCategories() async {
    try {
      List<Category> categories = await _categoryService.fetchCategories();
      setState(() {
        // Add "Popular" to the beginning of the list
        _categories = [
          Category(categoryId: 0, name: 'Popular'),
          ...categories,
        ];
        _isLoading1 = false;
        // Set default category to "Popular"
        _selectedCategoryId = 0;
      });
    } catch (e) {
      print(e);
      setState(() {
        _isLoading1 = false;
      });
    }
  }

  Future<void> _fetchPlaces() async {
    setState(() {
      _isLoadingPlaces = true;
    });
    try {
      num userId = widget.userId; // Replace with actual user ID
      int cityId = _selectedCityId;
      int catId = _selectedCategoryId;
      List<Place> places =
          await _placeService.fetchPlaces(userId, cityId, catId);
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

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Scaffold(
      backgroundColor: MyColors.lightBlue,
      body: SizedBox(
        width: double.infinity,
        height: double.infinity,
        child: CustomScrollView(
          slivers: <Widget>[
            SliverAppBar(
              expandedHeight: 130,
              pinned: true,
              floating: true,
              snap: true,
              bottom: AppBar(
                titleSpacing: 0,
                toolbarHeight: 80,
                backgroundColor: MyColors.lightBlue,
                elevation: 0,
                title: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 26.0),
                  child: Row(
                    children: [
                      Expanded(
                        child: Container(
                          height: 50,
                          decoration: BoxDecoration(
                            color: MyColors.white,
                            borderRadius: BorderRadius.circular(15),
                            boxShadow: [
                              BoxShadow(
                                  color: MyColors.black.withOpacity(0.06),
                                  blurRadius: 20),
                            ],
                          ),
                          child:  InkWell(
                            onTap: (){
                              Navigator.push(context, MaterialPageRoute(builder: (BuildContext context)=>SearchScreen(token: widget.token, userId: widget.userId,)));
                            },
                            child: Row(
                              children: [
                                Padding(
                                  padding: EdgeInsets.symmetric(horizontal: 16.0),
                                  child: Image(
                                      image: AssetImage(
                                          'assets/images/basics/icon_search.png')),
                                ),
                                Text(
                                  'find a place..',
                                  style: TextStyle(
                                    color: MyColors.grey,
                                    fontSize: 12,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(
                        width: 13,
                      ),
                      Container(
                        width: 46,
                        height: 46,
                        decoration: BoxDecoration(
                          color: MyColors.blue,
                          borderRadius: BorderRadius.circular(15),
                        ),
                        child: const Image(
                          image: AssetImage(
                              'assets/images/basics/icon_filter.png'),
                          height: 24,
                          width: 24,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              backgroundColor: Colors.transparent,
              flexibleSpace: FlexibleSpaceBar(
                background: Container(
                  color: MyColors.lightBlue,
                  child: const Center(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding:
                              EdgeInsets.only(left: 26, right: 26, top: 20),
                          child: SizedBox(
                            width: double.infinity,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'where do you want to go?',
                                  style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                      color: MyColors.black),
                                ),
                                SizedBox(
                                  height: 19,
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              stretch: true,
            ),
            SliverList(
                delegate: SliverChildBuilderDelegate(
                    (context, index) => Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding:
                                  const EdgeInsets.only(top: 16, bottom: 4),
                              child: _isLoading
                                  ? Center(child: CircularProgressIndicator())
                                  : SizedBox(
                                      height: 27,
                                      child: ListView.builder(
                                        scrollDirection: Axis.horizontal,
                                        itemCount: _cities.length,
                                        itemBuilder: (context, index) {
                                          return Padding(
                                            padding: const EdgeInsets.symmetric(
                                                horizontal: 7.5),
                                            child: InkWell(
                                              splashColor:
                                                  Colors.blue.withOpacity(0.25),
                                              child: Column(
                                                children: [
                                                  Text(
                                                    _cities[index].name,
                                                    style: TextStyle(
                                                      fontSize: 15,
                                                      fontWeight:
                                                          FontWeight.w400,
                                                      color: (_selectedCityId ==
                                                              _cities[index]
                                                                  .cityId)
                                                          ? MyColors.blue
                                                          : MyColors.black,
                                                    ),
                                                  ),
                                                  const SizedBox(
                                                    height: 3,
                                                  ),
                                                  Container(
                                                    height: 3,
                                                    width: _cities[index]
                                                            .name
                                                            .length *
                                                        7.0, // تعديل العرض بناءً على طول الاسم
                                                    decoration: BoxDecoration(
                                                      color: (_selectedCityId ==
                                                              _cities[index]
                                                                  .cityId)
                                                          ? MyColors.blue
                                                          : Colors.transparent,
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              15),
                                                    ),
                                                  ),
                                                ],
                                              ),
                                              onTap: () {
                                                setState(() {
                                                  _selectedCityId =
                                                      _cities[index].cityId;
                                                });
                                                _fetchPlaces();
                                              },
                                            ),
                                          );
                                        },
                                      ),
                                    ),
                            ),
                            Padding(
                              padding: EdgeInsets.symmetric(
                                  horizontal: 26.0, vertical: 19),
                              child: Text(
                                'Categories',
                                style: TextStyle(
                                  color: MyColors.black,
                                  fontSize: 18,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ),
                            SizedBox(
                              height: 70,
                              width: double.infinity,
                              child: _isLoading1
                                  ? Center(child: CircularProgressIndicator())
                                  : ListView.builder(
                                      scrollDirection: Axis.horizontal,
                                      itemCount: _categories.length,
                                      itemBuilder: (context, index) {
                                        final category = _categories[index];
                                        return Padding(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 8.0),
                                          child: SizedBox(
                                            width: 65,
                                            child: Stack(
                                              alignment: Alignment.bottomCenter,
                                              children: [
                                                Padding(
                                                  padding:
                                                      const EdgeInsets.only(
                                                          bottom: 12.5),
                                                  child: Container(
                                                    height: 54,
                                                    width: 54,
                                                    decoration: BoxDecoration(
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              40),
                                                      color: MyColors.lightBlue,
                                                      border: Border.all(
                                                        color: (_selectedCategoryId ==
                                                                category
                                                                    .categoryId)
                                                            ? MyColors.blue
                                                            : MyColors
                                                                .lightBlue,
                                                        width: 2.5,
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                Padding(
                                                  padding:
                                                      const EdgeInsets.only(
                                                          bottom: 17.0),
                                                  child: InkWell(
                                                    onTap: () {
                                                      setState(() {
                                                        _selectedCategoryId =
                                                            category.categoryId;
                                                      });
                                                      _fetchPlaces();
                                                    },
                                                    child: Image(
                                                      image: AssetImage(
                                                          'assets/images/basics/category${category.categoryId}.png'),
                                                      width: 45,
                                                      height: 45,
                                                      fit: BoxFit.fill,
                                                    ),
                                                  ),
                                                ),
                                                Text(
                                                  category.name,
                                                  style: TextStyle(
                                                    color:
                                                        (_selectedCategoryId ==
                                                                category
                                                                    .categoryId)
                                                            ? MyColors.blue
                                                            : MyColors.black,
                                                    fontSize: 10,
                                                    fontWeight: FontWeight.w500,
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                        );
                                      },
                                    ),
                            ),
                            const SizedBox(height: 37),
                            Padding(
                              padding:
                                  const EdgeInsets.only(left: 36, right: 36),
                              child: SizedBox(
                                width: double.infinity,
                                child: _isLoadingPlaces
                                    ? Center(child: CircularProgressIndicator())
                                    : ListView.builder(
                                        shrinkWrap: true,
                                        physics:
                                            const NeverScrollableScrollPhysics(),
                                        itemCount: _places.length,
                                        itemBuilder: (context, index) {
                                          final place = _places[index];
                                          return PlaceComponent(
                                            
                                            name: place.name,
                                            city: place.city,
                                            averageRating: place.averageRating,
                                            isFavorite: place.isFavorite,
                                            imageUrl: place.imageUrl, placeId: place.placeId, token: widget.token, userId: widget.userId,
                                          );
                                        },
                                      ),
                              ),
                            ),
                          ],
                        ),
                    childCount: 1)),
          ],
        ),
      ),
    );
  }

  @override
  bool get wantKeepAlive => true;
}

class City {
  final int cityId;
  final String name;

  City({required this.cityId, required this.name});

  factory City.fromJson(Map<String, dynamic> json) {
    return City(
      cityId: json['city_id'],
      name: json['name'],
    );
  }
}

class Category {
  final int categoryId;
  final String name;

  Category({required this.categoryId, required this.name});

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      categoryId: json['category_id'] ?? 0, // توفير قيمة افتراضية إذا كانت null
      name: json['name'] ?? '', // توفير قيمة افتراضية إذا كانت null
    );
  }
}
