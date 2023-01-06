import React from 'react';
import PageLayout from "../../layouts/PageLayout";
import { useSearchParams } from "react-router-dom";
import styles from "./SubCategoryPage.module.scss";

const SubCategoryPage = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   // setSearchParams();
   const query = searchParams.get("name")
   console.log(query);
   const ar = [0, 1, 2, 3, 4, 5, 6];
   return (
      <PageLayout>
         {/* <div>Categoy</div>
         {query === "men" && <p>Men</p>}
         {query === "women" && <p>women</p>}
         {query === "lifestyle" && <p>lifestyle</p>} */}

         <section className={styles.sub_category_wrapper}>
            {ar.map((item) => (
               <div className={styles.sub_category_card}>

               </div>
            ))}

         </section>
      </PageLayout>
   )
}

export default SubCategoryPage;