import React from 'react';

import styles from "./HomeProducts.module.css";

function ProductsPageComponents({ addItem, homeProducts }) {
  return (
    <section className={styles.gridsection}>
      {homeProducts.map(product => (
        <div className={styles.productDiv} key={product.id}>
          <article>
            <p className={styles.off}>{product.percentageOff}</p>
            <img src={product.image} alt={product.name} />
          </article>
          <p className={styles.productDescription}>{product.description}</p>
          <article>
            <p>
              <button
                className={styles.pricebtn}
                onClick={() =>  addItem(product)}
              >
                ${product.newprice}
              </button>
            </p>
            <p className={styles.oldprice}>{product.oldprice}</p>
          </article>
        </div>
      ))}
    </section>
  );
}

export default ProductsPageComponents;
