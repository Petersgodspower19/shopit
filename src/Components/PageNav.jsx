import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./PageNav.module.css"

function PageNav({heading, newCart, readytoPay}) {
  return (
    <nav>
        <h1>{heading}</h1>

        <div className={styles.navigationbar}>
        
            <p><NavLink to="/">Home</NavLink></p>
            <p><NavLink to="/products">Products</NavLink></p>
            <p id='cart'><NavLink to="/cart"> {newCart && <span className={styles.detector}>!</span>}Cart</NavLink></p>
            <p><NavLink to="/checkout">{readytoPay && <span className={styles.detector}>!</span>}CheckOut</NavLink></p>
       
        </div>
    </nav>
  )
}

export default PageNav
