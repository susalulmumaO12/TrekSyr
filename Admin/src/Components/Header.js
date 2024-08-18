import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import BellIcon from './icons/BellIcon';
import axios from 'axios';
import { useBaseUrl } from './BaseUrlContext';

function Header() {
  const navigate = useNavigate(); 
  const baseURL = useBaseUrl();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${baseURL}/api/users/logoutUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate('/'); 
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header>
      <div className='container'>
        <Link to='/home' className='logo'>
          <img src={require("../Assets/Group 25.png")} alt="Logo" />
        </Link>
        <nav>
          <FontAwesomeIcon icon={faBars} className='toggle-menu' />
          <ul>
            <li><NavLink to='/home'>places</NavLink></li>
            <li><NavLink to='/add-new'>add new</NavLink></li>
            <li><NavLink to='/requests'>requests</NavLink></li>
            <li><NavLink to='/all-guids'>all guids</NavLink></li>
             {/* <li><NavLink to='/blocked-guids'>blocked guids</NavLink></li>
            <li><NavLink to='/all-users'>all users</NavLink></li>
            <li><NavLink to='/blocked-users'>blocked users</NavLink></li> */}
          </ul> 
          <div className="form">
            {/* <BellIcon /> */}
          </div>
          <div className="user-actions">
            <button onClick={handleLogout} className="logout-btn">Logout</button>
            {/* <NavLink to='/delete-account' className="delete-account-btn">Delete Account</NavLink> */}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
