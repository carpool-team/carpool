import React from "react";
import "./NavBar.scss";

export const NavBar = () => {
  return (
    <>
      <div id="container" className="navBarContainer">
        <div className="logoContainer">
          @ts-ignore
          <img
            src={require("../../assets/logo_small.png")}
            alt="logo"
            className="logo"
          />
        </div>
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
    </>
  );
};
