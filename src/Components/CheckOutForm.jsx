import React from 'react'
import styles from "./CheckOutForm.module.css"

function CheckOutForm({handleSubmit, total}) {
  return (
   <div className={styles.form}>
    <form onSubmit={handleSubmit}>
        <article>
        <input type="text" name="" id="name"  required placeholder='Name'/>
        </article>
        <article>
        <input type="text" name="" id="address"  required placeholder='Address'/>
        </article>
        <article>
        <input type="text" name="" id="city"  required placeholder='City'/>
        </article>
        <article>
        <input type="text" name="" id="zip"  required placeholder='Zip Code'/>
        </article>

        <article>
            <input type="number" name="" id="credit" placeholder='Credit Card' />
            <button>Pay ${total}</button>
        </article>
        
    </form>
   </div>
  )
}

export default CheckOutForm
