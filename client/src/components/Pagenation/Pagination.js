import React from 'react';
import styles from "./styles/Pagination.module.scss";
import Icons from '../Common/Icons/Icons';
import Button from '../Common/Button/Button';

const Pagination = ({ pagination, page, paginationHandler }) => {
   const numberOfPages = Array(pagination?.totalPage)
      .fill().map((_, index) => index + 1);
   return (
      <div className={styles.pagination_buttons}>
         {pagination?.previous &&
            <Button
               variant={"icon-btn-white"}
               onClick={() => { paginationHandler(1) }}>
               <Icons name={"backArrow"} sx={{ fontSize: "1rem" }} />
            </Button>}
         {
            numberOfPages.map((pg, index) => (
               <div key={index}>
                  <Button
                     variant={page === pg ? "btn-black-small" : "icon-btn-white"}
                     onClick={() => { paginationHandler(pg) }} >
                     {pg}
                  </Button>
               </div>
            ))
         }
         {pagination?.next &&
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