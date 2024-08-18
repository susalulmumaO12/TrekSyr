import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React from "react";

function Search() {
  return (
    <div>
      <div className="search-bar">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
        <input
          type="text"
          placeholder="find a place.."
          className="search-input"
        />
      </div>
    </div>
  );
}

export default Search;
