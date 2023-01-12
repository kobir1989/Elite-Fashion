import React from 'react';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';

const SelectOptions = (
   {
      value,
      label,
      error = false,
      options = [],
      ...otherProps
   }) => {

   return (
      <FormControl
         fullWidth
         required
         error={error}>
         <InputLabel>{label}</InputLabel>
         <Select
            value={value}
            label="Age"
            {...otherProps}
         >
            {options.map((option) => (
               <MenuItem value={option}>{option}</MenuItem>
            ))}
         </Select>
      </FormControl>
   )
};

export default SelectOptions;