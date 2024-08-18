import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import Header from './Header';
import '../Css/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import MapComponent from "./MapComponent"; 
import { toast } from "react-toastify";
import { useBaseUrl } from './BaseUrlContext';


export default function EditPlace() {
  const { place_id } = useParams(); 
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locationLink, setLocationLink] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const baseURL = useBaseUrl();

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        if (!place_id) {
          console.log("No place ID provided.");
          return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No token found, please log in.");
          return;
        }

        const placeDetailsResponse = await axios.get(`${baseURL}/api/admin/editableplace/${place_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const placeData = placeDetailsResponse.data;
        setName(placeData.name);
        setDescription(placeData.description);
        setAddress(placeData.address);
        setCity(placeData.city);
        setCategory(placeData.category);
        setSelectedLocation({ lat: placeData.coordinates[0], lng: placeData.coordinates[1] });

        const placeImagesResponse = await axios.get(`${baseURL}/api/mutual/placeImages/${place_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setImages(placeImagesResponse.data);

      } catch (error) {
        toast.error("Error fetching place details.");
      }
    };

    fetchPlaceDetails();
  }, [place_id]);

  useEffect(() => {
    if (selectedLocation) {
      setLocationLink(`https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}`);
    }
  }, [selectedLocation]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedImages(prevImages => [...prevImages, ...files]);
  };

  const handleImageDelete = async (imageId) => {
    if (window.confirm("Are you sure you want to delete this image from database?")) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No token found, please log in.");
          return;
        }

        await axios.post("/api/admin/deletePlaceImages", { image_ids: [imageId] }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setImages(images.filter(image => image.image_id !== imageId));
        toast.success("Image deleted successfully!");
      } catch (error) {
        toast.error("Error deleting the image.");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found, please log in.");
      return;
    }

    const formData = new FormData();
    formData.append('place_id', place_id);
    formData.append('city', city);
    formData.append('category', category);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('location', locationLink);

    uploadedImages.forEach((image, index) => {
      formData.append('placeImages', image);
    });

    try {
      await axios.post(`${baseURL}/api/admin/uploadPlaceImages`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      toast.success("Place updated successfully!");
    } catch (error) {
      toast.error("Error submitting the form.");
    }
  };
  const handleImageDeleteLocal = (index) => {
    if (window.confirm("Are you sure you want to delete this uploaded image?")) {
        setUploadedImages(uploadedImages.filter((_, i) => i !== index));
    }
};

  return (
    <div className='dashboard'>
      <Header />
      <div className="form-container">
        <div className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} className='arrow' /><p>Edit place details</p>
        </div>
        <form onSubmit={handleSubmit}>
          
        <div className='form-section'>
        <label className='section-label'>City</label>
        <div className="options">
        <label htmlFor="Damascus">
                <input
                  type="radio"
                  id="Damascus"
                  name="city"
                  value="Damascus"
                  checked={city === "Damascus"}
                  onChange={(e) => setCity(e.target.value)}
                  disabled
                />
                <span></span>
                Damascus
              </label>

              <label htmlFor="Aleppo">
                <input
                  type="radio"
                  id="Aleppo"
                  name="city"
                  value="Aleppo"
                  checked={city === "Aleppo"}
                  onChange={(e) => setCity(e.target.value)}
                  disabled
                />
                <span></span>
                Aleppo
              </label>
              <label htmlFor="Homs" >
                    <input type="radio" id="Homs" name="city" value="Homs"   checked={city === "Homs"}  disabled
                   onChange={(e) => setCity(e.target.value)}/>
                    <span></span> 
                     Homs
                    </label> 

                    <label htmlFor="Latakia" >
                    <input type="radio" id="Latakia" name="city" value="Latakia"  checked={city === "Latakia"} onChange={(e) => setCity(e.target.value)} disabled />
                    <span></span> 
                     Latakia
                     </label> 

                     <label htmlFor="Hama" >
                    <input type="radio" id="Hama" name="city" value="Hama" checked={city === "Hama"}onChange={(e) => setCity(e.target.value)} disabled />
                    <span></span> 
                    Hama

                    </label> 
                    <label htmlFor="Raqqa" >
                    <input type="radio" id="Raqqa" name="city" value="Raqqa"checked={city === "Raqqa"} onChange={(e) => setCity(e.target.value)} disabled />
                    <span></span> 
                    Raqqa
                    </label> 

                    <label htmlFor="Deir ez-Zor" >
                    <input type="radio" id="Deir ez-Zor" name="city" value="Deir ez-Zor"checked={city === "Deir ez-Zor"} onChange={(e) => setCity(e.target.value)}  disabled/>
                    <span></span> 
                    Deir ez-Zor
                    </label> 

                    <label htmlFor="Al-Hasakah" >
                    <input type="radio" id="Al-Hasakah" name="city" value="Al-Hasakah" checked={city === "Al-Hasakah"}onChange={(e) => setCity(e.target.value)} disabled />
                    <span></span> 
                    Al-Hasakah
                    </label> 

                    <label htmlFor="Daraa" >
                    <input type="radio" id="Daraa" name="city" value="Daraa" checked={city === "Daraa"}onChange={(e) => setCity(e.target.value)}  disabled/>
                    <span></span> 
                    Daraa
                    </label> 
               
                <div className="div-label">
                <label htmlFor="Tartus" >
                <input type="radio" id="Tartus" name="city" value="Tartus" checked={city === "Tartus"}onChange={(e) => setCity(e.target.value)}  disabled/>
                <span></span> 
                Tartus
                </label> 

                <label htmlFor="Idlib" >
                <input type="radio" id="Idlib" name="city" value="Idlib" checked={city === "Idlib"}onChange={(e) => setCity(e.target.value)}  disabled/>
                <span></span> 
                Idlib
                </label> 

                <label htmlFor="Al-Qamishli" >
                <input type="radio" id="Al-Qamishli" name="city" value="Al-Qamishli"checked={city === "Al-Qamishli"}  onChange={(e) => setCity(e.target.value)} disabled/>
                <span></span> 
                Al Qamishli
                </label> 

                <label htmlFor="Al-Qunaytirah" >
                <input type="radio" id="Al-Qunaytirah" name="city" value="Al-Qunaytirah" checked={city === "Al-Qunaytirah"}onChange={(e) => setCity(e.target.value)}  disabled/>
                <span></span> 
                Al Qunaytirah
                </label> 

                <label htmlFor="Al-Suwayda" >
                <input type="radio" id="Al-Suwayda" name="city" value="Al-Suwayda" checked={city === "Al-Suwayda"} onChange={(e) => setCity(e.target.value)} disabled/>
                <span></span> 
                Al-Suwayda
                </label>        
                 </div>
                 </div>
                 </div>
                 <div className="form-section">
            <label className='section-label'>Category</label>
            <div className="options">
              {["Mountain", "Beach", "Forest", "Antiquities", "Restaurants", "Hotels", "Transportation"].map(categoryName => (
                <label key={categoryName} htmlFor={categoryName}>
                  <input
                    type="radio"
                    id={categoryName}
                    name="category"
                    value={categoryName}
                    checked={category === categoryName}
                    onChange={() => setCategory(categoryName)}
                    disabled
                  />
                  <span></span>
                  {categoryName}
                </label>
              ))}
            </div>
          </div>
          <div className='form-group'>
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
            <label className="label-form">Current Images</label>
            <div className="image-container">
              {images.map((image) => (
                <div key={image.image_id} className="image-wrapper">
                  <img src={`data:image/jpeg;base64,${image.image}`} alt={`Preview ${image.image_id}`} />
                  <button type="button" className="delete-button" onClick={() => handleImageDelete(image.image_id)}>
                    <FontAwesomeIcon icon={faTrash} className="icon" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="label-form">Upload New Images</label>
            <div className="image-container">
              {uploadedImages.map((image, index) => (
                <div key={index} className="image-wrapper">
                  <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                  <button type="button" className="delete-button" onClick={() => handleImageDeleteLocal(index)} >
                    <FontAwesomeIcon icon={faTrash} className="icon" />
                  </button>
                </div>
              ))}
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

          <button type="submit" className="add-button">Submit</button>
        </form>
      </div>
    </div>
  );
}
