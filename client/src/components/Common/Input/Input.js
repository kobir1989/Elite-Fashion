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
      <div>
         <TextField
            color={color || "secondary"}
            error={error || false}
            sx={{ m: "1rem 0" }}
            id="outlined-error"
            type={type || "text"}
            label={label || "Required"}
            fullWidth={full || false}
            size={size || "normal"}
            helperText={errorMessage || ""}
            {...otherProps}
         />
      </div>
   )
}

export default Input;