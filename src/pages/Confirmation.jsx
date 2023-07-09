import React, { useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from '../pages/Confirmation.module.css'

function Confirmation() {
    const [summary, setSummary] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:8081/summary")
            .then((res) => res.json())
            .then((result) => {
                setSummary(result);
                console.log(result);
            }).catch((error) => {
                console.error("Error occurred while fetching:", error);
            });
    }, []);

    function handleOver(){
        fetch('http://localhost:8081/summary/delete', {
            method: 'DELETE',
          });

           navigate("/");
    }
  return (
    <div>
        {summary.map((traveler)=>{
           return<div className={styles.container}>
            <h1><span>{traveler.name}</span>, Thanks for choosing us!!</h1>
            <h2>Your Stay Summary</h2>
            <p><b>Hotel Name: </b>{traveler.hotelName}</p>
            <p><b>Location: </b>{traveler.location}</p>
            <p><b>Total Nights: </b>{traveler.totalNights}</p>
            <p><b>Total price with tax: </b>{traveler.totalPriceWithTax.toFixed(2)}</p>
            <button onClick={handleOver}>Start Over</button>
           </div>
        })}
    </div>
  )
}

export default Confirmation