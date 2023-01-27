import React, { useState } from 'react';
import styles from "./styles/MobileNav.module.scss";
import Icons from '../Common/Icons/Icons';
import { setToggleWishList } from "../../redux/features/wishLishSlice";
import Button from '../Common/Button/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setOpenSearchBox } from "../../redux/features/searchSlice";

const MobileNav = (
   {
      toggleWishList,
      wishListItem,
      userInfo,
      quantity,
      logoutHandler

   }) => {

   const [openMenu, setOpenMenu] = useState(false);
   const dispatch = useDispatch()
   return (
      <div className={styles.nav_menu_mobile}>
         <div className={styles.nav_menu_mobile_btn}>
            <Button variant={"icon-btn-normal"}
               onClick={() => { dispatch(setToggleWishList(!toggleWishList)) }}>
               <Icons name={"love"} size={"1.5rem"} />
               <span>{wishListItem ? wishListItem.length : 0}</span>
            </Button>
            <Link to="/cart">
               <Button variant={"icon-btn-normal"}>
                  <Icons name={"bag"} size={"1.5rem"} />
                  <span>{quantity}</span>
               </Button>
            </Link>
            <Button variant={"icon-btn-normal"}
               onClick={() => { setOpenMenu(!openMenu) }}>
               <Icons name={"menu"} size={"2rem"} />
            </Button>
         </div>
         {openMenu &&
            <div className={styles.nav_backdrop}
               onClick={() => { setOpenMenu(false) }}>
               <div className={styles.nav_menu_mobile_dropdown}>
                  <div className={styles.close_icon}>
                     <Button
                        variant={"icon-btn-normal"}
                        onClick={() => { setOpenMenu(false) }}>
                        <Icons name={"cross"} size={"1.5rem"} />
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
                        <Link to={`/sub-category/63b848e91e0644fd041c8ee3`}>
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
               </div>
            </div>
         }
      </div>
   )
}

export default MobileNav;