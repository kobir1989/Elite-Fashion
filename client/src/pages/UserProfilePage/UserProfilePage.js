import React, { useEffect, useState } from 'react';
import PageLayout from '../../layouts/PageLayout';
import styles from "./styles/UserProfilePage.module.scss";
import { Tabs, Tab } from '@mui/material';
import Typography from '../../components/Common/Typography/Typography';
import Icons from '../../components/Common/Icons/Icons';
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo } from "../../redux/actions/userProfileAction";
import { useParams } from "react-router-dom";
import WishlistCard from '../../components/Common/Card/WishlistCard';
import ProfileInfo from './Components/ProfileInfo';
import Orders from './Components/Orders';
import Settings from './Components/Settings';
import Button from '../../components/Common/Button/Button';
import { userLogout } from "../../redux/actions/authAction";
import TabPanel from './Components/TabPanel';

const a11yProps = (index) => {
   return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
   };
}

const tabData = [{ icon: 'person', label: 'Profile' }, { icon: 'love', label: 'Wishlist' }, { icon: 'bag', label: 'Orders' }, { icon: 'settings', label: 'Settings' }];

const UserProfilePage = () => {
   const [value, setValue] = React.useState(0);
   const [showToggle, setShowToggle] = useState(true)
   const { isLoading, error, userProfileData, userOrderData } = useSelector(state => state.userProfile)
   const dispatch = useDispatch();
   const { id } = useParams()
   useEffect(() => {
      dispatch(fetchUserInfo(id));
      if (error) {
         console.log(error, "ERROR")
         if (error.status === 401 || error.status === 403) {
            dispatch(userLogout())
         }
      }

   }, [id, dispatch, error])
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   console.log(userOrderData, "PROF")
   return (
      <PageLayout>
         <div className={styles.page_wrapper}>
            <div className={styles.toggle_btn}>
               {showToggle &&
                  <Button variant={"icon-btn-normal"}
                     onClick={() => setShowToggle(!showToggle)}>
                     <Icons size={"2.9rem"} color={"#116954"} name={"on"} />
                  </Button>
               }
               {!showToggle &&
                  <Button variant={"icon-btn-normal"}
                     onClick={() => setShowToggle(!showToggle)}>
                     <Icons size={"2.9rem"} color={"#cc2121"} name={"off"} />
                  </Button>}
            </div>
            <Typography variant={"h5"}>My Account</Typography>
            <div className={styles.profile_tab_wrapper}>
               {showToggle &&
                  <div className={styles.tabs_list}>
                     <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider', alignItems: "flex-start" }}
                     >
                        {tabData.map(({ icon, label }, index) => (
                           <Tab
                              sx={{ justifyContent: "start", textTransform: "capitalize" }}
                              icon={<Icons name={icon} />}
                              iconPosition="start"
                              label={label} {...a11yProps(index)}
                              key={index}
                           />
                        ))}
                     </Tabs>
                  </div>
               }
               <div className={styles.tab_panels}>
                  <TabPanel value={value} index={0}>
                     <ProfileInfo userProfileData={userProfileData} />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                     <WishlistCard showCross={false} />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                     <Orders userOrderData={userOrderData}
                        userProfileData={userProfileData}

                     />
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                     <Settings />
                  </TabPanel>
               </div>
            </div>
         </div>
      </PageLayout>
   )
}

export default UserProfilePage;