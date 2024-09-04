import React, { useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import homeProducts from '../itemsForSale';

const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
const initialItemsReadyForPayment = JSON.parse(localStorage.getItem('itemsReadyForPayment')) || [];
const itemsArray = homeProducts;

function reducer(state, action) {
  switch (action.type) {
    case "Add":
      const newCart = [...state.cart, action.payload];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
      
    case "Remove":
      const updatedCart = state.cart.filter(item => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { 
        ...state, 
        cart: updatedCart 
      };
      
    case "Change":
      const filteredItems = homeProducts.filter(item => item.Isfor === action.payload);
      return {
        ...state,
        itemsArray: filteredItems.length > 0 ? filteredItems : homeProducts,
      };

    case "Clear":
      localStorage.removeItem('cart');
      return { ...state, cart: initialCart };
      
    case "Proceed":
      const newItemsReadyForPayment = [...state.itemsReadyForPayment, action.payload];
      localStorage.setItem('itemsReadyForPayment', JSON.stringify(newItemsReadyForPayment));
      return { ...state, itemsReadyForPayment: newItemsReadyForPayment };
      
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { cart: initialCart, 
    itemsReadyForPayment: initialItemsReadyForPayment,
     itemsArray});


  const [newCart, setNewCart] = useState(false);
  const [readytoPay, setReadyToPay] = useState(false);

  useEffect(() => {
    console.log("Current cart state:", state.cart);
  }, [state.cart]);

  useEffect(() => {
    console.log("Items ready for payment:", state.itemsReadyForPayment);
  }, [state.itemsReadyForPayment]);

  function addItem(object) {
    dispatch({ type: "Add", payload: object });
    setNewCart(true);
  }

  function clearCart() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4d869c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Clear!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "Clear" });
    setNewCart(false);
      }
    });
    
  }

  function payAndCheck(object) {
    dispatch({ type: "Proceed", payload: object });
    setReadyToPay(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4d869c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Pay"
    }).then((result) => {
      if (result.isConfirmed) {
    Swal.fire({
      title: 'Success',
      text: 'You have Successfully purchased the item(s)',
      icon: 'success',
      confirmButtonText: 'Thanks',
      confirmButtonColor: "#4d869c",
    })
  }
  })

    
  }

  function removeItem(object) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4d869c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove!"
    }).then((result) => {
      if (result.isConfirmed) {
    dispatch({type: "Remove", payload: object})
      }
  })
  }

  function handleChange(e) {
    console.log(e.target.value)
    dispatch({type: "Change", payload: e.target.value})
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home newCart={newCart} readytoPay={readytoPay} />} />

          <Route 
            path="/products" 
            element={<Product 
              addItem={addItem} 
              newCart={newCart} 
              readytoPay={readytoPay} 
              handleChange={handleChange} 
              homeProducts={state.itemsArray} 
            />} 
          />

          <Route path="/cart" element={<Cart cart={state.cart}
           clearCart={clearCart} newCart={newCart}
           payAndCheck={payAndCheck} readytoPay={readytoPay} remove={removeItem}  setNewCart={setNewCart}/>} />


          <Route 
            path="/checkout" 
            element={<Checkout 
              newCart={newCart} 
              readytoPay={readytoPay} 
              items={state.itemsReadyForPayment} 
              handleSubmit={handleSubmit} 
              setreadytoPay={setReadyToPay}
            />}  
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
