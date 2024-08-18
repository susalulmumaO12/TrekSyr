import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SendCode() {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

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

  const handleNewPassword = () => {
    navigate('/new_password');
  };

  return (
    <div className='dashboard'>
      <div className='forget-flex'>
        <p>we send code to your email</p>
        <p>enter the code here please</p>
        <div className="input-fields">
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
          <button type="submit" onClick={handleNewPassword}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
}