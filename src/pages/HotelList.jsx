import React, { useEffect, useState } from 'react';
import Hotel from '../components/Hotel';
import styles from '../pages/HotelList.module.css'

function HotelList() {
  const [originalHotels, setOriginalHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [showHotels, setShowHotels] = useState(false);
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [pool, setPool] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/hotels/all")
      .then((res) => res.json())
      .then((result) => {
        setOriginalHotels(result);
        console.log(result);
      }).catch((error) => {
        console.error("Error occurred while fetching:", error);
      });
  }, []);

  function handleSearch(e) {
    e.preventDefault();

    const filtered = originalHotels.filter(hotel => {
      return (location === "" || hotel.location === location) && (experience === "" || hotel.experience === experience) && (pool === null || hotel.pool === (pool === "true"))
    })

    setFilteredHotels(filtered);
    setShowHotels(true);
  }

  return (
    <>
      <form onSubmit={handleSearch} className={styles.form}>
        <h2>Search Criteria</h2>
        <div>
          <label htmlFor="location">Please select your location: </label>
          <select name="location" id="location" value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">Select a location</option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
          </select>
        </div>
        <div>
          <label htmlFor="experience">Please select your experience level: </label>
          <select
            name="experience"
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="">Select an experience</option>
            <option value="Budget">Budget</option>
            <option value="Business">Business</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>
        <div>
          <label htmlFor="pool">Do you want pool?  </label>
          <input type="radio" name="pool" id="pool" value="true" onChange={(e) => setPool(e.target.value)} />Yes
          <input type="radio" name="pool" id="pool" value="false" onChange={(e) => setPool(e.target.value)} />No
        </div>
        <button type="submit">Search</button>
      </form>
      <ol>
        {showHotels && (
          filteredHotels.length === 0 ? (
            <p>No hotels found. Please refine your search criteria.</p>
          ) : (
            filteredHotels.map((hotel) => (
              <Hotel hotel={hotel} key={hotel.id} />
            ))
          )
        )}
      </ol>
    </>
  );
}

export default HotelList;
