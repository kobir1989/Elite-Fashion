import React from 'react';
import styles from "./styles/Pagination.module.scss";
import Icons from '../Common/Icons/Icons';
import Button from '../Common/Button/Button';

const Pagination = ({ api, page, paginationHandler }) => {
   const numberOfPages = Array(api?.totalPage)
      .fill().map((_, index) => index + 1);
   return (
      <div className={styles.pagination_buttons}>
         {api?.previous &&
            <Button
               variant={"icon-btn-white"}
               onClick={() => { paginationHandler(1) }}>
               <Icons name={"backArrow"} sx={{ fontSize: "1rem" }} />
            </Button>}
         {
            numberOfPages
               && numberOfPages.length ? numberOfPages.map((pg, index) => (
                  <div key={index}>
                     <Button
                        variant={page === pg ? "btn-black-small" : "icon-btn-white"}
                        onClick={() => { paginationHandler(pg) }} >
                        {pg}
                     </Button>
                  </div>
               ))
               : null
         }
         {api?.next &&
            <Button
               variant={"icon-btn-white"}
               onClick={() => { paginationHandler(numberOfPages.length) }}>
               <Icons name={"forwardArrow"} sx={{ fontSize: "1rem" }} />
            </Button>
         }
      </div>
   )
}

export default Pagination;