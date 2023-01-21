import React from 'react';
import Typography from '../../../components/Common/Typography/Typography';
import styles from "../styles/ProfileInfo.module.scss";

const ProfileInfo = ({ userProfileData }) => {
   const { purchases } = userProfileData;
   return (
      <div className={styles.profile_info}>
         <Typography variant={"h4"}>Profile</Typography>
         <ul>
            <li>
               <Typography variant={"body"}>
                  Name:
               </Typography>
               <Typography variant={"body"}>
                  {userProfileData?.name}
               </Typography>
            </li>
            <li>
               <Typography variant={"body"}>
                  Email:
               </Typography>
               <Typography variant={"body"}>
                  {userProfileData?.email}
               </Typography>
            </li>
            <li>
               <Typography variant={"body"}>
                  Phone:
               </Typography>
               <Typography variant={"body"}>
                  {purchases && purchases.length ? purchases[0].phoneNumber : "0174XXXXXX"}
               </Typography>
            </li>
            <li>
               <Typography variant={"body"}>
                  Address:
               </Typography>
               <Typography variant={"body"}>
                  {purchases && purchases.length ? purchases[0].shippingAddress : "None"}
               </Typography>
            </li>
            <li>
               <Typography variant={"body"}>
                  City:
               </Typography>
               <Typography variant={"body"}>
                  {purchases && purchases.length ? purchases[0].city : "none"}
               </Typography>
            </li>
         </ul>
      </div>
   )
}

export default ProfileInfo