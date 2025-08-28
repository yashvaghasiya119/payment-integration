// CarList.js
import React, { useEffect } from 'react';
import { useState } from 'react';
import { CarCard } from './carcard';

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
        <CarCard key={index} car={car} />
      ))}
    </div>
  );
};


