import PageNav from "../Components/PageNav";
import ProductsPageComponents from "../Components/ProductsPageComponents";
import styles from "./Product.module.css";

function Product({ addItem, newCart,  handleChange, homeProducts, length }) {
  return (
    <div>
      <PageNav heading="Products" newCart={newCart} length={length} />
      <div className={styles.product}>
        <article>
          <h2>Our Available Products</h2>
          <select name="Categories" id="Categories" onChange={handleChange}>
            <option value="#">Categories</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </article>
        <ProductsPageComponents addItem={addItem} homeProducts={homeProducts} />
      </div>
    </div>
  );
}


export default Product;
