import React from 'react'
import { useEffect} from 'react';
import {useParams} from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css"
import { useSelector, useDispatch } from "react-redux";
import {getProductDetails} from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard"
import Loader from "../layout/loader/Loader";
import MetaData from "../layout/MetaData";

const ProductDetails = ({match}) => {
        const dispatch = useDispatch();
        const { product, loading, error } = useSelector(
          (state) => state.productDetails
        );
       const {id} = useParams();

        useEffect(()=>{
            dispatch(getProductDetails(id));
        },[dispatch,id]);

        const options = {
          size: "large",
          value: product.ratings,
          readOnly: true,
          precision: 0.5,
        };

  return (
    <>
      <MetaData title = {`${product.name}`}/>
       {loading ? <Loader/> : <>
       <div>
            <div>
              <Carousel className="caros">
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
              </div>
         </div>
          <div id="ProductDetails">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input type="number" value="1"/>
                    <button>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button className="submitReview">
                Submit Review
              </button>
          </div>
          <div id="review_div">
          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
          </div>
       </>}
    </>
  )
}

export default ProductDetails;