import React from 'react';
import TextField from '@mui/material/TextField';

const Input = ({
   full,
   error,
   type,
   label,
   color,
   errorMessage,
   size,
   required,
   ...otherProps
}) => {

   return (
      <TextField
         color={color || "secondary"}
         error={error || false}
         sx={{ m: ".7rem 0" }}
         type={type || "text"}
         label={label || "Required"}
         fullWidth={full || false}
         size={size || "normal"}
         helperText={errorMessage || ""}
         {...otherProps}
      />
   )
}

export default Input;