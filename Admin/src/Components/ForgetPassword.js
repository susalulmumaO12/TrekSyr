import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useBaseUrl } from './BaseUrlContext';


function ForgetPassword() {
  
  const [email, setEmail] = useState('');
  const [accept, setAccept] = useState(false);
  const baseURL = useBaseUrl();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setAccept(true);

    console.log("Submitting form with email:", email);

    if (email === "") {
      console.log("Form validation failed");
      return;
    }

    try {
      const res = await axios.post(`${baseURL}/api/users/sendPassword`, {
        email:email
       });
      
      if (res.status === 200) {
       toast.success("the new password is sent to your inbox! please change your password once in log in");
      }

    } catch (error) {
      console.error("Error sending code:", error);
      if(error.response && error.response.status === 404){
        toast.error('User not found')
      }
    }
  }

  return (
    <div className="dashboard">
      <div className='forget-flex'>
      <h1>Enter your new email please</h1>
      <form onSubmit={handleSubmit} className='field-group'>

      <div className='input-field input-login' id='symbol'>
                  <FontAwesomeIcon icon={faEnvelope} className='icon'  />   
                  <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
       </div>
      <div className='input-field input-login'>
            <button type='submit'>Send Password</button>
          </div>
          <Link to='/'>Back to login?</Link>
           </form>
      </div>
    </div>
  )
}

export default ForgetPassword
