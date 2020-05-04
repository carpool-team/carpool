import React from "react";
import "./NavBar.scss";

export class NavBar extends React.Component {
  state = {
    logged: false,
    hamburgerActive: false,
  };

  handleHamburgerClick = () => {
    let elem = document.getElementById("hamburgerIcon");
    elem?.classList.toggle("change");
    let menu = document.getElementById("navButtons");
    menu?.classList.toggle("hamburgerToogle");
  };

  render() {
    return (
      <div id="container" className="navBarContainer">
        <div className="logoContainer"></div>
        <div className="navButtons hamburgerToogle" id="navButtons">
          <nav className="navPlain">
            <a className="navButtonPlain " href="/">
              Pasażer
            </a>
            <a className="navButtonPlain " href="/">
              Kierowca
            </a>
            <a className="navButtonPlain " href="/">
              Firma
            </a>
          </nav>
          <nav className="navAccount">
            <button className="navButtonLogin">Zaloguj się</button>
            <button className="navButtonRegister">Zarejestruj się</button>
          </nav>
        </div>
        <div
          id="hamburgerIcon"
          className="hamburgerIcon"
          onClick={this.handleHamburgerClick.bind(this)}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </div>
    );
  }
}
