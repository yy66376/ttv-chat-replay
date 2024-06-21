import DragDrop from "../DragDrop";
import { FaFileUpload } from "react-icons/fa";
import BlockIcon from "../BlockIcon";
import { useCallback, useMemo, useState } from "react";
import { FileRejection } from "react-dropzone";
import { ChatFile } from "./Chat";
import classes from "./ChatDragDrop.module.scss";
import Icon from "../Icon";
import { FaTwitch } from "react-icons/fa6";
import DragDropErrorText from "../DragDropErrorText";
import Code from "../ui/text/Code";

enum Error {
  TooManyFiles,
  IncorrectFileType,
  IncorrectFileFormat,
}

interface ChatDragDropProps {
  onParseChatFile: (chatFile: ChatFile) => void;
}

const ChatDragDrop = ({ onParseChatFile }: ChatDragDropProps) => {
  const [error, setError] = useState<Error | null>(null);

  const handleDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length === 1) {
        setError(Error.IncorrectFileType);
        return;
      } else if (rejectedFiles.length > 1) {
        setError(Error.TooManyFiles);
        return;
      }

      const chatTextPromise = new Promise<string | null | undefined>(
        (resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.onload = (event) =>
            resolve(event.target?.result as string);
          fileReader.onerror = (error) => reject(error);
          fileReader.readAsText(acceptedFiles[0], "utf8");
        }
      );

      try {
        const chatText = await chatTextPromise;
        if (!chatText) {
          setError(Error.IncorrectFileFormat);
          return;
        }

        const chatFile: ChatFile = JSON.parse(chatText);
        setError(null);
        onParseChatFile(chatFile);
        return;
      } catch (error) {
        setError(Error.IncorrectFileFormat);
        return;
      }
    },
    [onParseChatFile]
  );

  const dragActiveElement = useMemo(() => {
    return <p></p>;
  }, []);

  const dragInactiveElement = useMemo(() => {
    return (
      <>
        <p className={classes["drag-drop-text"]}>
          Select or drag n' drop a matching{" "}
          <Icon verticalAlign="middle" color="#6441a5">
            <FaTwitch />
          </Icon>{" "}
          chat file!
        </p>
        {error === Error.TooManyFiles && (
          <DragDropErrorText>
            Only <b>one</b> chat file is supported at a time.
          </DragDropErrorText>
        )}
        {error === Error.IncorrectFileType && (
          <DragDropErrorText>
            Only the <Code>JSON</Code> file type is supported.
          </DragDropErrorText>
        )}
        {error === Error.IncorrectFileFormat && (
          <DragDropErrorText>
            The provided chat file is not in the correct <Code>JSON</Code>{" "}
            format.
          </DragDropErrorText>
        )}
      </>
    );
  }, [error]);

  return (
    <DragDrop
      dragActiveElement={dragActiveElement}
      dragInactiveElement={dragInactiveElement}
      accept={{
        "application/json": [".json"],
      }}
      multiple={false}
      onDrop={handleDrop}
    >
      <BlockIcon className={classes["chat-upload-icon"]}>
        <FaFileUpload />
      </BlockIcon>
    </DragDrop>
  );
};

export default ChatDragDrop;
