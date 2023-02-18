import React, {useEffect} from "react";
import "./Home.css";
import logo from "../Home/logo.png"
import { CgMouse } from "react-icons/cg";
import Product from "./Product";
import MetaData from "../layout/MetaData";
import {getProduct} from "../../actions/productAction";
import {useDispatch,useSelector} from "react-redux";
import Loader from "../layout/loader/Loader";
import {useAlert} from "react-alert";

const Home = ()=>{

  const alert = useAlert();
  const dispatch = useDispatch();

    
    const {loading,error,products,productsCount} = useSelector((state)=>state.products);
    
    useEffect(() => {
      if(error){
        return alert.error(error);
      }
      dispatch(getProduct());
    }, [dispatch,error,alert])

    return(
        <>
         {loading ? <Loader/> : <>
         <MetaData title = "Vintage Lucknowee"/>
           <div className="hero-section">
             <img src={logo} className="image" alt="logo"/>
           </div>

          <div className="main-div">
            <h1 className="h1p">Welcome to Vintage Lucknowee</h1>
            <p className="h1p">Your 1-stop Destination to the world of chikankari</p>
            <button id="btn" className="h1p">
                Scroll <CgMouse/>
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" className="svgmod" viewBox="0 0 1440 320"><path fill="#FFFFFF" fill-opacity="1" d="M0,288L40,277.3C80,267,160,245,240,224C320,203,400,181,480,197.3C560,213,640,267,720,277.3C800,288,880,256,960,224C1040,192,1120,160,1200,144C1280,128,1360,128,1400,128L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
          </div>
           
          <div className="prod-section">
               <h1 id="prod-head">Featured Products</h1>
           </div>

           <div className="container" id="container">
            {
                products && products.map((product)=><Product product = {product}/>)
            }
           </div>
           </>
           }
     </>
    )
}

export default Home;