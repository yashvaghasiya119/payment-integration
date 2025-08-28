// CarCard.js
import React from 'react';
import "./css/carcard.css"
export function CarCard ({ car }) {

  return (
    <div className="car-card">
      <h3 className="car-name">{car.name}</h3>
      <p className="car-company">{car.company}</p>
      <p className="car-model">Model: {car.model}</p>
      <p className="car-price">Price: ${car.price.toLocaleString()}</p>
    </div>
  );
};

