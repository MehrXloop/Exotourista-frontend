import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from '../pages/HotelDetail.module.css'

function HotelDetail() {
    const [bookingForm, setBookingForm] = useState(false);
    const [hotel, setHotel] = useState({});

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [stayDays, setStayDays] = useState(0);






    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:8080/hotels/${id}`)
            .then((res) => res.json())
            .then((result) => {
                setHotel(result);
                console.log(result);
            }).catch((error) => {
                console.error("Error occurred while fetching:", error);
            });
    }, [id])

    function handleBack() {
        navigate("/");
    }
    function handleCancel() {
        setName('')
        setAddress('')
        setEmail('')
        setStayDays('')
        navigate("/");
    }
    function handleBooking() {
        setBookingForm(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newTraveler = {
            name: name,
            hotelName: hotel.name,
            location: hotel.location,
            totalNights: stayDays,
            totalPriceWithTax: stayDays * hotel.price * 1.12
        }
        fetch('http://localhost:8081/summary/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTraveler)
        })
            .then(response => {
                if (response.ok) {
                    setName('')
                    setAddress('')
                    setEmail('')
                    setStayDays('')
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
            <button onClick={handleBack} className={styles.return}>Return to result</button>
            <div >
                <div className={styles.containerImage}>
                    <img src={hotel.image} alt='' />
                </div>
                <h1>{hotel.name}</h1>
                <h2>About This Hotel: </h2>
                <p className={styles.longDesc}>{hotel.longDesc}</p>
                <p><b>Location:</b> {hotel.location}</p>
                <p><b>Experience:</b> {hotel.experience}</p>
                <p><b>Pool:</b> {hotel.pool ? "Yes" : "No"}</p>
                <p><b>price per night:</b> RS {hotel.price}</p>
                <button onClick={handleBooking}>Book Now</button>
            </div>


            {bookingForm &&
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h2>Booking Form</h2>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} id='name' required />
                    </div>
                    <div>
                        <label htmlFor="name">Address: </label>
                        <input type="address" value={address} onChange={e => setAddress(e.target.value)} id='address' required />
                    </div>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} id='email' required />
                    </div>
                    <div>
                        <label htmlFor="stay">Total Nights: </label>
                        <input type="number" value={stayDays} onChange={e => setStayDays(e.target.value)} id='stay' min="1" max="10" required />
                    </div>
                    {stayDays > 0 &&
                        <>
                            <div>

                                <label htmlFor="totalPrice">Total Price: </label>
                                <input type="text" value={(stayDays * hotel.price * 1.12).toFixed(2)} readOnly id='totalPrice' />
                            </div>
                            <div>
                                <label htmlFor="tax">Tax: </label>
                                <input type="text" value={(stayDays * hotel.price * 0.12).toFixed(2)} readOnly id='tax' />
                            </div>
                        </>
                    }
                    <div className={styles.buttonWrapper}>
                        <button type='submit'>
                            Book My Stay
                        </button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            }
        </div>
    )
}

export default HotelDetail