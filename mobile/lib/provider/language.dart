import 'package:flutter/cupertino.dart';
import 'package:my_tourism_app/main.dart';
class Language with ChangeNotifier{
  String  _lang =language;

  getLanguage(){

    return _lang;
  }
  setLanguage(String lang){
    _lang = lang;
    notifyListeners();

  }
//change language screen translate

  String ?tlanguage(){

    if(getLanguage() == 'AR')
      return 'اللغة';
    else
      return 'language';

  }

//Addtocart3 screen translate


  String ?thome(){

    if(getLanguage() == 'AR')
      return 'الرئيسية';
    else
      return 'Home';

  }

  String ?tfav(){

    if(getLanguage() == 'AR')
      return 'المفضلة';
    else
      return 'Favourite';

  }
  String ?tguide(){

    if(getLanguage() == 'AR')
      return 'الأدلة';
    else
      return 'Guides';

  }

  String ?tmyBooked(){

    if(getLanguage() == 'AR')
      return 'حجوزاتي';
    else
      return 'My Booked';

  }

  String ?twheredoyou(){

    if(getLanguage() == 'AR')
      return 'إلى أين تريد الذهاب؟';
    else
      return 'where do you want to go?';

  }

  String ?tfindPlace(){

    if(getLanguage() == 'AR')
      return 'جد مكاناً..';
    else
      return 'finad a place..';

  }

  String ?tcategories(){

    if(getLanguage() == 'AR')
      return 'التصنيفات';
    else
      return 'Categories';

  }

  String ?tprofile(){

    if(getLanguage() == 'AR')
      return 'الملف الشخصي';
    else
      return 'Profile';

  }

   String ?tlogout(){

    if(getLanguage() == 'AR')
      return 'تسجيل الخروج';
    else
      return 'Logout';

  }

  String ?tview(){

    if(getLanguage() == 'AR')
      return 'عرض بواسطة';
    else
      return 'view By';

  }

   String ?tplaces(){

    if(getLanguage() == 'AR')
      return 'الأماكن';
    else
      return 'Places';

  }

  // String ?tplaces(){

  //   if(getLanguage() == 'AR')
  //     return 'الأماكن';
  //   else
  //     return 'Sorted by';

  // }

  

}