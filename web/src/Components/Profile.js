import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faUser, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { useBaseUrl } from './BaseUrlContext';

export default function Profile() {
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        image_path: ''
    });
    const [isEditing, setIsEditing] = useState({
        name: false,
        email: false,
        phone: false
    });

    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem('user_id');
    const baseURL = useBaseUrl();

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/mutual/profile/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                console.log(response.data.image_path);
                console.log(response.data);
                setUser(response.data);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [user_id, token]);
    
    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveName = async () => {
        try {
            const response = await axios.post(`${baseURL}/api/users/resetName`, {
                user_id,
                first_name: user.first_name,
                last_name: user.last_name,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 201) {
                console.log(response.data.message);
                toast.success(response.data.message);
                setIsEditing({ ...isEditing, name: false });
            }
        } catch (error) {
            console.error("Error saving name:", error);
        }
    };

    const handleSaveEmail = async () => {
        try {
            const response = await axios.post(`${baseURL}/api/users/resetEmail`, {
                user_id,
                new_email: user.email,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 201) {
                console.log(response.data.message);
                toast.success(response.data.message);
                setIsEditing({ ...isEditing, email: false });
            }
        } catch (error) {
            console.error("Error saving email:", error);
        }
    };

    const handleSavephoneNumber = async () => {
        try {
            const response = await axios.post(`${baseURL}/api/users/resetPhone`, {
                user_id,
                phone_number: user.phone_number,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 201) {
                console.log(response.data.message);
                toast.success(response.data.message);
                setIsEditing({ ...isEditing, phone: false });
            }
        } catch (error) {
            console.error("Error saving phone_number:", error);
        }
    };

    const handleProfilePicUpload = async (e) => {
        const file = e.target.files[0];

        const previewUrl = URL.createObjectURL(file);

        setUser({
            ...user,
            image_path: previewUrl
        });

        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("profileImage", file);

        try {
            const response = await axios.post(`${baseURL}/api/users/profilePic`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 201) {
                toast.success(response.data.message);
                // Call fetchUserProfile after successfully uploading the image
                fetchUserProfile();
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        }
    };

    const handleSaveChanges = async () => {
        if (isEditing.name) {
            await handleSaveName();
        }
        if (isEditing.email) {
            await handleSaveEmail();
        }
        if (isEditing.phone) {
            await handleSavephoneNumber();
        }

        setIsEditing({ name: false, email: false, phone: false });
        window.location.reload();
    };

    return (
        <div className='dashboard'>
            <Header />
            <div className='forget-flex' id='profile'>
                <div className='circle'>
                   <img
                        src={ `data:image/jpeg;base64,${user.image}`}
                        alt="Profile"
                    />

                    <div className="edit-icon">
                        <FontAwesomeIcon icon={faPen} className='pen' onClick={() => document.getElementById('profilePicInput').click()} />
                        <input type="file" id="profilePicInput" style={{ display: 'none' }} onChange={handleProfilePicUpload} />
                    </div>
                </div>
                <div className='profile-field'>
                    <div className='input-field' id='input-profile'>
                        <FontAwesomeIcon icon={faUser} className='icon' />    
                        <input
                            type='text'
                            name='first_name'
                            value={user.first_name}
                            placeholder='First Name'
                            onChange={handleInputChange}
                            readOnly={!isEditing.name}
                        />
                        <FontAwesomeIcon icon={faPen} className='pen' onClick={() => setIsEditing({ ...isEditing, name: true })} />
                    </div>

                    <div className='input-field' id='input-profile'>
                        <FontAwesomeIcon icon={faUser} className='icon' />    
                        <input
                            type='text'
                            name='last_name'
                            value={user.last_name}
                            placeholder='Last Name'
                            onChange={handleInputChange}
                            readOnly={!isEditing.name}
                        />
                        <FontAwesomeIcon icon={faPen} className='pen' onClick={() => setIsEditing({ ...isEditing, name: true })} />
                    </div>

                    <div className='input-field' id='input-profile'>
                        <FontAwesomeIcon icon={faPhone} className='icon' />
                        <input
                            type='text'
                            name='phone_number'
                            value={user.phone_number}
                            placeholder='Phone number'
                            onChange={handleInputChange}
                            readOnly={!isEditing.phone}
                        />
                        <FontAwesomeIcon icon={faPen} className='pen' onClick={() => setIsEditing({ ...isEditing, phone: true })} />
                    </div>

                    <div className='input-field' id='input-profile'>
                        <FontAwesomeIcon icon={faEnvelope} className='icon' />
                        <input
                            type='email'
                            name='email'
                            value={user.email}
                            placeholder='Email'
                            onChange={handleInputChange}
                            readOnly={!isEditing.email}
                        />
                        <FontAwesomeIcon icon={faPen} className='pen' onClick={() => setIsEditing({ ...isEditing, email: true })} />
                    </div>

                    <div className='input-field' id='input-profile'>
                        <button
                            type='button'
                            onClick={handleSaveChanges}
                            disabled={!isEditing.name && !isEditing.email && !isEditing.phone}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
