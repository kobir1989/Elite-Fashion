import React from 'react';
import styles from "./Footer.module.scss";
import Typography from "../Common/Typography/Typography";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import InstagramIcon from '@mui/icons-material/Instagram';
import Divider from '@mui/material/Divider';

const Footer = () => {
   return (
      <footer>
         <div className={styles.footer}>
            <div className={styles.footer_service_wrapper}>
               <Typography color={"white"} variant={"h4"}>Services</Typography>
               <ul>
                  <li>Men's Collection</li>
                  <li>Women's Collection</li>
                  <li>Size Guide</li>
               </ul>
            </div>
            <span className={styles.divider}></span>
            <div className={styles.footer_company_wrapper}>
               <Typography color={"white"} variant={"h4"}>Company</Typography>
               <ul>
                  <li>About Us</li>
                  <li>Terms & Conditions</li>
                  <li>Privacy Policy</li>
                  <li>FAQ</li>
               </ul>
            </div>
            <span className={styles.divider}></span>
            <div className={styles.footer_help_wrapper}>
               <Typography color={"white"} variant={"h4"}>Help</Typography>
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
                  <li><EmailIcon /> Kobir.h.ritu@gmail.com</li>
                  <li><LocalPhoneIcon /> +8801746668064</li>
               </ul>
            </div>
         </div>
         <div className={styles.footer_social_icons}>
            <span><FacebookIcon /></span>
            <span><TwitterIcon /></span>
            <span><YouTubeIcon /></span>
            <span><InstagramIcon /></span>
         </div>
         <div className={styles.footer_copyright}>
            <Typography color={"white"} variant={"small"}>Copyright &copy;  2023 | Kabir Hossain
            </Typography>
         </div>
      </footer>
   )
}

export default Footer;