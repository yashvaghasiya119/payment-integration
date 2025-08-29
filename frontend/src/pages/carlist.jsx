// CarList.js
import React, { useEffect } from 'react';
import { useState } from 'react';
import { CarCard } from './carcard';
import { NavLink } from 'react-router-dom';

export function CarList () {
    const [carData, setCarData] = useState([])

    async function getCarData(){
        const response = await fetch("http://localhost:3000/car")
        const data = await response.json()
        setCarData(data)
    }

    useEffect(()=>{
        getCarData()
    },[])

  return (
    <div className="car-list">
      {carData && carData.map((car, index) => (
        <NavLink to={`/carlist/${car.id}`}>
          <CarCard key={index} car={car} />
        </NavLink>
      ))}
    </div>
  );
};


