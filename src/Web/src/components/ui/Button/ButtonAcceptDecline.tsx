import React, { FunctionComponent, useState } from "react";
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
  const baseCssClass: string = "button button--checkbox_noContent";
  const cssClasses: string = [
    baseCssClass,
    getShapeClass(props.shape),
    getSizeClass(props.size),
    getTypeClass(props.type),
  ].join(" ");

  const [activeAccept, setActiveAccept] = useState(true);
  const [activeDecline, setActiveDecline] = useState(true);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <button
        className={
          cssClasses + (!activeAccept ? "button--checkbox_active" : "")
        }
        onClick={
          !activeAccept
            ? () => setActiveAccept(true)
            : () => setActiveAccept(false)
        }
      >
        <i className="fa fa-check" aria-hidden="true"></i>
      </button>
      <button
        className={
          cssClasses + (!activeDecline ? "button--checkbox_active" : "")
        }
        onClick={
          !activeDecline
            ? () => setActiveDecline(true)
            : () => setActiveDecline(false)
        }
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </button>
      <div className={"button--checkbox-label"}>{props.label}</div>
    </>
  );
};

export default ButtonCheckBox;
