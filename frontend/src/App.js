import './App.css';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from "./component/Home/Home";
import Header from "./component/layout/header/Navbar";
import Footer from './component/layout/footer/footer';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from "./component/Product/Search";
import Loginsignup from './component/User/Loginsignup';
import Store from "./Store";
import {loader} from "./actions/userAction";
import { useSelector } from 'react-redux';
import UserOptions from "./component/layout/header/UserOptions";
import { useEffect } from 'react';
import Profile from './component/User/Profile';
import UpdateProfile from "./component/User/UpdateProfile"
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from './component/User/ResetPassword';
import Cart from "./component/Cart/Cart"
import Dashboard from './component/Admin/Dashboard';
import ProductsList from "./component/Admin/ProductsList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct"

function App(){

   const {isAuthenticated,user} = useSelector((state)=>state.user);

   useEffect(() =>{
       Store.dispatch(loader());
   }, [])
   
  return (
    <>
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user = {user}/>}
      <Routes>
         <Route exact path="/" element={<Home/>}></Route>
         <Route exact path="/product/:id" element={<ProductDetails/>}></Route>
         <Route exact path="/products" element={<Products/>}></Route>
         <Route path="/products/:keyword" element={<Products/>}></Route>
         <Route exact path = "/search" element = {<Search/>}></Route>
         <Route exact path = "/login" element = {<Loginsignup/>}></Route>

         {isAuthenticated ? <Route exact path = "/account" element = {<Profile/>}></Route> : <Route exact path = "/login" element = {<Loginsignup/>}></Route>}

         {isAuthenticated ? <Route exact path = "/me/update" element = {<UpdateProfile/>}></Route> : <Route exact path = "/login" element = {<Loginsignup/>}></Route>}
         
         {isAuthenticated ? <Route exact path = "/password/update" element = {<UpdatePassword/>}></Route> : <Route exact path = "/login" element = {<Loginsignup/>}></Route>}

         <Route exact path="/password/forgot" element={<ForgotPassword/>}></Route>
         <Route exact path = "/password/reset/:token" element = {<ResetPassword/>}></Route>
         <Route exact path = "/cart" element = {<Cart/>}></Route>

         {isAuthenticated && user.role === 'admin' ? <Route exact path = "/admin/dashboard" element = {<Dashboard/>}></Route> : <Route exact path = "/login" element = {<Loginsignup/>}></Route>}

         {isAuthenticated && user.role === 'admin' ? <Route exact path = "/admin/products" element = {<ProductsList/>}></Route> : <Route exact path = "/login" element = {<Loginsignup/>}></Route>}

         {isAuthenticated && user.role === 'admin' ? <Route exact path = "/admin/product" element = {<NewProduct/>}></Route> : <Route exact path = "/login" element = {<Loginsignup/>}></Route>}

         {isAuthenticated && user.role === 'admin' ? <Route exact path = "/admin/product/:id" element = {<UpdateProduct/>}></Route> : <Route exact path = "/login" element = {<Loginsignup/>}></Route>}


      </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
