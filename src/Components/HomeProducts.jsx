import React from 'react'
import homeProducts from '../../itemsForSale'
import styles from "./HomeProducts.module.css"
import { NavLink } from 'react-router-dom'

function HomeProducts() {
  return (
    <section className={styles.gridsection}>
      {homeProducts.map(product => (
        <div className={styles.productDiv} key={product.id}>
          <article>
        <p className={styles.off}>{product.percentageOff}</p> 
        <img src={product.image} alt=""/>
        </article>
      <p className={styles.productDescription}>{product.description}</p>
      <article>
        <p><button className={styles.pricebtn} data-id="${id}" disabled>
          <NavLink to="/products">${product.newprice}</NavLink>
          </button></p>
        <p className={styles.oldprice}>{product.oldprice}</p>
    </article> 
        </div>
      ))}
    </section>
  )
}

export default HomeProducts
