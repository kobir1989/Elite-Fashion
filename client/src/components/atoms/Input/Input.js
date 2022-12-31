import React from 'react';
import TextField from '@mui/material/TextField';

const Input = ({
   width,
   error,
   type,
   label,
   color,
   errorMessage,
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
            fullWidth={width || false}
            required
            helperText={errorMessage || ""}
            {...otherProps}
         />
      </div>
   )
}

export default Input;