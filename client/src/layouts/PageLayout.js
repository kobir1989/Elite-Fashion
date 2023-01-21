import React from 'react';
import Navbar from "../components/Navbar/Navbar";
import Footer from '../components/Footer/Footer';
import styles from "./styles/PageLayout.module.scss";
import { useSelector } from "react-redux";
import WisListModal from '../components/WishListModal/WishListModal';
const PageLayout = (props) => {
   const { toggleWishList } = useSelector(state => state.wishList);
   return (
      <>
         <Navbar />
         <main className={styles.main_wrapper}>
            {toggleWishList && <WisListModal />}
            {props.children}
         </main>
         <Footer />
      </>
   )
}

export default PageLayout;