import './App.css';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from "./component/Home/Home";
import Header from "./component/layout/header/Navbar";
import Footer from './component/layout/footer/footer';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from "./component/Product/Search";
import Loginsignup from './component/User/Loginsignup';
import store from "./store";
import {loader} from "./actions/userAction";
import { useSelector } from 'react-redux';
import UserOptions from "./component/layout/header/UserOptions";

function App(){

   store.dispatch(loader());

   const {isAuthenticated,user} = useSelector((state)=>state.user);

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
      </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
