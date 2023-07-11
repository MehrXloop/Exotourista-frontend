import React from 'react'
import logo from '../logo.png'
import styles from '../pages/HotelList.module.css'

function Navbar() {
  return (
    <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
  )
}

export default Navbar