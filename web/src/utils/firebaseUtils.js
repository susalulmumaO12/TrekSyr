import { initializeApp } from 'firebase/app';
import { getToken, getMessaging, onMessage } from 'firebase/messaging';


const firebaseConfig = {
    apiKey: "AIzaSyAmisuxfRkj2CxzlRWySCBWwZqOBoeCGP8",
    authDomain: "treksyr.firebaseapp.com",
    projectId: "treksyr",
    storageBucket: "treksyr.appspot.com",
    messagingSenderId: "71781387471",
    appId: "1:71781387471:web:c0d61dba14d82a6d7ebbba"
  };

const vapidKey = "BOenht8KlssvnBPdpIvbrthiD1eIzkErBr4EnjY0HCq6ypE2tiuueSstN1Z3hWAbG87-qJWixqy365qWm6SRpbE";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFCMToken = async () => {
    return Notification.requestPermission().then((permission) => {
        if(permission === "granted"){
            console.log('Notification permission granted.');
            return getToken(messaging, {vapidKey})
        } else {
            throw new Error("notifications not granted")
        }
    }).catch((err) => {
        console.log("error at 27 ",err);
        throw new Error(err);
    })
}