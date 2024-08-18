
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faCalendarDays, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./Header";
import axios from "axios";
import { useBaseUrl } from './BaseUrlContext';
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function RepostTrip() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [cancelDate, setCancelDate] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [price, setPrice] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [information, setInformation] = useState("");
  const [gatheringPlace, setGatheringPlace] = useState("");
  const [touristNumber, setTouristNumber] = useState("");
  const [tripPath, setTripPath] = useState([]);

  const guideId = localStorage.getItem("user_id");

  const baseURL = useBaseUrl();
  const { tripId } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseURL}/api/mutual/placesNames`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200 && Array.isArray(response.data)) {
          setPlaces(response.data);
        } else {
          console.error("Invalid data format: expected an array");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            console.error("Unauthorized: invalid token");
          } else if (error.response.status === 404) {
            console.error("No places found");
          } else {
            console.error("Error fetching places:", error.response.data);
          }
        } else {
          console.error("Error fetching places:", error.message);
        }
      }
    };
    const fetchTripDetails = async () => {
      try {
        if (!tripId) {
          console.log("No Trip ID provided.");
          return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No Token Found");
          return;
        }
        const tripDetailsResponse = await axios.get(`${baseURL}/api/guide/tripDetails/${tripId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const tripData = tripDetailsResponse.data;
          setPlaceName(tripData.name);
          setInformation(tripData.info);
          setPrice(tripData.price);
          setTouristNumber(tripData.capacity);
          setStartDate(new Date(tripData.starting_time));
          setEndDate(new Date(tripData.ending_time));
          setGatheringPlace(tripData.gathering_place);
          setCancelDate(new Date(tripData.closing_date));
         
          const response = await axios.get(`${baseURL}/api/guide/tripPath/${tripId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
  
          const tripPathData = response.data;
          console.log(tripPathData);
          const prepopulatedPlaces = tripPathData.map((path) => ({
            name: path.place,
            time: new Date(path.time),
          }));
          setSelectedPlaces(prepopulatedPlaces);
          setTripPath(tripPathData);
        } catch (error) {
          console.error("Error fetching trip details or trip path:", error);
          toast.error("Failed to fetch trip details or trip path.");
        }
      };
      fetchPlaces();

      fetchTripDetails();
    }, [tripId, baseURL]);
  
    const addPlace = (index) => {
      const newPlaces = [...selectedPlaces];
      newPlaces.splice(index + 1, 0, { name: "", time: null });
      setSelectedPlaces(newPlaces);
    };
  
    const removePlace = (index) => {
      setSelectedPlaces(selectedPlaces.filter((_, i) => i !== index));
    };
  
    const handlePlaceChange = (index, field, value) => {
      const newPlaces = [...selectedPlaces];
      newPlaces[index][field] = value;
      setSelectedPlaces(newPlaces);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem("token");
        const requestBody = {
          guide_id: guideId,
          name: placeName,
          price: price,
          info: information,
          starting_time: startDate ? startDate.toISOString() : null,
          ending_time: endDate ? endDate.toISOString() : null,
          gathering_place: gatheringPlace,
          capacity: touristNumber,
          closing_date: cancelDate ? cancelDate.toISOString() : null,
          places: selectedPlaces.map((place) => ({
            place_name: place.name,
            time: place.time ? place.time.toISOString() : null,
          })),
        };
  
        const response = await axios.post(`${baseURL}/api/guide/addTrip`, requestBody, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 201) {
          toast.success("Trip added successfully!");
        } else {
          console.error("Unexpected status code:", response.status);
          toast.error("Failed to add trip.");
        }
      } catch (error) {
        console.error("Error submitting trip:", error);
        if (error.response && error.response.status === 400) {
          toast.error("Bad Request: " + (error.response.data.message || error.response.data.error || "Bad Request"));
        } else if (error.response && error.response.status === 401) {
          toast.error("Unauthorized: Invalid token.");
        } else if (error.response && error.response.status === 404) {
          toast.error("Not Found: No data found.");
        } else {
          toast.error("unexpected erroe");
        }
      }
    };
  
    const calculateMarginTop = () => {
      const baseMargin = 20;
      const additionalMargin = selectedPlaces.length * (-59);
      return baseMargin + additionalMargin + 'px';
    };
  
    return (
      <div className="dashboard">
        <Header />
        <div className="vl"></div>
        <form className="trip-form" onSubmit={handleSubmit}>
          <div className="container">
            <div className="add-form">
              <div className="title-flag">
                <FontAwesomeIcon icon={faFlag} className="flag" />
                <h2>Tour Details</h2>
              </div>
  
              <label htmlFor="placeName">Name</label>
              <input
                className="input-style"
                type="text"
                id="placeName"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
              />
  
              <label htmlFor="price">Price</label>
              <input
                className="input-style"
                type="text"
                id="price"
                placeholder="sp"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
  
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="information"
                className="input-style1"
                value={information}
                onChange={(e) => setInformation(e.target.value)}
              ></textarea>
  
              <label htmlFor="startDate">Starting Date & Time</label>
              <div className="date-picker-container">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="starting-date-input"
                  dateFormat="MM/dd/yyyy HH:mm"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  calendarClassName="custom-calendar"
                  id="startDate"
                />
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="calendar-icon"
                  onClick={() =>
                    document.querySelector(".starting-date-input").focus()
                  }
                />
              </div>
  
              <label htmlFor="endDate">Ending Date & Time</label>
              <div className="date-picker-container">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="ending-date-input"
                  dateFormat="MM/dd/yyyy HH:mm"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  calendarClassName="custom-calendar"
                  id="endDate"
                />
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="calendar-icon"
                  onClick={() =>
                    document.querySelector(".ending-date-input").focus()
                  }
                />
              </div>
  
              <label htmlFor="gatheringPlace">Gathering Place</label>
              <input
                className="input-style"
                type="text"
                id="gatheringPlace"
                value={gatheringPlace}
                onChange={(e) => setGatheringPlace(e.target.value)}
              />
            </div>
  
            <div className="add-form2">
              <label htmlFor="touristNumber">Number of Tourists</label>
              <input
                className="input-style"
                type="text"
                id="touristNumber"
                value={touristNumber}
                onChange={(e) => setTouristNumber(e.target.value)}
              />
  
              <label htmlFor="cancelDate">Cancel Booking Date & Time</label>
              <div className="date-picker-container">
                <DatePicker
                  selected={cancelDate}
                  onChange={(date) => setCancelDate(date)}
                  className="cancel-date-input"
                  dateFormat="MM/dd/yyyy HH:mm"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  calendarClassName="custom-calendar"
                  id="cancelDate"
                />
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="calendar-icon"
                  onClick={() =>
                    document.querySelector(".cancel-date-input").focus()
                  }
                />
              </div>
  
              <div className="title-flag">
                <FontAwesomeIcon icon={faMapLocationDot} className="flag" />
                <h2>Tour Path</h2>
              </div>
  
              <div className="dropdown-container">
                {selectedPlaces.map((place, index) => (
                  <div key={index} className="option-input-container">
                    <div className="label-withoutstar">
                      <label htmlFor={`place-name-${index}`}>Place</label>
                      <select
                        id={`place-name-${index}`}
                        value={place.name}
                        onChange={(e) => handlePlaceChange(index, "name", e.target.value)}
                      >
                        <option value="">Select a place</option>
                        {places.map((placeName) => (
                          <option key={placeName} value={placeName}>
                            {placeName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="label-withoutstar">
                      <label htmlFor={`time-${index}`}>Date & Time</label>
                      <DatePicker
                        selected={place.time}
                        onChange={(date) => handlePlaceChange(index, "time", date)}
                        className="place-date-input"
                        dateFormat="MM/dd/yyyy HH:mm"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        calendarClassName="custom-calendar"
                        id={`time-${index}`}
                      />
                    </div>
  
                    <button
                      onClick={() => addPlace(index)}
                      className="dropdown-button"
                      type="button"
                    >
                      +
                    </button>
  
                    {index > 0 && (
                      <button
                        onClick={() => removePlace(index)}
                        className="remove-button"
                        type="button"
                      >
                        -
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          <div className="submit-container" style={{ marginTop: calculateMarginTop() }}>
            <button type="submit" className="submit-details">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  export default RepostTrip;
  
