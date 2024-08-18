import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faFlag } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import ArrowIcon from "./icons/ArrowIcons";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useBaseUrl } from './BaseUrlContext';
import { Margin } from "@mui/icons-material";

function SeeDetails() {
  const { tripId } = useParams();
  const [tripDetails, setTripDetails] = useState([]);
  const [tripPath, setTripPath] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickedElements, setClickedElements] = useState({}); 
  const baseURL = useBaseUrl();

  useEffect(() => {
    const fetchTripDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found");
        return;
      }
      try {
        const response = await axios.get(`${baseURL}/api/guide/tripDetails/${tripId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTripDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error("Error fetching trip details:", error);
        toast.error("Failed to fetch trip details.");
      }
    };

    const fetchTripPath = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/guide/tripPath/${tripId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTripPath(response.data);
      } catch (error) {
        console.error("Error fetching trip path:", error);
        toast.error("Failed to fetch trip path.");
      }
    };

    fetchTripDetails();
    fetchTripPath();
  }, [tripId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const decodeBuffer = (buffer) => {
    if (buffer?.type === "Buffer" && Array.isArray(buffer.data)) {
      return String.fromCharCode(...buffer.data);
    }
    return "";
  };

  const isValidString = (value) =>
    typeof value === "string" || typeof value === "number";
  const tourists = decodeBuffer(tripDetails.tourists);

  const handleIconClick = (path) => {
    if (clickedElements[path.trip_path_id]) return; 

    setClickedElements((prev) => ({
      ...prev,
      [path.trip_path_id]: true, 
    }));

    // اشعار بدال الرسالة
    toast.info(`Place: ${path.place}\nTime: ${path.time}\nStatus: ${path.visited ? "Visited" : "Planned"}`);
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="arrow-trip" >
        <ArrowIcon />
        <div className="trip-details" style={{ marginLeft: "51px" }}>
        <img
            src={`data:image/jpeg;base64,${tripDetails.image}`}
            alt={tripDetails.name}
          />
          <div className="text">
            {isValidString(tripDetails.name) && <h2>{tripDetails.name}</h2>}
          </div>
        </div>
      </div>
      <div className="vl"></div>
      <div className="title-flag">
        <FontAwesomeIcon icon={faFlag} className="flag" />
        <h2>Tour Details</h2>
      </div>
      <div className="tour-details">
        <p>Price:</p>
        <p className="another">{tripDetails.price} SP</p>
        <p>Start Date:</p>
        <p className="another">{tripDetails.f_starting_time}</p>
        <p>End Date:</p>
        <p className="another">{tripDetails.f_ending_time}</p>
        <p>Gathering place:</p>
        <p className="another">{tripDetails.gathering_place}</p>
      </div>
      <div className="tour-details2">
        <p>Cancel Booking Date:</p>
        <p className="another">{tripDetails.closing_date}</p>
        <p>Number of Tourists:</p>
        <p className="another">{tourists}</p>
      </div>
      <div className="title-flag1">
        <h2>Tour Path</h2>
      </div>
      <VerticalTimeline>
        {tripPath.map((path) => (
          <VerticalTimelineElement
            key={path.trip_path_id}
            className="vertical-timeline-element--work"
            contentStyle={{ background: path.visited ? "#4CAF50" : "#e14eca", color: "#fff", width: '150px' }}
            contentArrowStyle={{ borderRight: "7px solid #4CAF50" }}
            date={path.formatted_time}
            iconStyle={{
              background: clickedElements[path.trip_path_id] ? "#4CAF50" : "#808080", 
              cursor: clickedElements[path.trip_path_id] ? "default" : "pointer", 
            }}
            icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
            position="right"
            iconOnClick={() => handleIconClick(path)} 
          >
            <h3 className="vertical-timeline-element-title">{path.place}</h3>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

export default SeeDetails;
