import React from 'react';
import './Button.css';

const Button = (props) => {
  return (
    <button type={props.type || "button"}>{props.value}</button>
  );
}

export default Button;