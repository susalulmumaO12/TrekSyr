import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useBaseUrl } from './BaseUrlContext';

const FinishedTrips = () => {
  const [trips, setTrips] = useState([]);
  const [filterByDur, setFilterByDur] = useState(false);

  const token = localStorage.getItem('token');
  const guideId = localStorage.getItem('user_id');
  const baseURL = useBaseUrl();

  const fetchTrips = async (guideId, byDur, token) => {
    try {
      const response = await axios.get(`${baseURL}/api/guide/finishedTrips/${guideId}/${byDur}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('Unauthorized: Invalid token');
      } else if (error.response?.status === 404) {
        console.error('No finished trips found for this guide.');
      } else {
        console.error('Internal server error: ', error.message);
      }
      return [];
    }
  };

  const getTrips = async (byDur) => {
    const fetchedTrips = await fetchTrips(guideId, byDur, token);
    console.log('Fetched Trips:', fetchedTrips);
    if (Array.isArray(fetchedTrips)) {
      setTrips(fetchedTrips);
    }
  };

  useEffect(() => {
    getTrips(filterByDur ? 1 : 0);
  }, [filterByDur]);

  const handleFilterChange = (event) => {
    const value = event.target.value === "duration";
    setFilterByDur(value);
  };

  const decodeBuffer = (buffer) => {
    if (buffer?.type === 'Buffer' && Array.isArray(buffer.data)) {
      return String.fromCharCode(...buffer.data);
    }
    return 'N/A';
  };

  const isValidString = (value) => typeof value === 'string';

  return (
    <div className='dashboard'>
      <Header />
      <div className="filter-dropdown">
        <select onChange={handleFilterChange}>
          <option value="duration">Filter by Duration</option>
          <option value="date">Filter by Date</option>
        </select>
      </div>

      <div className="list-view">
        {trips.map(trip => {
          const tourists = decodeBuffer(trip.tourists);
          return (
            <div className="item" key={trip.trip_id}>
              {isValidString(trip.image) && (
                <img src={`data:image/jpeg;base64,${trip.image}`} alt="" />
              )}
              <div className="details">
                <div className="text">
                  {isValidString(trip.name) && <h2>{trip.name}</h2>}
                  {isValidString(trip.starting_time) && <p>{trip.starting_time}</p>}
                  {trip.duration != null && <p>{trip.duration} </p>}
                </div>
                <div className="status">
                  <Link to={`/edit-trip/${trip.trip_id}`}>
                    <span className="accepted">
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                  </Link>
                  {isValidString(tourists) && <span className="count"> {tourists}</span>}
                  {trip.price != null && <span className="count"> {trip.price} sp</span>}
                </div>
                <div className="actions">
                  <button className="delete1">Delete</button>
                  <Link  to={`/repost/${trip.trip_id}`}>
                  <button className="repost" >Repost</button>
                  </Link>                
                    {trip.trip_id && <Link to={`/see-details/${trip.trip_id}`} className='seedetails-link'>See Details</Link>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FinishedTrips;
