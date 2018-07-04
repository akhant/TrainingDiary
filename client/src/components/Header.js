import React from "react";
import { Image } from "react-bootstrap";
import logo from "../assets/images/logo_middle.png";

const Header = () => (
  <div className="header">
    <span className="image_span">
      <Image src={logo} alt="logo" />
    </span>

    <h1 className="main_h1">Training diary</h1>
    <div className="hr" />
  </div>
);

export default Header;
