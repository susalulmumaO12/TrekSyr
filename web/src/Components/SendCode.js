
import React, { useRef,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useBaseUrl } from './BaseUrlContext';


export default function SendCode() {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [email, setEmail] = useState("");
  const baseURL = useBaseUrl();


  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate('/signup');
    }
  }, [navigate]);

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !e.target.value) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else if (e.target.value) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('Text').slice(0, 6); 
    if (pasteData) {
      pasteData.split('').forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char;
          if (index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
          }
        }
      });
      e.preventDefault(); 
    }
  };

  const handleSubmit = async () => {
    const code = inputRefs.current.map(input => input.value).join('');
    if (code.length !== 6) {
      toast.error('Please enter a valid 6-digit code.');
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/users/verifyUser`, { code: code, email: email});
      if (response.status === 200) {
        toast.success('Code verified successfully!');
        navigate('/home'); 
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      toast.error('Verification failed. Please try again.');
    }
  };
  const handleResendCode = async ()=>{
          try {
            const response = await axios.post(`${baseURL}/api/users/sendCode`, { email: email});
            if (response.status === 200) {
              toast.success('The verification code is sent to your inbox');
            }
        }catch (error) {
          console.error('Error verifying code:', error);
          toast.error('send code failed. Please try again.');
        }
   };
  return (
    <div className='dashboard'>
      <div className='forget-flex'>
        <p>Enter the code here please</p>
        <div className="input-fields" onPaste={handlePaste}>
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        <div className='input-field input-login'>
          <button type="submit" onClick={handleSubmit} className='verify-button'>
            Verify
          </button>
        </div>
        <button onClick={handleResendCode} className='resend-codebutton'>resend code?</button>
        
      </div>
    </div>
  );
}
