import React, { useState } from 'react'
import { useEffect } from 'react';
import "./Products.css";
import {useSelector,useDispatch} from "react-redux";
import {clearErrors, getProduct} from "../../actions/productAction";
import Loader from "../layout/loader/Loader";
import Product from "../Home/Product";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import MetaData from "../layout/MetaData";


const Products = ({match}) => {

    const dispatch = useDispatch();

    const [currentPage,setCurrentPage] = useState(1);

    const {products,loading,error,productsCount,resultPerPage} = useSelector((state)=>state.products);

    const {keyword} = useParams();

    const setCurrentPageNo = (e)=>{
       setCurrentPage(e);
    }

   useEffect(() => {
      dispatch(getProduct(keyword,currentPage));
   }, [dispatch,keyword,currentPage])

  

  return (
    <>
      <MetaData title = "Vintage Products"/>
       {
         loading ? <Loader/> : <>
            <h2 className='productsHeading'>
                Products
            </h2>
            <div className='products'>
                {products && products.map((product)=>(
                    <Product key = {product._id} product = {product}/>
                ))}
            </div>
            {resultPerPage < productsCount && <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>}
         </>
       }
    </>
  )
}

export default Products