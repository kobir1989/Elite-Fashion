import React from 'react';
import Rating from '@mui/material/Rating';

const Ratings = ({ value = 4 }) => {
   return (
      <div>
         <Rating name="read-only" sx={{ color: "#cc2121" }} value={value} readOnly />
      </div>
   )
}

export default Ratings;