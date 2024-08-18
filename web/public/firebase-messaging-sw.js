importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');



const firebaseConfig = {
  apiKey: "AIzaSyAmisuxfRkj2CxzlRWySCBWwZqOBoeCGP8",
  authDomain: "treksyr.firebaseapp.com",
  projectId: "treksyr",
  storageBucket: "treksyr.appspot.com",
  messagingSenderId: "71781387471",
  appId: "1:71781387471:web:c0d61dba14d82a6d7ebbba"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message', payload);
});