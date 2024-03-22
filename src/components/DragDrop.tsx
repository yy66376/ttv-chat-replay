import { useCallback, useContext, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { RiVideoUploadLine } from "react-icons/ri";
import { FaTwitch } from "react-icons/fa6";
import classes from "./DragDrop.module.scss";
import BlockIcon from "./BlockIcon";
import Icon from "./Icon";
import Code from "./Code";
import DragDropErrorText from "./DragDropErrorText";
import { VideoPlayerContext } from "../store/video-player-context";

const DragDrop = () => {
  const { onSetSources } = useContext(VideoPlayerContext);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

  const handleDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setRejectedFiles(rejectedFiles);

      if (rejectedFiles.length === 0 && acceptedFiles.length === 1) {
        onSetSources([{ src: URL.createObjectURL(acceptedFiles[0]) }]);
      }
    },
    [onSetSources]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "video/*": [".mp4", ".webm"],
    },
    multiple: false,
  });

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
        <BlockIcon className={classes["drag-drop__upload-icon"]}>
          <RiVideoUploadLine />
        </BlockIcon>
        {isDragActive ? (
          <p className={classes["drag-drop__text"]}>Drop your video here...</p>
        ) : (
          <>
            <p className={classes["drag-drop__text"]}>
              Select or drag n' drop your favorite{" "}
              <Icon verticalAlign="middle" color="#6441a5">
                <FaTwitch />
              </Icon>{" "}
              VOD!
            </p>
            {rejectedFiles.length === 1 && (
              <DragDropErrorText>
                Only <Code>MP4</Code> and <Code>WEBM</Code> file formats are
                supported.
              </DragDropErrorText>
            )}
            {rejectedFiles.length > 1 && (
              <DragDropErrorText>
                Only <b>one</b> video file is supported at a time.
              </DragDropErrorText>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DragDrop;
