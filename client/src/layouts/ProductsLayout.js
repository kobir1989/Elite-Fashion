import React from 'react';
import styles from "./styles/ProductsLayout.module.scss";


const ProductsLayout = ({ children, ...otherProps }) => {
   return (
      <div className={styles.Products_layout_wrapper} {...otherProps}>
         {children}
      </div>
   )
};

export default ProductsLayout;