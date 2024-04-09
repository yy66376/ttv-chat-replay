import { PropsWithChildren } from "react";
import { BsFillSignStopFill } from "react-icons/bs";
import classes from "./DragDropErrorText.module.scss";
import Icon from "./Icon";

export type DragDropErrorTextProps = {} & PropsWithChildren;

const DragDropErrorText = ({ children }: DragDropErrorTextProps) => {
  return (
    <p className={classes["drag-drop__error_text"]}>
      <Icon verticalAlign="middle" className={classes["drag-drop__stop-icon"]}>
        <BsFillSignStopFill />
      </Icon>{" "}
      {children}
    </p>
  );
};

export default DragDropErrorText;
