
import { faEnvelope ,faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useBaseUrl } from './BaseUrlContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accept, setAccept] = useState(false);
  const baseURL = useBaseUrl();

  
//51221572
  const navigate = useNavigate();

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
        const { token } = res.data; 
        window.localStorage.setItem("token", token);
        toast.success('Logged in successfully.')
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
    </div>
    <div className="container-form">
        <div className="imge lim">
              <img  className="logo"src={require('../Assets/Logo.png')} alt='logo'/>
              <img  className="logo" src={require('../Assets/Outdoor.png')}alt=''/>
        </div>
      <form  onSubmit={handleSubmit} className='field-group login'>  
              <div className='input-field input-login'>
                <FontAwesomeIcon icon={faEnvelope} className='icon' />
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
             </div>
              <div className='input-field input-login'>
                <FontAwesomeIcon icon={faLock} className='icon' />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

               <div className='input-field input-login'>
                <button type='submit'>Login</button>
              </div>
              <Link to='/forget_password'>Forget password?</Link>


  </form>

      </div> 
      <div className='image2' ></div>

      </div>
  )
}

export default Login
