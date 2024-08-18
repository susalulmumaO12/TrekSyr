import React, { useState, useEffect } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import Category from './Category';
import Middle from './Middle';

function Home() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');



  const handleSelectCity = (city) => {
    setSelectedCity(city);
  };

  const handleSelectCategory = (Category) => {
    setSelectedCategory(Category);
  };

  return (
    <div className='dashboard'>
      <Header />
      <SideBar onSelectCity={handleSelectCity} />
      <Category onSelectCategory={handleSelectCategory} />
      <Middle selectedCity={selectedCity} selectedCategory={selectedCategory} />
    </div>
  );
}

export default Home;
