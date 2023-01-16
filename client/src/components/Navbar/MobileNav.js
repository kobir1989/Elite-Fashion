import React, { useState } from 'react';
import Input from "../Common/Input/Input";
import styles from "./styles/MobileNav.module.scss";
import Icons from '../Common/Icons/Icons';
import { setToggleWishList } from "../../redux/features/wishLishSlice";
import Button from '../Common/Button/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const MobileNav = (
   {
      toggleWishList,
      wishListItem,
      categories,
      isLoggedIn,
      quantity
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
                  <Icons name={"shopingCart"} size={"1.5rem"} />
                  <span>{quantity}</span>
               </Button>
            </Link>
            <Button variant={"icon-btn-normal"}
               onClick={() => { setOpenMenu(!openMenu) }}>
               <Icons name={"menu"} size={"2rem"} />
            </Button>
         </div>
         {openMenu &&
            <div className={styles.nav_backdrop}>
               <div className={styles.nav_menu_mobile_dropdown}>
                  <div className={styles.close_icon}>
                     <Button
                        variant={"icon-btn-normal"}
                        onClick={() => { setOpenMenu(false) }}>
                        <Icons name={"cross"} size={"1.5rem"} />
                     </Button>
                  </div>
                  <div className={styles.nav_menu_mobile_dropdown_search}>
                     <span className={styles.input}>
                        <Input size={"small"} label={"Search"} />
                     </span>
                     <span className={styles.icon}>
                        <Icons name={"search"} size={"1.3rem"} color={"#b5b5b5"} />
                     </span>
                  </div>
                  <ul className={styles.nav_menu_mobile_dropdown_links}>
                     {categories.slice(0, 2).map((category) => (
                        <li key={category?._id}>
                           <Link to={`/sub-category/${category?._id}`}>
                              {category?.name}
                           </Link>
                        </li>
                     ))}
                     {isLoggedIn &&
                        <>
                           <li>Account</li>
                           <li>logout</li>
                        </>
                     }
                     {!isLoggedIn && <>
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