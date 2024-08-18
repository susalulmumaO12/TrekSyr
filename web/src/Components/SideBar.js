import React, { useState } from 'react';

function SideBar({ onSelectCity }) {
    const [selectedValue, setSelectedValue] = useState('');

    const cityMapping = {
        'Damascus': 1,
        'Aleppo': 2,
        'Homs': 3,
        'Latakia': 4,
        'Hama': 5,
        'Raqqa': 6,
        'Deir ez-Zor': 7,
        'Al-Hasakah': 8,
        'Daraa': 9,
        'Tartus': 10,
        'Idlib': 11,
        'Al Qamishli': 12,
        'Al Qunaytirah': 13,
        'Al-Suwayda': 14,
    };

    const saveValue = (value) => {
        setSelectedValue(value);
        onSelectCity(cityMapping[value] || 0); 
        console.log('Selected value:', value);
    };

    const options = Object.keys(cityMapping).map((city) => ({ value: city, label: city }));

    return (
        <div className='side-bar'>
            <ul>
                {options.map((option) => (
                    <li
                        key={option.value}
                        onClick={() => saveValue(option.value)}
                        className={selectedValue === option.value ? 'selected' : ''}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SideBar;
