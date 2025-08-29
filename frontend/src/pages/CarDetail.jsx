// CarDetail.js
import React, { useEffect, useState } from 'react';
import './css/CarDetail.css'; // Importing the CSS for styling
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

export function CarDetail() {
  const [car, setCar] = useState()
  let { id } = useParams()
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_ID); 
  console.log("🚀 ~ CarDetail ~ id:", id)

  async function getCarData() {
    const response = await fetch("http://localhost:3000/car")
    const data = await response.json()  
    const filterCar = await data.filter((car)=>car.id==id)
    setCar(filterCar[0])
    console.log("🚀 ~ getCarData ~ data:", filterCar)
  }

  useEffect(() => {
    getCarData()
  }, [])

  async function handleBookNow(){
    const res = await fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({price:car.price,name:car.name})
    });
    const { id } = await res.json();
    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId: id });
  }

  return <>
  {
    car && <div className="car-detail-container">
      <h2 className="car-name">{car.name}</h2>
      <p className="car-company"><strong>Company:</strong> {car.company}</p>
      <p className="car-model"><strong>Model:</strong> {car.model}</p>
      <p className="car-price"><strong>Price:</strong> ${car.price}</p>
      <div className="car-image">
        <img src={`https://via.placeholder.com/400x300?text=${car.name}`} alt={car.name} />
      </div>
      <p className="car-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.</p>
      <button onClick={handleBookNow} >Book Now</button>
    </div>
    
  }
  </>
};
