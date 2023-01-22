import React, { useEffect } from 'react';
import PageLayout from '../../layouts/PageLayout';
import styles from "./styles/UserProfilePage.module.scss";
import PropTypes from 'prop-types';
import { Tabs, Tab, Box } from '@mui/material';
import Typography from '../../components/Common/Typography/Typography';
import Icons from '../../components/Common/Icons/Icons';
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo } from "../../redux/actions/userProfileAction";
import { useParams } from "react-router-dom";
import WishlistCard from '../../components/Common/Card/WishlistCard';
import ProfileInfo from './Components/ProfileInfo';
import Orders from './Components/Orders';
import Settings from './Components/Settings';

const TabPanel = (props) => {
   const { children, value, index, ...other } = props;
   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`vertical-tabpanel-${index}`}
         aria-labelledby={`vertical-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box sx={{ p: 3 }}>
               {children}
            </Box>
         )}
      </div>
   );
}
TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
   return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
   };
}

// const tabLabel = [
//    {
//       label: "Profile",
//       icon: "person"
//    },
//    {
//       label: "Wishlists",
//       icon: "love"
//    },
//    {
//       label: "Orders",
//       icon: "bag"
//    },
//    {
//       label: "Settinngs",
//       icon: "settings"
//    }
// ]

const UserProfilePage = () => {
   const [value, setValue] = React.useState(0);

   const { isLoading, error, userProfileData } = useSelector(state => state.userProfile)
   const dispatch = useDispatch();
   const { id } = useParams()
   useEffect(() => {
      dispatch(fetchUserInfo(id))
   }, [id, dispatch])
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   return (
      <PageLayout>
         <div className={styles.page_wrapper}>
            <Typography variant={"h5"}>My Account</Typography>
            <div className={styles.profile_tab_wrapper}>
               <div className={styles.tabs_list}>
                  <Tabs
                     orientation="vertical"
                     value={value}
                     onChange={handleChange}
                     aria-label="Vertical tabs example"
                     sx={{ borderRight: 1, borderColor: 'divider', alignItems: "flex-start" }}
                  >
                     <Tab
                        sx={{ justifyContent: "start", textTransform: "capitalize" }}
                        icon={<Icons name={"person"} />}
                        iconPosition="start"
                        label="Profile" {...a11yProps(0)} />
                     <Tab
                        sx={{ justifyContent: "start", textTransform: "capitalize" }}
                        icon={<Icons name={"love"} />}
                        iconPosition="start"
                        label="Wishlist" {...a11yProps(1)} />
                     <Tab
                        sx={{ justifyContent: "start", textTransform: "capitalize" }}
                        icon={<Icons name={"bag"} />}
                        iconPosition="start"
                        label="Orders" {...a11yProps(2)} />
                     <Tab
                        sx={{ justifyContent: "start", textTransform: "capitalize" }}
                        icon={<Icons name={"settings"} />}
                        iconPosition="start"
                        label="Settings" {...a11yProps(3)} />
                  </Tabs>
               </div>
               <div className={styles.tab_panels}>
                  <TabPanel value={value} index={0}>
                     <ProfileInfo userProfileData={userProfileData} />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                     <WishlistCard showCross={false} />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                     <Orders userProfileData={userProfileData} />
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