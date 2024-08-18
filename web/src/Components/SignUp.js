import { faEnvelope, faPhone, faLock, faFile, faUser,faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import React, { useState,useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useBaseUrl } from './BaseUrlContext';


function SignUp() {
  const [fguideName, setFguideName] = useState("");
  const [lguideName, setLguideName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [identificationPapers, setIdentificationPapers] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [flag, setFlag] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const baseURL = useBaseUrl();


  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleLoginClick = () => {
    navigate('/');
  };
  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdentificationPapers(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      }; 
      reader.readAsDataURL(file);
    } else {
      setIdentificationPapers(null);
      setPreviewImage(null);
    }
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

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  const submit = async (e) => {
    e.preventDefault();
    setAccept(true);

    if(fguideName === ""){
      setFlag(false);
      toast.error('First Name of Guide is required.');
      return;
    }
    if(lguideName === ""){
      setFlag(false);
      toast.error('last Name of Guide is required.');
      return;
    }
    if(phoneNumber.length < 13){
      setFlag(false);
      toast.error('Phone number must be in a valid international format');
      return;
    }
    if( password.length < 8){
      setFlag(false);
      toast.error('Password must be at least 8 characters long.');
      return;
    }
    if(confirmPassword !== password){
      setFlag(false);
      toast.error('Invalid confirm password.');
      return;
    }
    if(identificationPapers === null){
      

    }

    try {
      const formData = new FormData();
      formData.append('first_name', fguideName);
      formData.append('last_name', lguideName);
      formData.append('email', email);
      formData.append('phone_number', phoneNumber);
      formData.append('password', password);
      formData.append('licenceImage', identificationPapers);

      const res = await axios.post(`${baseURL}/api/users/registerGuide`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

    
      if (res.status === 201) {
        localStorage.setItem('email', email); 
        toast.success('User created successfully! Check your inbox to verify your email.');
        navigate('/send_code');
      }
    } catch (error) {
      console.error('Error response:', error.response);

      const errorResponse = error.response?.data || error.message;
      if (error.response && error.response.status === 400) {
        if (typeof errorResponse === 'string') {
          if (errorResponse.includes('email')) {
            toast.error('Email is already registered.');
          } else if (errorResponse.includes('phone number')) {
            toast.error('Phone number is already registered.');
          } else if (errorResponse.includes('both')) {
            toast.error('Email and phone number are already registered.');
          }
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='container-signup'>
      <div className="image">
        <div className="content">
          <h1>Welcome!</h1>
          <div className="butt2">
            <button id="second" onClick={handleLoginClick}>Login</button>
            <button onClick={handleSignUpClick}>Sign up</button>
          </div>
        </div>
      </div>
      <div className="container-form">
        <form onSubmit={submit} className='field-group signup'>
          <div className='input-field'>
            <FontAwesomeIcon icon={faUser} className='icon' />
            <input
              type='text'
              placeholder='First name'
              value={fguideName}
              onChange={(e) => setFguideName(e.target.value)}
              ref={el => inputRefs.current[0] = el}
              onKeyDown={(e) => handleKeyDown(e, 0)}
         
            />
          </div>

          <div className='input-field'>
            <FontAwesomeIcon icon={faUser} className='icon' />
            <input
              type='text'
              placeholder='Last name'
              value={lguideName}
              onChange={(e) => setLguideName(e.target.value)}
              ref={el => inputRefs.current[1] = el}
              onKeyDown={(e) => handleKeyDown(e, 1)}
        
            />
          </div>

          <div className='input-field'>
            <FontAwesomeIcon icon={faPhone} className='icon' />
            <input
              type='text'
              placeholder='Phone number'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              ref={el => inputRefs.current[2] = el}
              onKeyDown={(e) => handleKeyDown(e, 2)}
        
            />
          </div>

          <div className='input-field'>
            <input
              id="paperInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              ref={el => inputRefs.current[3] = el}
         
            />
            <label htmlFor="paperInput">
              <FontAwesomeIcon icon={faFile} className="icon" />&nbsp;
              {!previewImage && <span>Identification papers</span>}
            </label>
            {previewImage && (
              <div className='uploaded-image'>
                <img src={previewImage} alt="Uploaded" className='preview-image' />
              </div>
            )}
          </div>
          {/* {identificationPapers === null && accept && <p className='error'>Identification papers are required</p>} */}

          <div className='input-field'>
            <FontAwesomeIcon icon={faEnvelope} className='icon' />
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={el => inputRefs.current[4] = el}
              onKeyDown={(e) => handleKeyDown(e, 4)}
           
            />
          </div>

          <div className='input-field'>
            <FontAwesomeIcon icon={faLock} className='icon' />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={el => inputRefs.current[5] = el}
              onKeyDown={(e) => handleKeyDown(e, 5)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className='icon-eye'
              onClick={toggleShowPassword}
            />
          </div>

          <div className='input-field'>
            <FontAwesomeIcon icon={faLock} className='icon' />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              ref={el => inputRefs.current[6] = el}
              onKeyDown={(e) => handleKeyDown(e, 6)}
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              className='icon-eye'
              onClick={toggleShowConfirmPassword}
            />
          </div>

          <div className='input-field'>
            <button type='submit'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
