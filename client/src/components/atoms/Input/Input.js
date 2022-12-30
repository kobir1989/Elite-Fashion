import React from 'react';
import "./Input.scss";

const Input = (props) => {
   const {
      name = "name",
      varient = "password",
      size = "md",
      placeHolder = "Name",
      label = "Name",
      ...otherProps
   } = props;
   return (
      <div className='input-wrapper'>
         <label htmlFor={name}>{label}</label>
         <input type={varient} className={`input ${size}`} placeholder={placeHolder}  {...otherProps} />

      </div>
   )
}

export default Input;