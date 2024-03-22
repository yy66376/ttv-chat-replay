import { IconContext } from "react-icons";
import { PropsWithChildren } from "react";
import classes from "./Icon.module.scss";

export type IconProps = {
  verticalAlign?: "top" | "middle" | "bottom";
} & IconContext &
  PropsWithChildren;

const Icon = ({ children, verticalAlign, ...restProps }: IconProps) => {
  let iconClass = "";
  switch (verticalAlign) {
    case "top":
      iconClass = classes["icon--top"];
      break;
    case "middle":
      iconClass = classes["icon--middle"];
      break;
    case "bottom":
      iconClass = classes["icon--bottom"];
      break;
    default:
      iconClass = "bottom";
  }
  return (
    <IconContext.Provider
      value={{ ...restProps, className: `${iconClass} ${restProps.className}` }}
    >
      {children}
    </IconContext.Provider>
  );
};

export default Icon;
