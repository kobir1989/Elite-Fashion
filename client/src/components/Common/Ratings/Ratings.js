import React from 'react';
import Rating from '@mui/material/Rating';

const Ratings = ({ value = 4 }) => {
   return (
      <div>
         <Rating name="read-only" value={value} size="small" readOnly />
      </div>
   )
}

export default Ratings;