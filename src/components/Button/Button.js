import React from 'react';
import './Button.css';

const Button = (props) => {
  return (
    <button
      type={props.type || null}
      className={props.className || null}
      onClick={props.onClick || null}>
      {props.value || "Botão"}
    </button>
  );
}

export default Button;