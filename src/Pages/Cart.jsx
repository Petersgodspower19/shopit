import React from 'react';
import PageNav from '../Components/PageNav';
import styles from "./Cart.module.css";
import { useNavigate } from 'react-router-dom';

function Cart({ cart, clearCart, newCart, payAndCheck, readytoPay, remove, setNewCart }) {
  const totalAmount = cart.reduce((acc, item) => acc + parseFloat(item.newprice), 0);
  const navigate = useNavigate(); 

  if (cart.length === 0) {
    setNewCart(false);
  }

  function handleNavigationToCheckout() {
    navigate('/checkout');
  }

  return (
    <div>
      <PageNav heading="Your Cart" newCart={newCart} readytoPay={readytoPay} />
      <button className={styles.proceed} onClick={handleNavigationToCheckout}>
        Proceed to Checkout
      </button>
      <div className={styles.cart}>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.newprice}</p>
                  <br />
                  <div className={styles.buttons}>
                    <button className='remove' onClick={() => remove(item)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className={styles.totalAmount}>
        <h3>Total Amount: {totalAmount.toFixed(2)}</h3>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
}

export default Cart;
