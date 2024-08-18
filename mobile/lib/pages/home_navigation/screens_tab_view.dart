import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:iconify_flutter/icons/octicon.dart';
import 'package:iconify_flutter/icons/wpf.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:iconify_flutter/iconify_flutter.dart';
import 'package:my_tourism_app/controllers/tap_controller.dart';
import 'package:my_tourism_app/main.dart';
import 'package:my_tourism_app/pages/home_navigation/mybooked.dart';
import 'package:my_tourism_app/pages/home_navigation/favorite.dart';
import 'package:my_tourism_app/pages/home_navigation/home.dart';
import 'package:my_tourism_app/provider/language.dart';
import 'package:my_tourism_app/screens/onBoardings/getStarted.dart';
import 'package:my_tourism_app/screens/otherScreens/GuidsScreen.dart';
import 'package:my_tourism_app/screens/otherScreens/profile.dart';
import 'package:my_tourism_app/screens/otherScreens/tripdetails2.dart';
import 'package:my_tourism_app/shared/colors.dart';
import 'package:shared_preferences/shared_preferences.dart';


class ScreensTabView extends StatefulWidget {
  const ScreensTabView({
    Key? key,
    required this.token,
    required this.id,
  }) : super(key: key);
  final String token;
  final num id;
  @override
  State<ScreensTabView> createState() => _ScreensTabViewState();
}

class _ScreensTabViewState extends State<ScreensTabView>
    with TickerProviderStateMixin {
      Language _language = Language();
  List<String> _languages  = ['AR' , 'EN' ];
  String? _Selectedlanguage;

  late TabController tabController;
  TapController controller = Get.put(TapController());
 // final GlobalKey<ScaffoldState> _key = GlobalKey();
final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  bool isEnglish = true;
  @override
  void initState() {
    super.initState();
    tabController = TabController(
      length: 4,
      vsync: this,
      animationDuration: Duration(milliseconds: 500),
    );
    tabController.addListener(() {
      setState(() {});
    });
  }
Future<void> _logout(BuildContext context) async {
    final Dio dio = Dio();
     String baseUrl = '$url/api/users/logoutUser'; // ضع رابط الـ API هنا

    try {
      final response = await dio.get(
        baseUrl,
        options: Options(
          headers: {
            'Authorization': 'Bearer ${widget.token}',
          },
        ),
      );

      if (response.statusCode == 200) {
        // نجاح عملية تسجيل الخروج
        final message = response.data['message'];
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(message),
            backgroundColor: Colors.green, // أو أي لون ترغب فيه
          ),
        );
        // الانتقال إلى صفحة GetStarted بعد مدة قصيرة
        Future.delayed(Duration(seconds: 1), () {
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (context) => GetStarted()),
          );
        });
      } else {
        // فشل عملية تسجيل الخروج
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to log out. Please try again.'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } catch (e) {
      // معالجة الأخطاء
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('An error occurred: ${e.toString()}'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }
  @override
  void dispose() {
    tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if(
  _language.getLanguage()=="AR"
){
   lang='ar';
}
 if(
  _language.getLanguage()=="EN"
){
   lang='en';
}
    return Directionality(textDirection:_language.getLanguage()=="AR"?TextDirection.rtl : TextDirection.ltr,
      child: DefaultTabController(
        initialIndex: 0,
        length: 3,
        child: Scaffold(
          key: _scaffoldKey,
          backgroundColor: MyColors.lightBlue,
          appBar: AppBar(
            backgroundColor: Colors.transparent,
            shadowColor: Colors.transparent,
            systemOverlayStyle: const SystemUiOverlayStyle(
                statusBarColor: Colors.transparent,
                statusBarIconBrightness: Brightness.dark),
            toolbarHeight: 65,
            leading: Padding(
              padding: const EdgeInsets.all(16.0),
              child: IconButton(
                onPressed: () {
                  return _scaffoldKey.currentState?.openDrawer();
                },
                icon: const Icon(
                  Icons.menu,
                  size: 40,
                  color: MyColors.black,
                ),
              ),
            ),
            leadingWidth: 80,
            actions: [
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Container(
                  width: 50,
                  height: 50,
                  padding: const EdgeInsets.only(top: 10),
                  child: Stack(
                    alignment: Alignment.topRight,
                    children: [
                      InkWell(
                        onTap: () {
                          Navigator.push(
                            context,
                            // MaterialPageRoute(builder: (context) => ResetPassword(token: token,))
                            //MaterialPageRoute(builder: (context) => Profile(userId: userId, token: token,)),
                            MaterialPageRoute(
                                builder: (context) => Profile(
                                      token: widget.token,
                                      userId: widget.id,
                                    )),
                          );
                        },
                        child: const CircleAvatar(
                          backgroundColor: Color.fromRGBO(200, 200, 202, 1),
                          radius: 46,
                          backgroundImage: AssetImage('assets/Group.png'),
                        ),
                      ),
                      Container(
                        decoration: BoxDecoration(
                            color: MyColors.lightBlue,
                            borderRadius: BorderRadius.circular(20)),
                        child: Padding(
                          padding: const EdgeInsets.all(1.25),
                          child: CircleAvatar(
                            backgroundColor: MyColors.blue,
                            radius: 7,
                            child: Text(
                              '${(controller.notification < 100) ? controller.notification : 99}',
                              style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 9.5,
                                  fontWeight: FontWeight.normal),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
         drawer: Drawer(
          backgroundColor: const Color(0xff47AEB5), // اللون الخاص بالdrawer
          child: ListView(
            padding: EdgeInsets.zero,
            children: [
              SizedBox(
                height: 70,
              ),
              
              // DrawerHeader(
              //   decoration: BoxDecoration(
              //     color: MyColors.lightBlue, // لون خلفية الهيدر
              //   ),
              //   child: const Text(
              //     'Menu',
              //     style: TextStyle(color: Colors.white, fontSize: 24),
              //   ),
              // ),
             ListTile(
                    title: Text(_language.tlanguage()!),
                    leading: Icon(Icons.language),
                    trailing: DropdownButton(
                        hint: Text('language'),
                        value: _Selectedlanguage,
                        onChanged: (newvalue) async {
                          SharedPreferences pref =
                              await SharedPreferences.getInstance(); //
                          pref.setString('language', newvalue!);
                          _language.setLanguage(newvalue);
                          language = newvalue;
                          setState(() {
                            _Selectedlanguage = newvalue!;
                          });
                        },
                        items: _languages.map((lang) {
                          return DropdownMenuItem(
                            child: new Text(lang),
                            value: lang,
                          );
                        }).toList())),
              ListTile(
                leading: const Icon(Icons.person, color: Colors.white), // أيقونة البروفايل
                title: const Text(
                  'Profile',
                  style: TextStyle(color: Colors.white),
                ),
                onTap: () {
                  Navigator.push(context, MaterialPageRoute(builder: (BuildContext)=>Profile(userId: widget.id, token: widget.token))); // التنقل إلى صفحة البروفايل باستخدام GetX
                },
              ),
              ListTile(
                leading: const Icon(Icons.logout, color: Colors.white), // أيقونة تسجيل الخروج
                title: const Text(
                  'Logout',
                  style: TextStyle(color: Colors.white),
                ),
                onTap: () {
                  // تنفيذ عملية تسجيل الخروج
                  // يمكنك استدعاء التابع الخاص بالخروج هنا
                 _logout(context);
                },
              ),
            ],
          ),
        ),
          body: Column(
            children: [
              Expanded(
                child: TabBarView(
                  controller: tabController,
                  children:  [
                    Home(token: widget.token, userId: widget.id,),
                    Favorite(token: widget.token, userId: widget.id,),
                   GuidsScreen(token: widget.token,userId:widget.id),
                    MyBooked(token: widget.token, userId: widget.id,),
                  ],
                ),
              ),
              Container(
                decoration: BoxDecoration(
                  color: MyColors.white,
                  boxShadow: [
                    BoxShadow(
                        color: MyColors.grey.withOpacity(0.2), blurRadius: 2),
                  ],
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: TabBar(
                        onTap: (value) {
                          setState(() {});
                        },
                        controller: tabController,
                        automaticIndicatorColorAdjustment: true,
                        indicator: const UnderlineTabIndicator(
                          borderRadius:
                              BorderRadius.vertical(top: Radius.circular(20)),
                          insets: EdgeInsets.symmetric(horizontal: 8),
                        ),
                        unselectedLabelColor: MyColors.lightGrey,
                        labelColor: MyColors.blue,
                        tabs: [
                          Tab(
                            height: 67,
                            icon: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Iconify(
                                  (tabController.index == 0)
                                      ? Octicon.home_fill_24
                                      : Octicon.home_24,
                                  size: 32,
                                  color: (tabController.index == 0)
                                      ? MyColors.blue
                                      : MyColors.lightGrey,
                                ),
                                const SizedBox(
                                  height: 2,
                                ),
                                Text(
                                  _language.thome()!,
                                  style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w500,
                                    color: (tabController.index == 0)
                                        ? MyColors.blue
                                        : MyColors.lightGrey,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Tab(
                            height: 67,
                            icon: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  (tabController.index == 1)
                                      ? Icons.favorite
                                      : Icons.favorite_outline,
                                  size: 32,
                                  color: (tabController.index == 1)
                                      ? MyColors.blue
                                      : MyColors.lightGrey,
                                ),
                                const SizedBox(
                                  height: 2,
                                ),
                                Text(
                                  _language.tfav()!,
                                  style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w500,
                                    color: (tabController.index == 1)
                                        ? MyColors.blue
                                        : MyColors.lightGrey,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Tab(
                            height: 67,
                            icon: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  (tabController.index == 2)
                                      ? FontAwesomeIcons.solidCompass
                                      : FontAwesomeIcons.compass,
                                  size: 32,
                                  color: (tabController.index == 2)
                                      ? MyColors.blue
                                      : MyColors.lightGrey,
                                ),
                                const SizedBox(
                                  height: 2,
                                ),
                                Text(
                                  _language.tguide()!,
                                  style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w500,
                                    color: (tabController.index == 2)
                                        ? MyColors.blue
                                        : MyColors.lightGrey,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Tab(
                            height: 67,
                            icon: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(2.0),
                                  child: Iconify(
                                    Wpf.todolist,
                                    size: 28,
                                    color: (tabController.index == 3)
                                        ? MyColors.blue
                                        : MyColors.lightGrey,
                                  ),
                                ),
                                const SizedBox(
                                  height: 2,
                                ),
                                Text(
                                  _language.tmyBooked()!,
                                  style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w500,
                                    color: (tabController.index == 3)
                                        ? MyColors.blue
                                        : MyColors.lightGrey,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
