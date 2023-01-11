import React from 'react'
import Skeleton from '@mui/material/Skeleton';
const TextSkeleton = (
   {
      height,
      row = 1,
      animation,
      ...otherProps }
) => {

   const rowArr = [];
   for (let i = 0; i < row; i++) {
      rowArr.push(i)
   }
   return (
      <div {...otherProps}>
         {rowArr.map((row, i) => (
            <div key={i} style={{ marginBottom: "0.8rem" }}>
               <Skeleton
                  variant={"rectangular"}
                  width={"100%"}
                  height={height || 20}
                  animation={animation || "wave"}
                  sx={{ mb: "0.8rem" }}
               />
               <Skeleton
                  variant={"rectangular"}
                  width={"90%"}
                  height={height || 18}
                  animation={animation || "wave"}
               />
            </div>
         ))}
      </div>
   )
}

export default TextSkeleton;