import React from 'react';
import Typography from '../../../components/Common/Typography/Typography';
import styles from "../styles/ProfileInfo.module.scss";
import TextSkeleton from "../../../components/Common/Skeleton/TextSkeleton";

const ProfileInfo = ({ userProfileData, isLoading }) => {
   return (
      <div className={styles.profile_info}>
         <div className={styles.profile_img}>
            <img src={userProfileData?.profilePic || "/assets/user.jpg"} alt="user.png" />
         </div>
         {isLoading ?
            <TextSkeleton row={3} height={34} />
            :
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
                     {userProfileData?.phone || "None"}
                  </Typography>
               </li>
               <li>
                  <Typography variant={"body"}>
                     Address:
                  </Typography>
                  <Typography variant={"body"}>
                     {userProfileData?.address || "None"}
                  </Typography>
               </li>
               <li>
                  <Typography variant={"body"}>
                     City:
                  </Typography>
                  <Typography variant={"body"}>
                     {userProfileData?.city || "None"}
                  </Typography>
               </li>
            </ul>
         }

      </div>
   )
}

export default ProfileInfo