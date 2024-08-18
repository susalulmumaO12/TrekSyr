// import './App.css';
// import './home.css';
import Home from './Components/Home';
import Login from './Components/Login';
import FinishedTrips from './Components/FinishedTrips';
import SignUp from './Components/SignUp';
import { Route, Routes } from 'react-router-dom';
import AddTripe from './Components/AddTripe';
import SeeDetails from './Components/SeeDetails';
import ForgetPassword from './Components/ForgetPassword';
import SendCode from './Components/SendCode';
import Profile from './Components/Profile';
import UpcomingTrips from './Components/UpcomingTrips';
import SeePlace from "./Components/SeePlace";
import Comment from './Components/Comment';
import EditTrip from "./Components/EditTrip"
import { requestFCMToken } from './utils/firebaseUtils';
import axios from "axios";
import { useEffect, useState } from 'react';
import RepostTrip from './Components/Repost';

const guideId = localStorage.getItem("user_id");

function App() {
/* 
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        const fcmtoken = await requestFCMToken();
        console.log("token is ", fcmtoken);

        const requestBody = {
          token: fcmToken,
          user_id: guideId
        }

        const response = await axios.post(`http://192.168.214.198:5000/api/mutual/fcmToken`, requestBody, {
        });
        console.log(response);
        setFcmToken(fcmToken);

      } catch (error) {
        console.error(error);

      }
    }
    fetchFCMToken();
  }) */

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/add-tripe' element={<AddTripe />} />
        <Route path="/see-place/:place_id" element={<SeePlace />} />
        <Route path='/view-comment/:place_id' element={<Comment />} />

        <Route path='/edit-trip/:tripId' element={<EditTrip />} />
        <Route path='/edit-trip/:tripId' element={<EditTrip/>}/>
        <Route path='/repost/:tripId' element={<RepostTrip/>}/>

        <Route path='/signup' element={<SignUp />} />
        <Route path='/forget_password' element={<ForgetPassword />} />
        <Route path='/send_code' element={<SendCode />} />
        <Route path='/profile' element={<Profile />} />

        <Route path='/upcoming-trips' element={<UpcomingTrips />} />
        <Route path='/finished-trips' element={<FinishedTrips />} />
        <Route path="/see-details/:tripId" element={<SeeDetails />} />
      </Routes>
    </div>
  );
}

export default App;
