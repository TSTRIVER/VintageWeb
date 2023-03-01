import React, { useState } from "react";
import { FaSearch,FaShoppingCart} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import UserOptions from "./UserOptions";
import { useSelector } from "react-redux";

const Navbar = ()=>{
    const [showMediaIcons, setShowMediaIcons] = useState(false);
    const {isAuthenticated,user} = useSelector((state)=>state.user);

    return(
        <>
           <div className="main-nav">
              <div className = "logo">
                   <h2>
                     <span>V</span>intage
                     <span> L</span>ucknowee
                   </h2>
              </div> 
              <div className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
                  <ul>
                  <li>
              <NavLink to="/" className="navlinker">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products" className="navlinker">products</NavLink>
            </li>
            <li>
              <NavLink to="/contacts" className="navlinker">contact</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="navlinker">about</NavLink>
            </li>
            <li className="icons-hider">
              <NavLink to="/search"><FaSearch/></NavLink>
            </li>
            <li className="icons-hider">
              <NavLink to="/cart"><FaShoppingCart color="primary"/></NavLink>
            </li>
            <li className="icons-hider">
              <NavLink to="/login"><CgProfile/></NavLink>
            </li>
                  </ul>
              </div>
              <div className = "cart-order">
                 <ul className="cart-order-desktop">
                     <li>
                        <NavLink to ="/search" className="search">
                        <FaSearch style = {{color : "black"}}/>
                        </NavLink>
                     </li>
                     <li>
                        <NavLink to ="/cart" className = "cart">
                        <FaShoppingCart style = {{color : "black"}}/>
                        </NavLink>
                     </li>
                     {
                        isAuthenticated ? <UserOptions user = {user}/> : <li>
                                                          <NavLink to ="/login" className="contacts">
                        <CgProfile style = {{color : "black"}}/>
                        </NavLink>
                        </li>
                     }
                 </ul>
                 <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu/>
            </a>
        </div>
              </div>
           </div>
           {/*
           <div className="hero-section">
             <img src={logo} className="image"/>
           </div>
           <div className="hero-section">
               <p>Welcome to</p>
               <h1>Vintage Lucknowee</h1>
           </div>
           <div className="hero-section">
               <p>Welcome to</p>
               <h1>Vintage Lucknowee</h1>
           </div>
           <div className="hero-section">
               <p>Welcome to</p>
               <h1>Vintage Lucknowee</h1>
           </div>
           <div className="hero-section">
               <p>Welcome to</p>
               <h1>Vintage Lucknowee</h1>
           </div>
           <div className="hero-section">
               <p>Welcome to</p>
               <h1>Vintage Lucknowee</h1>
           </div>
           <div className="hero-section">
               <p>Welcome to</p>
               <h1>Vintage Lucknowee</h1>
           </div>
           <div className="hero-section">
               <p>Welcome to</p>
               <h1>Vintage Lucknowee</h1>
           </div>
        */}
        </>
    )
}

export default Navbar;