import React from 'react'
import ReactStars from 'react-rating-stars-component'
import Rating from '@mui/material/Rating';

const ReviewCard = ({ review }) => {
  const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  
    return (
      <div className="reviewCard">
        <img src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg" alt="User" />
        <p>{review.name}</p>
        <Rating {...options} />
        <span className="reviewCardComment">{review.comment}</span>
      </div>
    );
  };
  
  export default ReviewCard;
