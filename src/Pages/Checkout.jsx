import React from 'react'
import PageNav from '../Components/PageNav'
import CheckOutForm from '../Components/CheckOutForm'
import styles from "./CheckOut.module.css"

function Checkout({cart, handleSubmit, newCart, length}) {
  const total  = cart.reduce((acc, item) => acc + parseFloat(item.newprice), 0);
  return (
    <div>
     <PageNav heading="Checkout" newCart={newCart} length={length}/> 
     <div className={styles.checkout}>
     <div className={styles.items}>
      
        <table>
          <caption>Your Current Items</caption>
          <thead>
          <tr>
                <th>Item</th>
                <th>Price</th>
            </tr>
          </thead>
            {cart.map(item => (
              <tbody>
            <tr>
            
                <td>{item.name}</td>
                <td className={styles.itemPrice}>${item.newprice}</td>
            </tr>
            </tbody>
             ))}
             <thead>
          <tr>
                <th>Total</th>
                <th>${total}</th>
            </tr>
          </thead>
        </table>
      
     </div>
     <CheckOutForm handleSubmit={handleSubmit} total={total} />
     </div>
    </div>
  )
}

export default Checkout
