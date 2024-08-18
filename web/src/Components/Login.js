import { faEnvelope, faLock,faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState,useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useBaseUrl } from './BaseUrlContext';
import { requestFCMToken } from '../utils/firebaseUtils';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accept, setAccept] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const baseURL = useBaseUrl();
  const [fcmToken, setFcmToken] = useState(null);
  const guideId = localStorage.getItem("user_id");


  const navigate = useNavigate();
  const inputRefs = useRef([]);


  const handleLoginClick = () => {
    navigate('/');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };
  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAccept(true);

    if ( email === "") {
      toast.error('email is required.');
      return;
    }
    if(password.length < 8 ){
      toast.error('Password must be more than 8 characters.');
    return;
  }
    try {
      const res = await axios.post(`${baseURL}/api/users/loginUser`, {
        email: email,
        login_password: password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
         if (res.status === 200) {
          const { token, user_id } = res.data; 
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("user_id", user_id);
          toast.success('Logged in successfully.')

            const fetchFCMToken = async () => {
              try {
                const fcmtoken = await requestFCMToken(); // Get the FCM token
                console.log("FCM token is:", fcmtoken);
        
                // Use the correct FCM token in the request body
                const requestBody = {
                  token: fcmtoken, // Use fcmtoken instead of fcmToken (from state)
                  user_id: guideId
                };
        
                const response = await axios.post(`${baseURL}/api/mutual/fcmToken`, requestBody, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                console.log(response);
        
                // Store the fetched token in the component's state
                setFcmToken(fcmtoken);
        
              } catch (error) {
                console.error('Error fetching or sending FCM token:', error);
              }
            };
        
            fetchFCMToken(); // Call the function
            
         navigate('/home'); 
      }
    } catch (error) {
      console.error('Error response:', error.response);

      if (error.response && error.response.status === 404) {
        toast.error("Email is not registered or incorrect");
      } else if (error.response && error.response.status === 401) {
        toast.error("Guide account is not validated yet,wait for the admin to validate it");
      } else if  (error.response && error.response.status === 400){
        toast.error("email is not verified ");
        navigate('/send_code');
      }
    }
  };

  return (
    <div className='container-signup'>
      <div className="image">
        <div className="content">
          <h1>Welcome again!</h1>
          <div className="butt" id="loginbtn">
            <button onClick={handleLoginClick}>Login</button>
            <button id="second" onClick={handleSignUpClick}>Sign up</button>
          </div>
        </div>
      </div>
      <div className="container-form">
        <div className="imge lim">
          <img className="logo" src={require('../Assets/Logo.png')} alt='logo' />
          <img className="logo" src={require('../Assets/Outdoor.png')} alt='' />
        </div>

        <form onSubmit={handleSubmit} className='field-group login'>
          <div className='input-field input-login'>
            <FontAwesomeIcon icon={faEnvelope} className='icon' />
            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}  ref={el => inputRefs.current[0] = el}
              onKeyDown={(e) => handleKeyDown(e, 0)}/>
          </div>

          <div className='input-field input-login'>
            <FontAwesomeIcon icon={faLock} className='icon' />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={el => inputRefs.current[1] = el}
              onKeyDown={(e) => handleKeyDown(e, 1)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className='icon-eye'
              onClick={toggleShowPassword}
            />
          </div>

          <div className='input-field input-login'>
            <button type='submit'>Login</button>
          </div>
          <Link to='/forget_password'>Forget password?</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
