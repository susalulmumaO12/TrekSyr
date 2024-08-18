import 'package:flutter/material.dart';
import 'package:my_tourism_app/components/guidsCoponent.dart';
import 'package:my_tourism_app/services/guids_service.dart';

class GuidsScreen extends StatefulWidget {
  const GuidsScreen({super.key, required this.token, required this.userId});
  final String token;
  final num userId;
  @override
  State<GuidsScreen> createState() => _GuidsScreenState();
}

class _GuidsScreenState extends State<GuidsScreen> {
  List<Map<String, dynamic>> guides = [];
  String _sortOption = "By Name"; // Default sort option

  @override
  void initState() {
    super.initState();
    fetchGuides(true); // Default to fetching guides sorted by name
  }

  void fetchGuides(bool sortByName) async {


    var data = await getGuids(widget.token, widget.userId, sortByName);

    setState(() {
      guides = data.map<Map<String, dynamic>>((guide) {
        // Convert average_rating to double if possible, otherwise set to 0.0
        var averageRating = guide['average_rating'];
        double? rating;
        if (averageRating is String) {
          averageRating =
              averageRating.trim(); // Remove any leading/trailing spaces
          rating = double.tryParse(averageRating) ?? 0.0;
        } else if (averageRating is double) {
          rating = averageRating;
        } else {
          rating = 0.0; // Default value if not a valid number
        }

        return {
          'first_name': guide['first_name'],
          'last_name': guide['last_name'],
          'average_rating': rating,
          'id': guide['id'],
          'image': guide['image'],
          'isFavorite': guide['isFavorite'] == 1 ? true : false,
        };
      }).toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xffEEF7F8),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 29),
        child: Column(
          children: [
            SizedBox(height: 15),
            Row(
              children: [
                Text(
                  'Sorted by',
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
                        fetchGuides(_sortOption == "By Name");
                      });
                    },
                    style: TextStyle(
                      color: Colors.black, // Text color
                    ),
                    items: <String>['By Name', 'By Rate']
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
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.only(top: 14),
                itemCount: guides.length,
                itemBuilder: (context, index) {
                  var guide = guides[index];
                  return GuidsComponent(
                    userId: widget.userId,
                    firstName: guide['first_name'],
                    lastName: guide['last_name'],
                    averageRating: guide['average_rating'],
                    isFavorite: guide['isFavorite'],
                    id: guide['id'],
                    token: widget.token,
                    imageUrl: guide['image'],
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
