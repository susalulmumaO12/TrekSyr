import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt,faPen, faStar as faStarEmpty } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Card({ img, city, name, rating, place_id }) {
    const ratingNumber = isNaN(parseFloat(rating)) ? 0 : Math.min(5, Math.max(0, parseFloat(rating)));

    const fullStars = Math.floor(ratingNumber);
    const halfStar = ratingNumber % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        
        <div className="trip">
            <img src={img} alt={name} />
            <div className="text">
                <h3>{city}</h3>
                <h2>{name}</h2>
                {[...Array(fullStars)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="icon1" />
                ))}
                {halfStar && <FontAwesomeIcon key="half-star" icon={faStarHalfAlt} className="icon1" />}
                {[...Array(emptyStars)].map((_, index) => (
                    <FontAwesomeIcon key={index + fullStars + 1} icon={faStarEmpty} className="icon-empty" />
                ))}
                  <Link to={`/edit-place/${place_id}`} id="edit-icon">
                      <FontAwesomeIcon icon={faPen} />
                  </Link>
                <Link to={`/see-place/${place_id}`}>See Details</Link>
            </div>
        </div>
    );
}
