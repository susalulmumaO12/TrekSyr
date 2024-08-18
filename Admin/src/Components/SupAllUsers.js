import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash,faBan } from "@fortawesome/free-solid-svg-icons";
export default function SupAllUsers (props){
  const { img, guideName,guideId}= props; 
  return(
    <div className="item">
    <div className="image-div">
      {img ? (
        <img src={img} alt="Guide" />
      ) : (
        <p>No image available</p>
      )}
    </div>
    <div className="details">
      <div className="text">
        <h2>{guideName}</h2>
      </div>
      <div className="actions" id="del-button">
      <button className="delete-button">
        <FontAwesomeIcon icon={faTrash} /> Delete account
      </button>
      <button className="block-button">
        <FontAwesomeIcon icon={faBan} /> Block
      </button>
      <Link to={`/see-details/${guideId}`}>See Details</Link>
      </div>
    </div>
  </div>
);
}
