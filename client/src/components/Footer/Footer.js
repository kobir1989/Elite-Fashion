import React from 'react';
import Icons from '../Common/Icons/Icons';
import styles from "./styles/Footer.module.scss";
import Typography from "../Common/Typography/Typography";
import { Link } from "react-router-dom";
const Footer = () => {
   return (
      <footer>
         <div className={styles.footer}>
            <div className={styles.footer_service_wrapper}>
               <Typography color={"white"} variant={"h4"}>
                  Services
               </Typography>
               <ul>
                  <li>Men's Collection</li>
                  <li>Women's Collection</li>
                  <li>Size Guide</li>
               </ul>
            </div>
            <span className={styles.divider}></span>
            <div className={styles.footer_company_wrapper}>
               <Typography color={"white"} variant={"h4"}>
                  Company
               </Typography>
               <ul>
                  <li>About Us</li>
                  <li>Terms & Conditions</li>
                  <li>Privacy Policy</li>
                  <li>FAQ</li>
               </ul>
            </div>
            <span className={styles.divider}></span>
            <div className={styles.footer_help_wrapper}>
               <Typography color={"white"} variant={"h4"}>
                  Help
               </Typography>
               <ul>
                  <li>Shopping & Change Policy</li>
                  <li>Contract Us</li>
                  <li>Store Locations</li>
               </ul>
            </div>
            <span className={styles.divider}></span>
            <div className={styles.footer_contract_wrapper}>
               <Typography color={"white"} variant={"h4"}>Contract</Typography>
               <ul>
                  <li>
                     <Icons name={"email"} size={"1.1rem"} />
                     Kobir.h.ritu@gmail.com</li>
                  <li>
                     <Icons name={"phone"} size={"1.1rem"} />
                     +88017XXXXXX
                  </li>
                  <li>
                     <div className={styles.social_icons}>
                        <span>
                           <Link to={"https://www.facebook.com/kabir.ritu"}>
                              <Icons name={"facebook"} size={"1.5rem"} color={"#fff"} />
                           </Link>
                        </span>
                        <span>
                           <Link to={"#"}>
                              <Icons name={"twitter"} size={"1.5rem"} color={"#fff"} />
                           </Link>
                        </span>
                        <span>
                           <Link to={"#"}>
                              <Icons name={"youtube"} size={"1.5rem"} color={"#fff"} />
                           </Link>
                        </span>
                        <span>
                           <Link to={"https://www.linkedin.com/in/kabir-hossain-07a69b238/"}>
                              <Icons name={"instagram"} size={"1.5rem"} color={"#fff"} />
                           </Link>
                        </span>
                     </div>
                  </li>
               </ul>
            </div>
         </div>
         <div className={styles.footer_copyright}>
            <div className={styles.payment_logo}>
               <Typography variant={"small"} color={"white"}>
                  We Accept
               </Typography>
               <div>
                  <img src="/assets/master.png" alt="master.png" />
                  <img src="/assets/visa.png" alt="visa.png" />
               </div>
            </div>
            <Typography color={"white"} variant={"small"}>Copyright &copy;  2023 | Kabir Hossain
            </Typography>
         </div>
      </footer>
   )
}

export default Footer;