import React from 'react';
import "./styles/Button.scss";

const Button = (props) => {
   const { type = "button", variant = "primary", children, ...otherProps } = props;
   return (
      <button className={`button ${variant} `} type={type} {...otherProps}> {children}
      </button >
   )
}

export default Button;