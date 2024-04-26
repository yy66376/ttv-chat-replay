import classes from "./Code.module.scss";
import { PropsWithChildren } from "react";

type CodeProps = {} & PropsWithChildren;

const Code = ({ children }: CodeProps) => {
  return <code className={classes["code"]}>{children}</code>;
};

export default Code;
