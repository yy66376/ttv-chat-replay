import classes from "./Code.module.scss";
import { ReactNode } from "react";

interface CodeProps {
  /**
   * The text (typically a snippet of code) to render.
   */
  children: ReactNode;
}

/**
 * UI component for rendering text (typically a snippet of code) in a monospace font with a light purple background.
 */
const Code = ({ children }: CodeProps) => {
  return <code className={classes["code"]}>{children}</code>;
};

export default Code;
