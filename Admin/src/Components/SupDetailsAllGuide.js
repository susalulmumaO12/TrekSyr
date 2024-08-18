import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faFile ,faTrash,faBan} from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import ArrowIcon from "./icons/ArrowIcons";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { useBaseUrl } from './BaseUrlContext';

function SupDetailsAllGuide() {
  const { guideId } = useParams();
  const [guideDetails, setGuideDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const baseURL = useBaseUrl();

  const handleAccept = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found");
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/admin/acceptGuide`, {
        user_id: guideId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Guide validated successfully!");
      }
    } catch (error) {
      console.error('Error accepting guide:', error);
      const status = error.response?.status;
      if (status === 400) {
        toast.error("User is not a guide");
      } else if (status === 401) {
        toast.error("Unauthorized");
      } else if (status === 404) {
        toast.error("User Not Found");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleReject = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found");
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/admin/rejectGuide`, {
        user_id: guideId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Guide rejected successfully!");
      }
    } catch (error) {
      console.error('Error rejecting guide:', error);
      const status = error.response?.status;
      if (status === 400) {
        toast.error("User is not a guide");
      } else if (status === 401) {
        toast.error("Unauthorized");
      } else if (status === 404) {
        toast.error("User Not Found");
      } else if (status === 500) {
        toast.error("Failed to update user validation status");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    const fetchGuideDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.get(`${baseURL}/api/admin/getGuide/${guideId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGuideDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchGuideDetails();
  }, [guideId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="arrow-trip">
        <ArrowIcon />
        <div className="trip-details">
          <div className="image-div">
            <img src={`data:image/jpeg;base64,${guideDetails?.p_image}`} alt="Guide" />
          </div>
          <div className="text">
            <h2>{`${guideDetails.first_name} ${guideDetails.last_name}`}</h2>
          </div>
        </div>
      </div>
      <div className="guide-details">
        <ul>
          <li>
            <FontAwesomeIcon icon={faPhone} className="icon" />{guideDetails.phone_number}
          </li>
          <li>
            <FontAwesomeIcon icon={faEnvelope} className="icon" />{guideDetails.email}
          </li>
          <li>
            <FontAwesomeIcon icon={faFile} className="icon" />Identification papers
          </li>
          <img src={`data:image/jpeg;base64,${guideDetails.image}`} alt="License" onClick={toggleModal} className="clickable-image" />
        </ul>
      </div>
      <div className="actions details-action">
      <button className="delaction">
        <FontAwesomeIcon icon={faTrash} /> Delete account
      </button>
      <button className="block-button">
        <FontAwesomeIcon icon={faBan} /> Block
      </button>
      </div>
      {isModalOpen && (
        <div className="modal" onClick={toggleModal}>
          <div className="modal-content">
            <img
              src={`data:image/jpeg;base64,${guideDetails.image}`}
              alt="License"
              className="modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SupDetailsAllGuide;
