import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from "../Common/Button/Button";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import Input from "../Common/Input/Input";
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Navbar = () => {
   const [openMenu, setOpenMenu] = useState(false)
   const [openDropdown, setOpenDropdown] = useState(false)
   return (
      <nav className={styles.nav_wrapper}>

         {/*Big screen nav*/}
         <div className={styles.nav}>
            <div className={styles.nav_logo}><Link to="/">
               <img src="/assets/logo.png" alt="" />
            </Link>

            </div>
            <ul className={styles.nav_links}>
               <li><Link to="/sub-category/63b848501e0644fd041c8ee0">Man</Link></li>
               <li><Link to="/sub-category/63b848e91e0644fd041c8ee3">Women</Link></li>
               <li><Link to="/sub-category/63b8490f1e0644fd041c8ee6">Lifestyle</Link></li>
            </ul>
            <div className={styles.nav_buttons}>
               <Button variant={"icon-btn-normal"}>
                  <SearchIcon />
               </Button>
               <Button variant={"icon-btn-normal"} onMouseEnter={() => { setOpenDropdown(true) }} onMouseLeave={() => { setOpenDropdown(false) }}>
                  <PermIdentityIcon />
                  {openDropdown &&
                     <ul className={styles.bgscreen_dropdown}>
                        <li><LoginIcon sx={{ fontSize: "1.2rem" }} /> Login</li>
                        <li> <AppRegistrationIcon sx={{ fontSize: "1.2rem" }} /> Signup</li>
                        <li> <ManageAccountsIcon sx={{ fontSize: "1.2rem" }} /> Account</li>
                        <li><LogoutIcon sx={{ fontSize: "1.2rem" }} /> Logout</li>
                     </ul>
                  }
               </Button>
               <Button variant={"icon-btn-normal"}>
                  <FavoriteBorderIcon />
                  <span>0</span>
               </Button>
               <Button variant={"icon-btn-normal"}>
                  <AddShoppingCartIcon />
                  <span>0</span>
               </Button>
            </div>
         </div>
         {/******************************/}

         {/* Mobile Nav */}
         <div className={styles.nav_menu_mobile}>
            <div className={styles.nav_menu_mobile_btn}>
               <Button variant={"icon-btn-normal"}>
                  <FavoriteBorderIcon />
                  <span>0</span>
               </Button>
               <Button variant={"icon-btn-normal"}>
                  <AddShoppingCartIcon />
                  <span>0</span>
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
                        <li>Account</li>
                        <li>login</li>
                        <li>signup</li>
                        <li>logout</li>
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