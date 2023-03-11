import React, { useState } from 'react';
import AddReview from './AddReview';
import ReviewList from './ReviewList';
import TabPanel from "../../../components/Common/TabPanel/TabPanel";
import { Tabs, Tab, Box, } from '@mui/material';

function a11yProps(index) {
   return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   };
}

const Review = () => {
   const [value, setValue] = React.useState(0);
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   return (
      <Box sx={{ width: '100%', marginTop: "2rem" }}>
         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
               TabIndicatorProps={
                  {
                     sx: { backgroundColor: "#cc2121", height: "4px", borderRadius: "8px" }
                  }} value={value}
               onChange={handleChange}
               aria-label="basic tabs example"
            >
               <Tab
                  sx={{ textTransform: "capitalize" }}
                  label="Reviews" {...a11yProps(0)}
               />
               <Tab
                  sx={{ textTransform: "capitalize" }}
                  label="Write a Review" {...a11yProps(1)}
               />
            </Tabs>
         </Box>
         <TabPanel value={value} index={0}>
            <ReviewList />
         </TabPanel>
         <TabPanel value={value} index={1}>
            <AddReview />
         </TabPanel>
      </Box >
   )
}

export default Review;