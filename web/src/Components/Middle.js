import React, { useState, useEffect } from "react";
import Card from './Card';
import Search from './Search';
import axios from 'axios';
import { toast } from "react-toastify";
import { useBaseUrl } from './BaseUrlContext';

export default function Middle({ selectedCity, selectedCategory }) {
    const [places, setPlaces] = useState([]);
    const [noPlacesFound, setNoPlacesFound] = useState(false);
    
    const baseURL = useBaseUrl();

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const token = localStorage.getItem("token");
                
                const cityId = selectedCity ? selectedCity : 0;
                const catId = selectedCategory ? selectedCategory : 0;
                
                const response = await axios.get(`${baseURL}/api/guide/getPlaces/${cityId}/${catId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    if (response.data.length === 0) {
                        setNoPlacesFound(true);
                    } else {
                        setPlaces(response.data);
                        setNoPlacesFound(false);
                    }
                }
            } catch (error) {
                console.error("Error fetching places:", error);
                if (error.response) {
                    if (error.response.status === 401) {
                        toast.error("Unauthorized");
                    } else if (error.response.status === 404) {
                        toast.error("No places found");
                        setNoPlacesFound(true);
                    } else {
                        toast.error("An error occurred while fetching places");
                    }
                } else {
                    toast.error("Network error or server is down");
                }
            }
        };

        fetchPlaces();
    }, [selectedCity, selectedCategory, baseURL]);

    const dataShow = places.map((el) => (
        <Card
            key={el.place_id}
            img={`data:image/png;base64,${el.image}`}
            city={el.city}
            name={el.name}
            rating={el.average_rating}
            place_id={el.place_id}
        />
    ));

    return (
        <div>
        
            <div className="trips">
                {noPlacesFound ? (
                    <p>No places found for the selected city and category.</p>
                ) : (
                    dataShow
                )}
            </div>
        </div>
    );
}
