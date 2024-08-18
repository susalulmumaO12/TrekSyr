import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from "@fortawesome/free-solid-svg-icons";
import { useBaseUrl } from './BaseUrlContext';
import { toast } from 'react-toastify';

const SeeDetails = () => {
    const { place_id } = useParams();
    const [slideImages, setSlideImages] = useState([]);
    const [placeDetails, setPlaceDetails] = useState(null);
    const [error, setError] = useState(null);
    const [slideIndex, setSlideIndex] = useState(1);
    const [isActive, setIsActive] = useState(false);  
    const baseURL = useBaseUrl();

    useEffect(() => {
        const fetchPlaceDetails = async () => {
            if (!place_id) {
                toast.error("Invalid place ID");
                console.log("No place ID provided.");
                return;
            }

            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No token found");
                }

                console.log(`Fetching place details for place_id: ${place_id}`);

                const placeResponse = await axios.get(`${baseURL}/api/mutual/placeDetails/${place_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Place details response:", placeResponse);

                if (placeResponse.status === 200) {
                    setPlaceDetails(placeResponse.data);
                } else {
                    setError(`Unexpected status code: ${placeResponse.status}`);
                }

                const imageResponse = await axios.get(`${baseURL}/api/mutual/placeImages/${place_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Image response:", imageResponse);

                if (imageResponse.status === 200) {
                    const images = imageResponse.data.map(imgData => `data:image/jpeg;base64,${imgData.image}`);
                    setSlideImages(images);
                } else {
                    setError(`Unexpected status code: ${imageResponse.status}`);
                }

                const activeResponse = await axios.get(`${baseURL}/api/admin/isActive/${place_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (activeResponse.status === 200) {
                    setIsActive(activeResponse.data === "active");  
                    console.log(activeResponse.data);

                } else {
                    setError(`Unexpected status code: ${activeResponse.status}`);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data. Please try again later.");
            }
        };

        fetchPlaceDetails();
    }, [place_id]);

    useEffect(() => {
        if (slideImages.length > 0) {
            showSlides(slideIndex);
        }
    }, [slideIndex, slideImages]);

    const showSlides = (n) => {
        const slides = document.getElementsByClassName("mySlides");

        if (n > slides.length) { setSlideIndex(1); }
        if (n < 1) { setSlideIndex(slides.length); }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].style.display = "block";
        }
    };

    const plusSlides = (n) => {
        setSlideIndex(prevIndex => {
            const newIndex = prevIndex + n;
            showSlides(newIndex);
            return newIndex;
        });
    };

    const handleToggleActivation = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found");
            }
    
    
            const response = await axios.post(`${baseURL}/api/admin/activatePlace`, 
                { place_id: place_id }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);

    
            if (response.status === 200) {
                setIsActive(!isActive); 
                console.log(response.data);
                toast.success(response.data.message);

            } else {
                setError(`Unexpected status code: ${response.status}`);
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response && error.response.status === 400) {
                toast.error("There are trips booked in this place.");
            } else if (error.response && error.response.status === 401) {
                toast.error("Unauthorized. Please check your token.");
            } else {
                console.error("Error toggling activation:", error);
                toast.error("Failed to toggle activation. Please try again later.");
            }
        }
    };
    
    

    const rating = placeDetails?.average_rating; 
    const ratingNumber = isNaN(parseFloat(rating)) ? 0 : Math.min(5, Math.max(0, parseFloat(rating)));
    
    const fullStars = Math.floor(ratingNumber);
    const halfStar = ratingNumber % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="dashboard2">
            {error && <div className="error">{error}</div>}
            {placeDetails && (
                <div className="place-details">
                    <h2>{placeDetails.name}</h2>
                    <p>Description:</p>
                    <p className='another'>{placeDetails.description}</p>
                    <p>Address:</p>
                    <p className='another'> {placeDetails.address}</p>
                    <p>City:</p>
                    <p className='another'> {placeDetails.city}</p>
                    <p>Comment:<Link to={`/view-comment/${place_id}`}>view comment</Link></p>
                    <p className='another'> {placeDetails.comment_count}</p>
                    {[...Array(fullStars)].map((_, index) => (
                            <FontAwesomeIcon key={index} icon={faStar} className="icon1" />
                        ))}
                        {halfStar && <FontAwesomeIcon key="half-star" icon={faStarHalfAlt} className="icon1" />}
                        {[...Array(emptyStars)].map((_, index) => (
                            <FontAwesomeIcon key={index + fullStars + 1} icon={faStarEmpty} className="icon-empty" />
                        ))}

                    <button 
                        onClick={handleToggleActivation} 
                        className={`activation-button ${isActive ? 'active' : 'inactive'}`}>
                        {isActive ? "Deactivate Place" : "Activate Place"}
                    </button>

                </div>
            )}

            <div className="slideshow-container">
                {slideImages.length > 0 ? (
                    slideImages.map((image, index) => (
                        <div key={index} className="mySlides fade" style={{ display: slideIndex === index + 1 ? 'block' : 'none' }}>
                            <div className="numbertext">{index + 1} / {slideImages.length}</div>
                            <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                        </div>
                    ))
                ) : (
                    <div className="no-images">No images available</div>
                )}

                <Link className="prev" onClick={() => plusSlides(-1)}>❮</Link>
                <Link className="next" onClick={() => plusSlides(1)}>❯</Link>
            </div>
        </div>
    );
};

export default SeeDetails;
