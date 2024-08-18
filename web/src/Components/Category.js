import React, { useState } from "react";
// import popular_photo from "../Assets/popular.png";
import mountain_photo from "../Assets/mountain.png";
import beach_photo from "../Assets/beach.png";
import forest_photo from "../Assets/pine-tree .png";
import antiquities_photo from "../Assets/Antiquities.png";

function Category({ onSelectCategory }) {
    const [selectedValue, setSelectedValue] = useState("");

    const categoryMapping = {
        'Mountain': 1,
        'Beach': 2,
        'Forest': 3,
        'Antiquities': 4,
        'Restaurants': 5,
        'Hotels':6,
        'Transportation':7,
    };

    const saveValue = (value) => {
        setSelectedValue(value);
        onSelectCategory(categoryMapping[value] || 0);  
        console.log("Selected value:", value);
    };

    const options = [
        { value: "Mountain", label: "Mountain", imgSrc: mountain_photo },
        { value: "Beach", label: "Beach", imgSrc: beach_photo },
        { value: "Forest", label: "Forest", imgSrc: forest_photo },
        { value: "Antiquities", label: "Antiquities", imgSrc: antiquities_photo },
        { value: "Restaurants", label: "Restaurants", imgSrc: antiquities_photo },
        { value: "Hotels", label: "Hotels", imgSrc: antiquities_photo },
        { value: "Transportation", label: "Transportation", imgSrc: antiquities_photo },

    ];

    return (
        <div className="category">
            <ul>
                {options.map((option) => (
                    <li
                        key={option.value}
                        onClick={() => saveValue(option.value)}
                        className={selectedValue === option.value ? "selected" : ""}
                    >
                        <img src={option.imgSrc} alt={option.label} className="icon" />
                        <span>{option.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Category;
