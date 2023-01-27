import React from 'react';
import { InputLabel, MenuItem, FormControl, Select, FormHelperText } from '@mui/material';
import { v4 } from 'uuid';

const SelectOptions = (
   {
      value,
      label,
      error = false,
      errorMessage,
      options = [],
      ...otherProps
   }) => {

   return (
      <FormControl
         fullWidth
         style={{ width: "50%" }}
         required
         sx={{ height: "4rem", width: "100%" }}
         size='small'
         error={value === "" && error}>
         <InputLabel>{label}</InputLabel>
         <Select
            value={value}
            label="Age"
            {...otherProps}
         >
            {options.map((option) => (
               <MenuItem value={option} key={v4()}>{option}</MenuItem>
            ))}
         </Select>
         <FormHelperText>{value === "" && errorMessage}</FormHelperText>
      </FormControl>
   )
};

export default SelectOptions;