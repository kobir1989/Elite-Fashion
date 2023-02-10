import React, { useState } from 'react';
import Icons from '../Common/Icons/Icons';
import Button from "../Common/Button/Button";
import styles from "./styles/Navbar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToggleWishList } from "../../redux/features/wishLishSlice";
import Typography from '../Common/Typography/Typography';
import MobileNav from './MobileNav';
import { setOpenSearchBox } from "../../redux/features/searchSlice";
import { logout } from "../../redux/features/authSlice";
import { AnimatePresence, motion } from "framer-motion";
import { setSubCategoryPage } from "../../redux/features/subCategorySlice";

const Navbar = () => {
   const [openDropdown, setOpenDropdown] = useState(false);
   const { userInfo } = useSelector(state => state.auth);
   const { wishListItem, toggleWishList } = useSelector(state => state.wishList);
   const navigate = useNavigate()
   const dispatch = useDispatch();
   const { quantity } = useSelector(state => state.cart);

   const logoutHandler = () => {
      dispatch(logout())
      navigate("/login")
   }
   const resetSubCategory = () => {
      dispatch(setSubCategoryPage(1))
   }
   return (
      <nav className={styles.nav_wrapper}>
         {/*Big screen nav*/}
         <div className={styles.nav}>
            <div className={styles.nav_logo}><Link to="/">
               <img src="/assets/logo.png" alt="" />
            </Link>
            </div>
            <ul className={styles.nav_links}>
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
            </ul>
            <div className={styles.nav_buttons}>
               <Button variant={"icon-btn-normal"}
                  onClick={() => { dispatch(setOpenSearchBox(true)) }}>
                  <Icons name={"search"} size={"1.5rem"} />
               </Button>
               <Button variant={"icon-btn-normal"} onClick={() => { setOpenDropdown(!openDropdown) }}>
                  {userInfo ?
                     <div className={styles.user_name}>
                        <Typography variant={"small"}>
                           {userInfo?.name.slice(0, 1)}
                        </Typography>
                     </div>
                     : <Icons name={"person"} size={"1.5rem"} />
                  }
                  <AnimatePresence>
                     {openDropdown &&

                        <motion.ul
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
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
               </Button>
               <Button variant={"icon-btn-normal"}
                  onClick={() => { dispatch(setToggleWishList(!toggleWishList)) }}>
                  <Icons name={"love"} size={"1.5rem"} />
                  <span>{wishListItem ? wishListItem.length : 0}</span>
               </Button>
               <Link to={"/cart"}>
                  <Button variant={"icon-btn-normal"}>
                     <Icons name={"bag"} size={"1.5rem"} />
                     <span>{quantity}</span>
                  </Button>
               </Link>
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
            resetSubCategory={resetSubCategory}

         />
         {/*********************************/}
      </nav>
   )
}

export default Navbar;