import React from 'react';
import {Link} from "react-router-dom";
import Rating from '@mui/material/Rating';


const Product = ({product}) => {
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
   
  return (
    <>
     <Link className="productCard" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} style={{borderRadius : "10%",height: "20vmax"}}/>
        <p>{product.name}</p>
        <div className='cont'>
            <Rating {...options}/> <span className='productCardSpan'>({product.numOfReviews} Reviews)</span>
        </div>
            <span>{`₹${product.price}`}</span>
     </Link>
    </>
  )
}

export default Product;
