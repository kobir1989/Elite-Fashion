import React, { useState } from 'react';
import AddReview from './AddReview';
import ReviewList from './ReviewList';
import TabPanel from "../../../components/Common/TabPanel/TabPanel";
import { Tabs, Tab, Box, } from '@mui/material';
import { useGetReviewsQuery, useGetSelectedReviewQuery } from '../../../redux/features/reviews/reviewsApi';
import { useParams } from 'react-router-dom';

function a11yProps(index) {
   return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   };
}

const Review = () => {
   const [value, setValue] = useState(0);
   const [skipQuery, setSkipQuery] = useState(true)
   const [selectedReviewId, setSelectedReviewId] = useState(null)
   const { id } = useParams()
   const { data: reviews, isError, isLoading } = useGetReviewsQuery(id)
   const { data: getSelectedReview } = useGetSelectedReviewQuery(selectedReviewId, {
      skip: skipQuery,
      refetchOnMountOrArgChange: true
   })

   //tab value handler
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   //edit review handler
   const handleEditReveiw = (id) => {
      setSelectedReviewId(id)
      setValue(1)
      setSkipQuery(false)
   }

   return (
      <Box sx={{
         width: '100%', marginTop: "2rem",
      }}>
         <Box sx={(theme) => ({
            borderBottom: 1, borderColor: 'divider',
            [theme.breakpoints.down("sm")]: {
               display: "flex",
               alignItems: "center",
               justifyContent: "center"
            }
         })}>
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
            <ReviewList
               reviews={reviews?.reviews}
               isLoading={isLoading}
               isError={isError}
               handleEditReveiw={handleEditReveiw}
            />
         </TabPanel>
         <TabPanel value={value} index={1}>
            <AddReview
               setTabValue={setValue}
               getSelectedReview={getSelectedReview?.review}
               selectedReviewId={selectedReviewId}
            />
         </TabPanel>
      </Box >
   )
}

export default Review;