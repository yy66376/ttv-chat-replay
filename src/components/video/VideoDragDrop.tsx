import { useCallback, useMemo, useState } from "react";
import { FileRejection } from "react-dropzone";
import { RiVideoUploadLine } from "react-icons/ri";
import { FaTwitch } from "react-icons/fa6";
import DragDrop from "../DragDrop";
import BlockIcon from "../BlockIcon";
import Icon from "../Icon";
import DragDropErrorText from "../DragDropErrorText";
import Code from "../ui/text/Code";
import classes from "./VideoDragDrop.module.scss";
import { useRootDispatch } from "../../hooks/useRootDispatch";
import { setSources } from "../../store/redux/features/video/videoSlice";

const VideoDragDrop = () => {
  const dispatch = useRootDispatch();
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

  const handleDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setRejectedFiles(rejectedFiles);

      if (rejectedFiles.length === 0 && acceptedFiles.length === 1) {
        dispatch(setSources([URL.createObjectURL(acceptedFiles[0])]));
      }
    },
    [dispatch]
  );

  const dragActiveElement = useMemo(() => {
    return (
      <p className={classes["drag-drop__text"]}>Drop your video here...</p>
    );
  }, []);

  const dragInactiveElement = useMemo(() => {
    return (
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
    );
  }, [rejectedFiles.length]);

  return (
    <DragDrop
      dragActiveElement={dragActiveElement}
      dragInactiveElement={dragInactiveElement}
      onDrop={handleDrop}
      accept={{
        "video/*": [".mp4", ".webm"],
      }}
      multiple={false}
    >
      <BlockIcon className={classes["drag-drop__upload-icon"]}>
        <RiVideoUploadLine />
      </BlockIcon>
    </DragDrop>
  );
};

export default VideoDragDrop;
