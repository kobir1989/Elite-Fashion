import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectOptions = ({ handleChange, size, label, options = [] }) => {
   return (
      <FormControl fullWidth>
         <InputLabel>{label}</InputLabel>
         <Select
            // value={size}
            label="Age"
         // onChange={handleChange}
         >
            {options.map((option) => (
               <MenuItem >{option}</MenuItem>
            ))}
         </Select>
      </FormControl>
   )
};

export default SelectOptions;