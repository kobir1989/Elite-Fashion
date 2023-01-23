import React, { useState } from 'react';
import Icons from '../Common/Icons/Icons';
import Button from "../Common/Button/Button";
import styles from "./styles/Navbar.module.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToggleWishList } from "../../redux/features/wishLishSlice";
import { isAuth } from "../../helpers/isAuth.helper";
import Typography from '../Common/Typography/Typography';
import MobileNav from './MobileNav';
import { userLogout } from "../../redux/actions/authAction";
import { setOpenSearchBox } from "../../redux/features/searchSlice";

const Navbar = () => {
   const [openDropdown, setOpenDropdown] = useState(false);
   const { userInfo } = useSelector(state => state.auth);
   const { wishListItem, toggleWishList } = useSelector(state => state.wishList);
   const dispatch = useDispatch();
   const { quantity } = useSelector(state => state.cart);
   const isLoggedIn = isAuth(userInfo);

   return (
      <nav className={styles.nav_wrapper}>
         {/*Big screen nav*/}
         <div className={styles.nav}>
            <div className={styles.nav_logo}><Link to="/">
               <img src="/assets/logo.png" alt="" />
            </Link>
            </div>
            <ul className={styles.nav_links}>
               <li>
                  <Link to={`/sub-category/63b848501e0644fd041c8ee0`}>
                     MEN
                  </Link>
               </li>
               <li>
                  <Link to={`/sub-category/63b848e91e0644fd041c8ee3`}>
                     WOMEN
                  </Link>
               </li>
               <li>
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
                  {isLoggedIn ?
                     <div className={styles.user_name}>
                        <Typography variant={"small"}>
                           {userInfo?.name.slice(0, 1)}
                        </Typography>
                     </div>
                     : <Icons name={"person"} size={"1.5rem"} />
                  }
                  {openDropdown &&
                     <ul className={styles.bgscreen_dropdown}>
                        {!isLoggedIn &&
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
                        {isLoggedIn &&
                           <>
                              <li>
                                 <Link to={`/user-profile/${userInfo._id}`}>
                                    <Icons name={"person"} size={"1.5rem"} />
                                    Account
                                 </Link>
                              </li>
                              <li onClick={() => dispatch(userLogout())}>
                                 <Icons name={"logout"} size={"1.5rem"} />
                                 Logout
                              </li>
                           </>
                        }
                     </ul>
                  }
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
            isLoggedIn={isLoggedIn}
            quantity={quantity}

         />
         {/*********************************/}
      </nav>
   )
}

export default Navbar;