import React, { FunctionComponent } from "react";
import { ButtonSize } from "./enums/ButtonSize";
import { ButtonType } from "./enums/ButtonType";
import { ButtonShape } from "./enums/ButtonShape";
import { getSizeClass, getTypeClass, getShapeClass } from "./Helpers";

import "./Button.scss";

interface IButtonProps {
  size?: ButtonSize;
  type?: ButtonType;
  shape?: ButtonShape;
  onClick?: () => void;
}

const Button: FunctionComponent<IButtonProps> = (props) => {
  const btnClick = (event: React.MouseEvent) => {
    if (props.onClick) {
      props.onClick();
    } else {
      event.preventDefault();
    }
  };

  const baseCssClass: string = "button";
  const cssClasses: string = [
    baseCssClass,
    getSizeClass(props.size),
    getTypeClass(props.type),
    getShapeClass(props.shape),
  ].join(" ");

  return (
    <button className={cssClasses} onClick={btnClick}>
      {props.children}
    </button>
  );
};

export default Button;
