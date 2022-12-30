import React from 'react';
import "./Typography.scss";

const variantMap = {
   h1: "h1",
   h2: "h2",
   h3: "h3",
   h4: "h4",
   h5: "h5",
   h6: "h6",
   body: "p",
   small: "p"
}

const Typography = ({ variant, color, children, ...otherProps }) => {
   const Component = variant ? variantMap[variant] : "p";
   return (
      <Component
         className={`typography__variant-${variant} typography__color-${color}`}
         {...otherProps}
      >
         {children}
      </Component>
   )
}

export default Typography