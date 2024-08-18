
import React, { useState, useEffect } from "react";
import Header from './Header';
import '../Css/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import MapComponent from "./MapComponent";
import axios from "axios";
import { useBaseUrl } from './BaseUrlContext';


export default function AddNew() {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locationLink, setLocationLink] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const baseURL = useBaseUrl();


  useEffect(() => {
    if (selectedLocation) {
      setLocationLink(`https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}`);
    }
  }, [selectedLocation]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages(prevImages => [...prevImages, ...files]);
  };

  const handleImageDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found");
      return;
    }

    
    const formData = new FormData();
    formData.append('city', city);
    formData.append('category', category);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('location', locationLink); 

    
    images.forEach((image, index) => {
      formData.append('placeImages', image);
    });

    try {
      const response = await axios.post(`${baseURL}/api/admin/addPlace`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      alert("Place added successfully!");
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data);
      } else {
        console.error("Error submitting the form!", error);
      }
    }
  };

  return (
    <div className='dashboard'>
      <Header />
      <div className="form-container">
        <div className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} className='arrow' /><p>add new place</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='form-section'>
            <label className='section-label'>choose city</label>
            <div className="options">
            <label htmlFor="Damascus"> 
                    <input type="radio" id="Damascus" name="city" value="Damascus"  onChange={(e) => setCity(e.target.value)}/>
                    <span></span> 
                     Damascus
                     </label>

                    <label htmlFor="Aleppo" >
                    <input type="radio" id="Aleppo" name="city" value="Aleppo" onChange={(e) => setCity(e.target.value)} />
                    <span></span> 
                    Aleppo
                    </label> 
                      
                    <label htmlFor="Homs" >
                    <input type="radio" id="Homs" name="city" value="Homs"  onChange={(e) => setCity(e.target.value)}/>
                    <span></span> 
                     Homs
                    </label> 

                    <label htmlFor="Latakia" >
                    <input type="radio" id="Latakia" name="city" value="Latakia" onChange={(e) => setCity(e.target.value)} />
                    <span></span> 
                     Latakia
                     </label> 

                    <label htmlFor="Hama" >
                    <input type="radio" id="Hama" name="city" value="Hama" onChange={(e) => setCity(e.target.value)} />
                    <span></span> 
                    Hama
                    </label> 

                    <label htmlFor="Raqqa" >
                    <input type="radio" id="Raqqa" name="city" value="Raqqa" onChange={(e) => setCity(e.target.value)} />
                    <span></span> 
                    Raqqa
                    </label> 

                    <label htmlFor="Deir ez-Zor" >
                    <input type="radio" id="Deir ez-Zor" name="city" value="Deir ez-Zor" onChange={(e) => setCity(e.target.value)} />
                    <span></span> 
                    Deir ez-Zor
                    </label> 

                    <label htmlFor="Al-Hasakah" >
                    <input type="radio" id="Al-Hasakah" name="city" value="Al-Hasakah" onChange={(e) => setCity(e.target.value)} />
                    <span></span> 
                    Al-Hasakah
                    </label> 

                    <label htmlFor="Daraa" >
                    <input type="radio" id="Daraa" name="city" value="Daraa" onChange={(e) => setCity(e.target.value)} />
                    <span></span> 
                    Daraa
                    </label> 
               
                <div className="div-label">
                

                <label htmlFor="Tartus" >
                <input type="radio" id="Tartus" name="city" value="Tartus" onChange={(e) => setCity(e.target.value)} />
                <span></span> 
                Tartus
                </label> 

                <label htmlFor="Idlib" >
                <input type="radio" id="Idlib" name="city" value="Idlib" onChange={(e) => setCity(e.target.value)} />
                <span></span> 
                Idlib
                </label> 

                <label htmlFor="Al-Qamishli" >
                <input type="radio" id="Al-Qamishli" name="city" value="Al-Qamishli"  onChange={(e) => setCity(e.target.value)}/>
                <span></span> 
                Al Qamishli
                </label> 

                <label htmlFor="Al-Qunaytirah" >
                <input type="radio" id="Al-Qunaytirah" name="city" value="Al-Qunaytirah" onChange={(e) => setCity(e.target.value)} />
                <span></span> 
                Al Qunaytirah
                </label> 

                <label htmlFor="Al-Suwayda" >
                <input type="radio" id="Al-Suwayda" name="city" value="Al-Suwayda"  onChange={(e) => setCity(e.target.value)}/>
                <span></span> 
                Al-Suwayda
                </label>        
                 </div>
            </div> 
          </div>

          <div className="form-section">
            <label className='section-label'>choose category</label>
            <div className="options">
              {["Mountain", "Beach", "Forest", "Antiquities", "Restaurants", "Hotels", "Transportation"].map(categoryName => (
                <label key={categoryName} htmlFor={categoryName}>
                  <input
                    type="radio"
                    id={categoryName}
                    name="category"
                    value={categoryName}
                    onChange={() => setCategory(categoryName)}
                  />
                  <span></span>
                  {categoryName}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name" className="label-form">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="label-form">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="address" className="label-form">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location" className="label-form">Location Link</label>
            <input
              type="url"
              id="locationLink"
              name="locationLink"
              value={locationLink}
              readOnly
            />
            <MapComponent
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
            {locationLink && (
              <a href={locationLink} target="_blank" rel="noopener noreferrer" className="location-link">
                Open in Google Maps
              </a>
            )}
          </div>

          <div className="form-group">
            <label className="label-form">Images</label>
            <div className="image-container">
              <div className="image-preview">
                {images.map((image, index) => (
                  <div key={index} className="image-wrapper">
                    <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                    <button type="button" className="delete-button" onClick={() => handleImageDelete(index)}>
                      <FontAwesomeIcon icon={faTrash} className="icon" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="image-upload">
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  onChange={handleImageUpload}
                />
                <label htmlFor="images">+</label>
              </div>
            </div>
          </div>
          <button type="submit" className="add-button">submit</button>
        </form>
      </div>
    </div>
  );
}
