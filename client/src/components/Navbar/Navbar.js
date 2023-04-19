import React, { useState, useEffect, useRef } from 'react';
import Icons from '../Common/Icons/Icons';
import Button from "../Common/Button/Button";
import styles from "./styles/Navbar.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToggleWishList } from "../../redux/features/wishList/wishLishSlice";
import Typography from '../Common/Typography/Typography';
import MobileNav from './MobileNav';
import { setOpenSearchBox } from "../../redux/features/search/searchSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { AnimatePresence, motion } from "framer-motion";
import { setSubCategoryPage } from "../../redux/features/subCategory/subCategorySlice";
import { setProductPage } from "../../redux/features/products/productsSlice";
import { useLogoutRequestQuery } from '../../redux/features/auth/authApi'

const Navbar = () => {
   const [openDropdown, setOpenDropdown] = useState(false);
   const { userInfo } = useSelector(state => state.auth);
   const dropdownRef = useRef(null);
   const { wishListItem, toggleWishList } = useSelector(state => state.wishList);
   const { refetch } = useLogoutRequestQuery()
   const navigate = useNavigate()
   const dispatch = useDispatch();
   const { quantity } = useSelector(state => state.cart);

   const logoutHandler = () => {
      refetch() //send logout request to server 
      dispatch(logout()) // instant logut, remove token and userPayload data from localStorage.
      navigate("/login")
   }

   //Rest product and sub-category page state to 1, every time user navigate to differen category or product page.
   const resetPageState = () => {
      dispatch(setSubCategoryPage(1))
      dispatch(setProductPage(1))
   }

   //Handles outside click events, if user click anywhere in the dom openDropdown will be false.
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpenDropdown(false);
         }
      };
      if (openDropdown) {
         window.addEventListener('click', handleClickOutside);
      }
      return () => {
         window.removeEventListener('click', handleClickOutside);
      };
   }, [openDropdown]);

   return (
      <nav className={styles.nav_wrapper}>
         {/*Big screen nav*/}
         <div className={styles.nav}>
            <div className={styles.nav_logo}><Link to="/">
               <img src="/assets/logo.png" alt="" />
            </Link>
            </div>
            <ul className={styles.nav_links}>
               <li onClick={resetPageState}>
                  <NavLink
                     to={`/sub-category/63b848501e0644fd041c8ee0`}
                     className={({ isActive }) => isActive ? `${styles.active_nav_link}` : ""}>
                     MEN
                  </NavLink>
               </li>
               <li onClick={resetPageState}>
                  <NavLink
                     to={`/sub-category/63b848e91e0644fd041c8ee3`}
                     className={({ isActive }) => isActive ? `${styles.active_nav_link}` : ""}>
                     WOMEN
                  </NavLink>
               </li>
               <li onClick={resetPageState}>
                  <NavLink
                     to={`/sub-category/63b8490f1e0644fd041c8ee6`}
                     className={({ isActive }) => isActive ? `${styles.active_nav_link}` : ""}>
                     LIFESTYLE
                  </NavLink>
               </li>
            </ul>
            <div className={styles.nav_buttons}>
               <Button variant={"icon-btn-normal"}
                  onClick={() => { dispatch(setOpenSearchBox(true)) }}>
                  <Icons name={"search"} size={"1.5rem"} />
               </Button>
               <div className={styles.user_profile_btn}>
                  <Button variant={"icon-btn-normal"}
                     onClick={() => { setOpenDropdown(!openDropdown) }}>
                     {userInfo ?
                        <div className={styles.user_name} ref={dropdownRef}>
                           <Typography variant={"small"}>
                              {userInfo?.name.slice(0, 1)}
                           </Typography>
                        </div>
                        : <Icons name={"person"} size={"1.5rem"} />
                     }
                  </Button>
                  <AnimatePresence>
                     {openDropdown &&
                        <motion.ul
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } }}
                           exit={{ opacity: 0 }}
                           className={styles.bgscreen_dropdown}>
                           {!userInfo &&
                              <>
                                 <li>
                                    <Link to="/login">
                                       <Icons name={"login"} size={"1.5rem"} />
                                       Login
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/signup">
                                       <Icons name={"signup"} size={"1.5rem"} />
                                       signup
                                    </Link>
                                 </li>
                              </>
                           }
                           {userInfo &&
                              <>
                                 <li className={styles.drop_down_user_info}>
                                    <Link to={`/user-profile/${userInfo._id}`}>
                                       <img
                                          src={userInfo?.profilePic || "/assets/user.jpg"}
                                          alt="profile.png" />
                                       <div className={styles.user_account}>
                                          <span className={styles.user_name}>                                    {userInfo?.name}
                                          </span>
                                          <span className={styles.user_email}>                                    {userInfo?.email}
                                          </span>
                                       </div>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to={`/user-profile/${userInfo._id}`}>
                                       <Icons name={"person"} size={"1.5rem"} />
                                       Account
                                    </Link>
                                 </li>
                                 <li onClick={logoutHandler}>
                                    <Icons name={"logout"} size={"1.5rem"} />  Logout
                                 </li>
                              </>
                           }
                        </motion.ul>
                     }
                  </AnimatePresence>
               </div>
               <div className={styles.wish_list_btn_wrapper}>
                  <Button variant={"icon-btn-normal"}
                     onClick={() => { dispatch(setToggleWishList(!toggleWishList)) }}>
                     <Icons name={"love"} size={"1.5rem"} color={"#727272"} />
                     <span className={styles.wish_list_count}>
                        {wishListItem ? wishListItem.length : 0}
                     </span>
                  </Button>
               </div>
               <div className={styles.cart_item_link_wrapper}>
                  <Link to={"/cart"}>
                     <Icons name={"bag"} size={"1.5rem"} color={"#727272"} />
                     <span className={styles.cart_item_count}>
                        {quantity}
                     </span>
                  </Link>
               </div>
            </div>
         </div>
         {/******************************/}

         {/* Mobile Nav */}
         <MobileNav
            wishListItem={wishListItem}
            toggleWishList={toggleWishList}
            userInfo={userInfo}
            quantity={quantity}
            logoutHandler={logoutHandler}
            resetSubCategory={resetPageState}

         />
         {/*********************************/}
      </nav>
   )
}

export default Navbar;