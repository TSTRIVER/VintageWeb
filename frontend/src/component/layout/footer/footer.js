import React from "react";
import "./footer.css";
import logo from "../../Home/logo.png"

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={logo} alt="playstore" />
        <img src={logo} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>Vintage Lucknowee</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; VintageLucknowee</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="/">Instagram</a>
        <a href="https://www.youtube.com/@sayequahussain3738">Youtube</a>
        <a href="https://www.facebook.com/sayequa.hussain.1">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
