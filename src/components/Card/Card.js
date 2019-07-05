import React from 'react';
import './Card.css';

const Card = (props) => {
  return(
    <a href={props.href} target={props.target} className="card">
      <div className="image">
        <img src={props.image}></img>
      </div>
      <div className="details">
        <h3>{props.name}</h3>
        <div className="star">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" fill="none"><path d="M9.55.927c.3-.92 1.603-.92 1.902 0l1.63 5.02a1 1 0 0 0 .951.691h5.278c.97 0 1.37 1.24.588 1.81l-4.27 3.102a1 1 0 0 0-.363 1.118l1.63 5.02c.3.92-.755 1.687-1.54 1.118l-4.27-3.102a1 1 0 0 0-1.176 0l-4.27 3.102c-.784.57-1.838-.197-1.54-1.118l1.63-5.02a1 1 0 0 0-.363-1.118l-4.27-3.102c-.784-.57-.38-1.81.588-1.81h5.278a1 1 0 0 0 .951-.691L9.55.927z" fill="#ffd651"/></svg>
          <span>{props.rating}</span>
        </div>
        <span className="categories">{props.category}</span>
      </div>
    </a>
  );
}

export default Card;