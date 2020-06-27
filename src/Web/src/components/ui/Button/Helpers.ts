import { ButtonSize } from "./enums/ButtonSize";
import { ButtonType } from "./enums/ButtonType";
import { ButtonShape } from "./enums/ButtonShape";

export const getSizeClass: (size?: ButtonSize) => void = (size) => {
  switch (size) {
    case ButtonSize.Large:
      return "button--large";
    default:
      return "button--standard";
  }
};
export const getTypeClass: (type?: ButtonType) => void = (type) => {
  switch (type) {
    case ButtonType.Danger:
      return "button--danger";
    case ButtonType.Info:
      return "button--info";
    case ButtonType.Success:
      return "button--success";
    default:
      return "";
  }
};
export const getShapeClass: (type?: ButtonShape) => void = (shape) => {
  switch (shape) {
    case ButtonShape.Rectangle:
      return "button--rectangle";
    case ButtonShape.Circle:
      return "button--circle";
    case ButtonShape.NavBar:
      return "button--navbar"
    default:
      return "button--rectangle";
  }
};
