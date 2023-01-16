import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from "../Common/Button/Button";
import styles from "./styles/Navbar.module.scss";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import Input from "../Common/Input/Input";
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useSelector, useDispatch } from "react-redux";
import { setToggleWishList } from "../../redux/features/wishLishSlice";
import { isAuth } from "../../helpers/isAuth.helper";
import Typography from '../Common/Typography/Typography';

const Navbar = () => {
   const [openMenu, setOpenMenu] = useState(false);
   const [openDropdown, setOpenDropdown] = useState(false);
   const { userInfo } = useSelector(state => state.auth);
   const { categories } = useSelector(state => state.category)
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
               {categories.slice(0, 3).map((category) => (
                  <li key={category?._id}>
                     <Link to={`/sub-category/${category?._id}`}>
                        {category?.name}
                     </Link>
                  </li>
               ))}
            </ul>
            <div className={styles.nav_buttons}>
               <Button variant={"icon-btn-normal"}>
                  <SearchIcon sx={{ fontSize: "2rem" }} />
               </Button>
               <Button variant={"icon-btn-normal"} onClick={() => { setOpenDropdown(!openDropdown) }}>
                  {isLoggedIn ?
                     <div className={styles.user_name}>
                        <Typography variant={"small"}>
                           {userInfo?.name.slice(0, 2)}
                        </Typography>
                     </div>
                     : <PermIdentityIcon sx={{ fontSize: "2rem" }} />
                  }
                  {openDropdown &&
                     <ul className={styles.bgscreen_dropdown}>
                        {!isLoggedIn &&
                           <>
                              <li>
                                 <Link to="/login">
                                    <LoginIcon sx={{ fontSize: "1.2rem" }} />
                                    Login
                                 </Link>
                              </li>
                              <li> <Link to="/signup"> <AppRegistrationIcon sx={{ fontSize: "1.2rem" }} />  signup</Link>
                              </li>
                           </>
                        }
                        {isLoggedIn &&
                           <>
                              <li>
                                 <ManageAccountsIcon sx={{ fontSize: "1.2rem" }} /> Account
                              </li>
                              <li>
                                 <LogoutIcon sx={{ fontSize: "1.2rem" }} /> Logout
                              </li>
                           </>
                        }
                     </ul>
                  }
               </Button>
               <Button variant={"icon-btn-normal"}
                  onClick={() => { dispatch(setToggleWishList(!toggleWishList)) }}>
                  <FavoriteBorderIcon sx={{ fontSize: "2rem" }} />
                  <span>{wishListItem ? wishListItem.length : 0}</span>
               </Button>
               <Link to={"/cart"}>
                  <Button variant={"icon-btn-normal"}>
                     <AddShoppingCartIcon sx={{ fontSize: "2rem" }} />
                     <span>{quantity}</span>
                  </Button>
               </Link>
            </div>
         </div>
         {/******************************/}

         {/* Mobile Nav */}
         <div className={styles.nav_menu_mobile}>
            <div className={styles.nav_menu_mobile_btn}>
               <Button variant={"icon-btn-normal"} onClick={() => { dispatch(setToggleWishList(!toggleWishList)) }}>
                  <FavoriteBorderIcon />
                  <span>{wishListItem ? wishListItem.length : 0}</span>
               </Button>
               <Button variant={"icon-btn-normal"}>
                  <AddShoppingCartIcon />
                  <span>{quantity}</span>
               </Button>
               <Button variant={"icon-btn-normal"} onClick={() => { setOpenMenu(!openMenu) }}>
                  <MenuIcon sx={{ fontSize: "2rem" }} />
               </Button>
            </div>
            {openMenu &&
               <div className={styles.nav_backdrop}>
                  <div className={styles.nav_menu_mobile_dropdown}>
                     <div className={styles.close_icon}>
                        <Button variant={"icon-btn-normal"} onClick={() => { setOpenMenu(false) }}>
                           <CloseIcon sx={{ color: "#cc2121", fontSize: "1.8rem" }} />
                        </Button>
                     </div>
                     <div className={styles.nav_menu_mobile_dropdown_search}>
                        <span className={styles.input}><Input size={"small"} label={"Search"} /></span>
                        <span className={styles.icon}><SearchIcon sx={{ color: "#727272" }} /></span>
                     </div>
                     <ul className={styles.nav_menu_mobile_dropdown_links}>
                        <li>
                           <Link to="/sub-category/63b848501e0644fd041c8ee0">Man</Link>
                        </li>
                        <li>
                           <Link to="/sub-category/63b848e91e0644fd041c8ee3">Women</Link>
                        </li>
                        <li>
                           <Link to="/sub-category/63b8490f1e0644fd041c8ee6">Lifestyle</Link>
                        </li>
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
         {/*********************************/}
      </nav>
   )
}

export default Navbar;