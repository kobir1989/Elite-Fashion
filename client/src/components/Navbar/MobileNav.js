import React, { useState } from 'react';
import styles from "./styles/MobileNav.module.scss";
import Icons from '../Common/Icons/Icons';
import { setToggleWishList } from "../../redux/features/wishList/wishLishSlice";
import Button from '../Common/Button/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setOpenSearchBox } from "../../redux/features/search/searchSlice";
import { motion, AnimatePresence } from "framer-motion";


const MobileNav = (
   {
      toggleWishList,
      wishListItem,
      userInfo,
      quantity,
      logoutHandler,
      resetSubCategory,
      toggleChatModal,
      isMessage
   }) => {

   const [openMenu, setOpenMenu] = useState(false);
   const dispatch = useDispatch()
   return (
      <div className={styles.nav_menu_mobile}>
         <div className={styles.nav_menu_mobile_btn}>
            <div className={styles.chat_popup_button}>
               <Button variant={"icon-btn-normal"}
                  onClick={() => { dispatch(toggleChatModal()) }}>
                  <Icons name={"chatIcon"} size={"1.5rem"} />
                  <span className={styles.message_count}>
                     {isMessage}
                  </span>
               </Button>
            </div>
            <div className={styles.wish_list_btn_wrapper}>
               <Button variant={"icon-btn-normal"}
                  onClick={() => { dispatch(setToggleWishList(!toggleWishList)) }}>
                  <Icons name={"love"} size={"1.2rem"} color={"#727272"} />
                  <span className={styles.wish_list_count}>
                     {wishListItem ? wishListItem.length : 0}
                  </span>
               </Button>
            </div>
            <div className={styles.cart_item_link_wrapper}>
               <Link to={"/cart"}>
                  <Icons name={"bag"} size={"1.2rem"} color={"#727272"} />
                  <span className={styles.cart_item_count}>
                     {quantity}
                  </span>
               </Link>
            </div>
            <Button variant={"icon-btn-normal"}
               onClick={() => { setOpenMenu(!openMenu) }}>
               <Icons name={"menu"} size={"2rem"} />
            </Button>
         </div>
         <AnimatePresence>
            {openMenu &&
               <motion.div
                  initial={{ opacity: 0, transition: { duration: 0.2 } }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ default: { ease: "linear" } }}
                  className={styles.nav_backdrop}
                  onClick={() => { setOpenMenu(false) }}>
                  <motion.div
                     initial={{ x: "-100%", transition: { duration: 0.2 } }}
                     animate={{ x: 0 }}
                     exit={{ x: "-100%", transition: { duration: 0.2 } }}
                     transition={{ default: { ease: "linear" } }}
                     className={styles.nav_menu_mobile_dropdown}>
                     {userInfo &&
                        <div className={styles.drop_down_user_info}>
                           <img
                              src={userInfo?.profilePic || "/assets/user.jpg"}
                              alt="profile.png" />
                           <div className={styles.user_account}>
                              <span className={styles.user_name}>                                    {userInfo?.name}
                              </span>
                              <span className={styles.user_email}>                                    {userInfo?.email}
                              </span>
                           </div>
                        </div>
                     }
                     <div className={styles.close_icon}>
                        <Button
                           variant={"icon-btn-normal"}
                           onClick={() => { setOpenMenu(false) }}>
                           <Icons name={"cross"} size={"1.1rem"} />
                        </Button>
                     </div>
                     <div className={styles.nav_menu_mobile_dropdown_search}>
                        <Button variant={"btn-border-black"} onClick={() => { dispatch(setOpenSearchBox(true)) }}>
                           Search...
                           <Icons
                              name={"search"}
                              size={"1.3rem"}
                              color={"#b5b5b5"} />
                        </Button>
                     </div>
                     <ul className={styles.nav_menu_mobile_dropdown_links}>
                        <li onClick={resetSubCategory}>
                           <Link to={`/sub-category/63b848501e0644fd041c8ee0`}>
                              MEN
                           </Link>
                        </li>
                        <li onClick={resetSubCategory}>
                           <Link to={`/sub-category/63b848e91e0644fd041c8ee3`}>
                              WOMEN
                           </Link>
                        </li>
                        <li onClick={resetSubCategory}>
                           <Link to={`/sub-category/63b8490f1e0644fd041c8ee6`}>
                              LIFESTYLE
                           </Link>
                        </li>
                        {userInfo &&
                           <>
                              <li>
                                 <Link to={`/user-profile/${userInfo._id}`}>
                                    Account
                                 </Link>
                              </li>
                              <li onClick={logoutHandler}>
                                 logout
                              </li>
                           </>
                        }
                        {!userInfo && <>
                           <li>
                              <Link to="/login">login</Link>
                           </li>
                           <li>
                              <Link to="/signup">signup</Link>
                           </li>
                        </>
                        }
                     </ul>
                  </motion.div>
               </motion.div>
            }
         </AnimatePresence>

      </div >
   )
}

export default MobileNav;