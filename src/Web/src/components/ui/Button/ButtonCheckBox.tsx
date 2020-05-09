import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ButtonSize } from "./enums/ButtonSize";
import { ButtonType } from "./enums/ButtonType";
import { ButtonShape } from "./enums/ButtonShape";
import { getSizeClass, getTypeClass, getShapeClass } from "./Helpers";

import "./Button.scss";

interface IButtonLinkProps {
  size: ButtonSize;
  type: ButtonType;
  shape?: ButtonShape;
  label: string;
}


const ButtonCheckBox: FunctionComponent<IButtonLinkProps> = (props) => {
  const baseCssClass: string = "button button--checkbox";
  const cssClasses: string = [
    baseCssClass,
    getShapeClass(props.shape),
    getSizeClass(props.size),
    getTypeClass(props.type),
  ].join(" ");

  let state ={
	  active: false;
  }


  handleChecboxState = () => {
	let elem = document.getElementsByClassName;
			elem?.classList.toggle("change");
	}

  return (
    <>
      <button className={cssClasses} onClick={this.handleChecboxState.bind(this)}></button>
      {props.label}
    </>
  );
};

export default ButtonCheckBox;
