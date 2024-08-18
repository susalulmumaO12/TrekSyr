'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('places', [
      {
        place_id: 1,
        city_id: 1,
        category_id: 5,
        name: 'Haretna Restaurant',
        ar_name: 'مطعم حارتنا',
        description: 'Lebanese, Mediterranean, Middle Eastern',
        ar_description: 'مطبخ لبناني, شرقي',
        address: 'Bab Touma - Old Town, Damascus Syria',
        ar_address: 'باب توما, المدينة القديمة, دمشق, سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(36.316185 33.512516)\')'),
        active: true
      },
      {
        place_id: 2,
        city_id: 2,
        category_id: 6,
        name: 'Sheraton Aleppo Hotel',
        ar_name: 'فندق شيراتون حلب',
        description: '5-star luxury hotel in the heart of Aleppo',
        ar_description: 'فندق فاخر من فئة الخمس نجوم في قلب حلب',
        address: 'Al-Khandak Street, Aleppo Syria',
        ar_address: 'شارع الخندق، حلب، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(37.16117 36.20124)\')'),
        active: true
      },
      {
        place_id: 3,
        city_id: 3,
        category_id: 4,
        name: 'Krak des Chevaliers',
        ar_name: 'قلعة الحصن',
        description: 'A Crusader castle in Syria and one of the most important preserved medieval castles in the world',
        ar_description: 'قلعة صليبية في سوريا وأحد أهم القلاع المحفوظة من العصور الوسطى في العالم',
        address: 'Homs, Syria',
        ar_address: 'حمص، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(36.29814 34.75488)\')'),
        active: true
      },
      {
        place_id: 4,
        city_id: 4,
        category_id: 2,
        name: 'Blue Beach Resort',
        ar_name: 'منتجع الشاطئ الأزرق',
        description: 'A beautiful beach resort in Latakia',
        ar_description: 'منتجع شاطئي جميل في اللاذقية',
        address: 'Latakia, Syria',
        ar_address: 'اللاذقية، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(35.78667 35.52361)\')'),
        active: true
      },
      {
        place_id: 5,
        city_id: 5,
        category_id: 3,
        name: 'Al Ghab Plain Forest',
        ar_name: 'غابة سهل الغاب',
        description: 'A large forested region in the northwest of Syria',
        ar_description: 'منطقة غابية كبيرة في شمال غرب سوريا',
        address: 'Hama, Syria',
        ar_address: 'حماة، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(36.75278 35.13444)\')'),
        active: true
      },
      {
        place_id: 6,
        city_id: 6,
        category_id: 7,
        name: 'Raqqa Train Station',
        ar_name: 'محطة قطار الرقة',
        description: 'A key transportation hub in Raqqa',
        ar_description: 'مركز نقل رئيسي في الرقة',
        address: 'Raqqa, Syria',
        ar_address: 'الرقة، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(39.01667 35.95000)\')'),
        active: true
      },
      {
        place_id: 7,
        city_id: 7,
        category_id: 4,
        name: 'Deir ez-Zor Bridge',
        ar_name: 'جسر دير الزور',
        description: 'Historic suspension bridge built in the 1920s',
        ar_description: 'جسر معلق تاريخي بني في عشرينيات القرن الماضي',
        address: 'Deir ez-Zor, Syria',
        ar_address: 'دير الزور، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(40.15000 35.33333)\')'),
        active: true
      },
      {
        place_id: 8,
        city_id: 8,
        category_id: 1,
        name: 'Mount Abdulaziz',
        ar_name: 'جبل عبد العزيز',
        description: 'A mountain range located in Al-Hasakah Governorate',
        ar_description: 'سلسلة جبلية تقع في محافظة الحسكة',
        address: 'Al-Hasakah, Syria',
        ar_address: 'الحسكة، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(40.75000 36.50000)\')'),
        active: true
      },
      {
        place_id: 9,
        city_id: 9,
        category_id: 5,
        name: 'Al-Karak Restaurant',
        ar_name: 'مطعم الكرك',
        description: 'Famous for its traditional Syrian cuisine',
        ar_description: 'يشتهر بالمأكولات السورية التقليدية',
        address: 'Daraa, Syria',
        ar_address: 'درعا، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(36.10528 32.61889)\')'),
        active: true
      },
      {
        place_id: 10,
        city_id: 10,
        category_id: 2,
        name: 'Tartus Beach',
        ar_name: 'شاطئ طرطوس',
        description: 'A popular beach destination in Tartus',
        ar_description: 'وجهة شاطئية شهيرة في طرطوس',
        address: 'Tartus, Syria',
        ar_address: 'طرطوس، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(35.88333 34.88333)\')'),
        active: true
      },
      {
        place_id: 11,
        city_id: 11,
        category_id: 6,
        name: 'Idlib Palace Hotel',
        ar_name: 'فندق قصر إدلب',
        description: 'A luxurious hotel in the center of Idlib',
        ar_description: 'فندق فاخر في وسط مدينة إدلب',
        address: 'Idlib, Syria',
        ar_address: 'إدلب، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(36.63136 35.93062)\')'),
        active: true
      },
      {
        place_id: 12,
        city_id: 12,
        category_id: 1,
        name: 'Mount Hermon',
        ar_name: 'جبل الشيخ',
        description: 'A mountain cluster in the Anti-Lebanon mountain range',
        ar_description: 'مجموعة جبلية في سلسلة جبال لبنان الشرقية',
        address: 'Al-Qamishli, Syria',
        ar_address: 'القامشلي، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(41.22222 37.05250)\')'),
        active: true
      },
      {
        place_id: 13,
        city_id: 13,
        category_id: 4,
        name: 'Tell Halaf',
        ar_name: 'تل حلف',
        description: 'An archaeological site of an ancient Aramean city',
        ar_description: 'موقع أثري لمدينة آرامية قديمة',
        address: 'Al-Malikiyah, Syria',
        ar_address: 'المالكية، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(42.13806 37.17528)\')'),
        active: true
      },
      {
        place_id: 14,
        city_id: 14,
        category_id: 3,
        name: 'As-Suwayda Forest',
        ar_name: 'غابة السويداء',
        description: 'A lush forest area in As-Suwayda',
        ar_description: 'منطقة غابية كثيفة في السويداء',
        address: 'As-Suwayda, Syria',
        ar_address: 'السويداء، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(36.56917 32.70889)\')'),
        active: true
      },
      {
        place_id: 15,
        city_id: 2,
        category_id: 4,
        name: 'Citadel of Aleppo',
        ar_name: 'قلعة حلب',
        description: 'A large medieval fortified palace in the center of the old city of Aleppo, northern Syria.',
        ar_description: 'قصر محصن كبير يعود للقرون الوسطى في وسط مدينة حلب القديمة شمال سوريا.',
        address: 'Aleppo, Syria',
        ar_address: 'حلب، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(37.1613 36.1990)\')'),
        active: true
      },
      {
        place_id: 16,
        city_id: 3,
        category_id: 3,
        name: 'Homs Forest',
        ar_name: 'غابة حمص',
        description: 'A beautiful forest area perfect for hiking and nature walks.',
        ar_description: 'منطقة غابية جميلة مثالية للمشي والتنزه.',
        address: 'Homs, Syria',
        ar_address: 'حمص، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(36.7090 34.7306)\')'),
        active: true
      },
      {
        place_id: 17,
        city_id: 4,
        category_id: 2,
        name: 'Blue Beach',
        ar_name: 'الشاطئ الأزرق',
        description: 'A stunning beach with clear blue waters and white sands.',
        ar_description: 'شاطئ رائع بمياه زرقاء صافية ورمال بيضاء.',
        address: 'Latakia, Syria',
        ar_address: 'اللاذقية، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(35.7917 35.5167)\')'),
        active: true
      },
      {
        place_id: 18,
        city_id: 5,
        category_id: 1,
        name: 'Mount Zaphon',
        ar_name: 'جبل زافون',
        description: 'A majestic mountain offering breathtaking views and hiking trails.',
        ar_description: 'جبل رائع يوفر مناظر خلابة ومسارات للمشي.',
        address: 'Hama, Syria',
        ar_address: 'حماة، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(36.7494 35.1111)\')'),
        active: true
      },
      {
        place_id: 19,
        city_id: 6,
        category_id: 5,
        name: 'Al-Madina Restaurant',
        ar_name: 'مطعم المدينة',
        description: 'A popular restaurant offering a variety of traditional Syrian dishes.',
        ar_description: 'مطعم شهير يقدم مجموعة متنوعة من الأطباق السورية التقليدية.',
        address: 'Raqqa, Syria',
        ar_address: 'الرقة، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(39.0167 35.9500)\')'),
        active: true
      },
      {
        place_id: 20,
        city_id: 1,
        category_id: 1,
        name: 'Mount Qasioun',
        ar_name: 'جبل قاسيون',
        description: 'A mountain overlooking the city of Damascus, offering stunning views.',
        ar_description: 'جبل يطل على مدينة دمشق ويوفر مناظر خلابة.',
        address: 'Damascus, Syria',
        ar_address: 'دمشق، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(36.2850 33.5450)\')'),
        active: true
      },
      {
        place_id: 21,
        city_id: 4,
        category_id: 5,
        name: 'Latakia Marina Restaurant',
        ar_name: 'مطعم مرينا اللاذقية',
        description: 'A seaside restaurant known for its seafood dishes.',
        ar_description: 'مطعم على شاطئ البحر يشتهر بأطباق المأكولات البحرية.',
        address: 'Latakia, Syria',
        ar_address: 'اللاذقية، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(35.7806 35.5333)\')'),
        active: true
      },
      {
        place_id: 22,
        city_id: 5,
        category_id: 4,
        name: 'Apamea',
        ar_name: 'أفاميا',
        description: 'An ancient city with well-preserved Roman ruins.',
        ar_description: 'مدينة قديمة تحتوي على آثار رومانية محفوظة جيدًا.',
        address: 'Hama, Syria',
        ar_address: 'حماة، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(36.4842 35.4142)\')'),
        active: true
      },
      {
        place_id: 23,
        city_id: 6,
        category_id: 3,
        name: 'Raqqa Desert',
        ar_name: 'صحراء الرقة',
        description: 'A vast desert area perfect for desert safaris and adventures.',
        ar_description: 'منطقة صحراوية واسعة مثالية لرحلات السفاري والمغامرات الصحراوية.',
        address: 'Raqqa, Syria',
        ar_address: 'الرقة، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(39.0200 35.9600)\')'),
        active: true
      },
      {
        place_id: 24,
        city_id: 3,
        category_id: 2,
        name: 'Homs Lake',
        ar_name: 'بحيرة حمص',
        description: 'A serene lake offering boat rides and picnicking spots.',
        ar_description: 'بحيرة هادئة تقدم ركوب القوارب ومواقع للنزهات.',
        address: 'Homs, Syria',
        ar_address: 'حمص، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(36.7520 34.7300)\')'),
        active: true
      },
      {
        place_id: 25,
        city_id: 1,
        category_id: 1,
        name: 'Umayyad Mosque',
        ar_name: 'الجامع الأموي',
        description: 'A grand mosque and one of the oldest and largest in the world.',
        ar_description: 'مسجد كبير وأحد أقدم وأكبر المساجد في العالم.',
        address: 'Damascus, Syria',
        ar_address: 'دمشق، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(36.3068 33.5116)\')'),
        active: true
      },
      {
        place_id: 26,
        city_id: 2,
        category_id: 5,
        name: 'Aleppo Citadel Cafe',
        ar_name: 'مقهى قلعة حلب',
        description: 'A cafe offering a great view of the Aleppo Citadel.',
        ar_description: 'مقهى يوفر إطلالة رائعة على قلعة حلب.',
        address: 'Aleppo, Syria',
        ar_address: 'حلب، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(37.1600 36.2013)\')'),
        active: true
      },
      {
        place_id: 27,
        city_id: 7,
        category_id: 2,
        name: 'Euphrates River',
        ar_name: 'نهر الفرات',
        description: 'A major river that offers boat rides and scenic views.',
        ar_description: 'نهر رئيسي يقدم ركوب القوارب ومناظر طبيعية خلابة.',
        address: 'Deir ez-Zor, Syria',
        ar_address: 'دير الزور، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(40.1500 35.3333)\')'),
        active: true
      },
      {
        place_id: 28,
        city_id: 8,
        category_id: 4,
        name: 'Tell Brak',
        ar_name: 'تل براك',
        description: 'An important ancient city and archaeological site.',
        ar_description: 'مدينة قديمة هامة وموقع أثري.',
        address: 'Al-Hasakah, Syria',
        ar_address: 'الحسكة، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(41.1222 36.6575)\')'),
        active: true
      },
      {
        place_id: 29,
        city_id: 9,
        category_id: 1,
        name: 'Bosra Amphitheatre',
        ar_name: 'مدرج بصرى',
        description: 'A Roman theatre renowned for its excellent preservation and historical significance.',
        ar_description: 'مسرح روماني مشهور بحفظه الممتاز وأهميته التاريخية.',
        address: 'Daraa, Syria',
        ar_address: 'درعا، سوريا',
        location: Sequelize.literal('ST_GeomFromText(\'POINT(36.4825 32.5183)\')'),
        active: true
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('places', null, {});
  }
};