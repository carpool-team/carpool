import React, { Component } from "react";
import { NavBar } from "../NavBar/NavBar";
import { Footer } from "../Footer/Footer";
import "./LoadingScreen.scss";

export default class LoadingScreen extends Component {
  render: () => JSX.Element = () => {
    return (
      <div>
        <NavBar />
        <div className="map">
          <div className="quote">Share a ride</div>
        </div>
        <Footer />
      </div>
    );
  };
}
