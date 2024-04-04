import {ReactNode} from "react";
import {DropzoneOptions, useDropzone} from "react-dropzone";
import classes from "./DragDrop.module.scss";

type DragDropProps = {
  children: ReactNode;
  dragActiveElement: ReactNode;
  dragInactiveElement: ReactNode;
} & DropzoneOptions;

const DragDrop = ({
                    children,
                    dragActiveElement,
                    dragInactiveElement,
                    ...dropzoneOptions
                  }: DragDropProps) => {
  const {getRootProps, getInputProps, isDragActive} =
    useDropzone(dropzoneOptions);

  return (
    <div className={`${classes["drag-drop-container"]}`}>
      <div
        {...getRootProps({
          className: `${classes["drag-drop"]} ${
            isDragActive ? classes["drag-drop--focused"] : ""
          }`,
        })}
      >
        <input {...getInputProps()} />
        {children}
        {isDragActive ? dragActiveElement : dragInactiveElement}
      </div>
    </div>
  );
};

export default DragDrop;
