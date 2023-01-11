import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const CardSkeleton = (
   {
      width,
      height,
      variant,
      col = 1,
      animation,
      ...otherProps
   }
) => {
   const colArr = [];
   for (let i = 0; i < col; i++) {
      colArr.push(i)
   }
   // console.log(rowArr)
   return (
      <>
         {colArr.map((col, i) => (
            <div key={i} {...otherProps}>
               <Skeleton
                  variant={variant || "rectangular"}
                  width={width || 210}
                  height={height || 60}
                  animation={animation || "pulse"}
               />
            </div>
         ))}
      </>
   );
};

export default CardSkeleton;