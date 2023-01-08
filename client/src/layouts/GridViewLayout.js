import React from 'react';
import styles from "./styles/GridViewLayout.module.scss";

const GridViewLayout = ({ children, page = "category", ...otherProps }) => {
   return (
      <div className={styles[`grid_view_wrapper_${page}`]}>
         {children}
      </div>
   )
}

export default GridViewLayout;