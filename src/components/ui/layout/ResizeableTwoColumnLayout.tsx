import { MouseEvent, ReactNode, useEffect, useState } from "react";
import classes from "./ResizeableTwoColumnLayout.module.scss";

interface ResizeableTwoColumnLayoutProps {
  children: [ReactNode, ReactNode];
  col1ClassName?: string;
  col2ClassName?: string;
  resizeHandlerClassName?: string;
}

let isDragging = false;

const ResizeableTwoColumnLayout = ({
  children,
  col1ClassName,
  col2ClassName,
  resizeHandlerClassName,
}: ResizeableTwoColumnLayoutProps) => {
  const [col1Width, setCol1Width] = useState<number | null>(null);

  const handleResizeHandlerMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDragging = true;
  };

  const handleMouseUp = (
    e: MouseEvent<HTMLDivElement> | globalThis.MouseEvent
  ) => {
    if (!isDragging) return;
    isDragging = false;
  };

  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement> | globalThis.MouseEvent
  ) => {
    if (!isDragging) return;
    e.preventDefault();
    setCol1Width(e.clientX - 2);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={classes["wrapper"]}>
      <div
        className={`${col1ClassName ?? ""} ${classes["resizeable-col"]}`}
        style={
          col1Width !== null
            ? { width: `${col1Width}px`, flexGrow: 0, flexShrink: 0 }
            : {}
        }
      >
        {children[0]}
      </div>
      <div
        className={classes["resize-handler-container"]}
        onMouseDown={handleResizeHandlerMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div
          className={`${resizeHandlerClassName ?? ""} ${
            classes["resize-handler"]
          }`}
        ></div>
      </div>

      <div className={`${col2ClassName ?? ""} ${classes["resizeable-col"]}`}>
        {children[1]}
      </div>
    </div>
  );
};

export default ResizeableTwoColumnLayout;
