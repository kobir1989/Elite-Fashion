import React from 'react';
import "./Input.scss";

const Input = (props) => {
   const {
      name = "name",
      variant = "password",
      size = "md",
      placeHolder = "Name",
      label = "Name",
      ...otherProps
   } = props;
   return (
      <div className='input-wrapper'>
         <label htmlFor={name}>{label}</label>
         <input type={variant} className={`input ${size}`} placeholder={placeHolder}  {...otherProps} />
      </div>
   )
}

export default Input;