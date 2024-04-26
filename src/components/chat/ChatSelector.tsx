import Chat, { ChatFile } from "./Chat";
import { useState } from "react";
import ChatDragDrop from "./ChatDragDrop";

const ChatSelector = () => {
  const [chatFile, setChatFile] = useState<ChatFile | null>(null);
  return chatFile ? (
    <Chat chatFile={chatFile} />
  ) : (
    <ChatDragDrop onParseChatFile={setChatFile} />
  );
};

export default ChatSelector;
