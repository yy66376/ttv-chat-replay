import { createContext } from "react";
import { Streamer } from "../components/chat/Chat";

export interface ChatContextValue {
  streamer: Streamer;
}

export const SelectContext = createContext<ChatContextValue>({
  streamer: { id: 0, name: "" },
});
