import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar/Navbar";
import Footer from '../components/Footer/Footer';
import styles from "./styles/PageLayout.module.scss";
import { useSelector, useDispatch } from "react-redux";
import WisListModal from '../components/WishListModal/WishListModal';
import SearchPopup from '../components/SearchPopup/SearchPopup';
import { motion } from "framer-motion";
import Icons from '../components/Common/Icons/Icons';
import Button from '../components/Common/Button/Button';
import ChatPopup from '../components/ChatPopup/ChatPopup';
import { toggleChatModal } from '../redux/features/chat/chatSlice'
import { socket } from '../socket'


const PageLayout = (props) => {
   const { toggleWishList } = useSelector(state => state.wishList);
   const { openSearchBox } = useSelector(state => state.search);
   const { showChatModal } = useSelector(state => state.chat);
   const { token, userInfo } = useSelector(state => state.auth);
   const dispatch = useDispatch()

   //Chat Modal Handler
   const handleChatToggle = () => {
      dispatch(toggleChatModal())
   }

   useEffect(() => {
      socket.on("connect", () => {
         // console.log(socket.id, "connected");
         socket.emit("addUser", userInfo._id); // emit addUser event with userId
      });
   }, [])
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0, transition: { duration: 0.3 } }}>
         <Navbar />
         {token && <div className={styles.chat_icon_wrapper}>
            <Button
               variant='icon-btn-normal'
               onClick={handleChatToggle}
            >
               <Icons name='chatIcon' color='#cc2121' size='2.6rem' />
            </Button>
         </div>}

         <main className={styles.main_wrapper}>
            {showChatModal && <ChatPopup onCloseHandler={handleChatToggle} />}
            {toggleWishList && <WisListModal />}
            {openSearchBox && <SearchPopup />}
            {props.children}
         </main>
         <Footer />
      </motion.div>
   )
}

export default PageLayout;