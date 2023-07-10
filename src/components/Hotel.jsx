import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../components/Hotel.module.css';

function Hotel({ hotel }) {
  const navigate = useNavigate();
  const [bookingForm, setBookingForm] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  function handleBooking() {
    setBookingForm(true);
  }

  function handleCancel() {
    setName('');
    setAddress('');
    setEmail('');
    setArrivalDate('');
    setDepartureDate('');
    setBookingForm(false);
  }

  function calculateTotalStayNights() {
    if (arrivalDate && departureDate) {
      const arrival = new Date(arrivalDate);
      const departure = new Date(departureDate);
      const timeDiff = departure.getTime() - arrival.getTime();
      const totalNights = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
      return totalNights;
    }
    return 0; // Return 0 if arrival or departure date is missing
  }

  function handleSubmit(e) {
    e.preventDefault();
    const totalNights = calculateTotalStayNights();
    const newTraveler = {
      name: name,
      hotelName: hotel.name,
      location: hotel.location,
      totalNights: totalNights,
      totalPriceWithTax: totalNights * hotel.price * 1.12
    };
    fetch('http://localhost:8081/summary/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTraveler)
    })
      .then(response => {
        if (response.ok) {
          setName('');
          setAddress('');
          setEmail('');
          setArrivalDate('');
          setDepartureDate('');
          setBookingForm(false);
          navigate('/confirm');
        } else {
          throw new Error('Error saving summary');
        }
      })
      .catch(error => {
        console.error('Error saving summary:', error);
      });
  }

  return (
    <div className={styles.container}>
      <li>
        <h2>
          <Link to={`/${hotel.id}`}>{hotel.name}</Link>
        </h2>
        <p className={styles.desc}>{hotel.shortDesc}</p>
        <div className={styles.main}>
          <img src={hotel.image} alt="hotelImage" />
          <div>
            <p>
              <b>Location:</b> {hotel.location}
            </p>
            <p>
              <b>Experience:</b> {hotel.experience}
            </p>
            <p>
              <b>Pool:</b> {hotel.pool ? 'Yes' : 'No'}
            </p>
            <p>
              <b>price per night:</b> RS {hotel.price.toFixed(2)}
            </p>
          </div>
          <button onClick={handleBooking}>Book Now</button>
        </div>
      </li>
      {bookingForm && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Booking Form</h2>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              id="name"
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address: </label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              id="address"
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              id="email"
              required
            />
          </div>
          <div>
            <label htmlFor="arrivalDate">Arrival Date: </label>
            <input
              type="date"
              value={arrivalDate}
              onChange={e => setArrivalDate(e.target.value)}
              id="arrivalDate"
              required
            />
          </div>
          <div>
            <label htmlFor="departureDate">Departure Date: </label>
            <input
              type="date"
              value={departureDate}
              onChange={e => setDepartureDate(e.target.value)}
              id="departureDate"
              required
            />
          </div>
          <div>
            <label htmlFor="stay">Total Nights: </label>
            <input
              type="text"
              value={calculateTotalStayNights()}
              readOnly
              id="stay"
            />
          </div>
          {calculateTotalStayNights() > 0 && (
            <>
              <div>
                <label htmlFor="totalPrice">Total Price: </label>
                <input
                  type="text"
                  value={(calculateTotalStayNights() * hotel.price * 1.12).toFixed(2)}
                  readOnly
                  id="totalPrice"
                />
              </div>
              <div>
                <label htmlFor="tax">Tax: </label>
                <input
                  type="text"
                  value={(calculateTotalStayNights() * hotel.price * 0.12).toFixed(2)}
                  readOnly
                  id="tax"
                />
              </div>
            </>
          )}
          <div className={styles.buttonWrapper}>
            <button type="submit">Book My Stay</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Hotel;
