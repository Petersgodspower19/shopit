import React, { useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import homeProducts from '../itemsForSale';



const initialCart = [];
const initialItemsReadyForPayment = [];
const itemsArray = homeProducts;


function reducer(state, action) {
  switch (action.type) {
    case "Add":
      console.log("Item added to cart:", action.payload);
      return { ...state, cart: [...state.cart, action.payload] };
      
    case "Remove":
      console.log("Item removed from cart:", action.payload);
      return { 
        ...state, 
        cart: state.cart.filter(item => item.id !== action.payload.id) 
      };
      
      case "Change":
      const filteredItems = homeProducts.filter(item => item.Isfor === action.payload);
      return {
        ...state,
        itemsArray: filteredItems.length > 0 ? filteredItems : homeProducts,
      };

    case "Clear":
      console.log("Cart cleared");
      return { ...state, cart: initialCart };
      
    case "Proceed":
      console.log("Item added for payment:", action.payload);
      return { ...state, itemsReadyForPayment: [...state.itemsReadyForPayment, action.payload] };
      
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
  function removeItem (object) {
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
          <Route path="/" element={<Home newCart={newCart} readytoPay={readytoPay} addItem={addItem} />} />

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
              cart={state.cart} 
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
