import React from 'react'
import PageNav from '../Components/PageNav'
import styles from "./Home.module.css"
import HomeProducts from '../Components/HomeProducts'

function Home({newCart,  addItem, length }) {
  return (
    <div >
      <PageNav heading="Home" newCart={newCart} length={length}/>
      <div className={styles.home}>
      <h2>Featured Products</h2>
      <HomeProducts addItem={addItem} />
      </div>
    </div>
  )
}

export default Home
