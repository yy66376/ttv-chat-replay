import { Comment } from "../Chat";
import ChatCommenter from "./ChatCommenter";
import ChatMessageBody from "./ChatMessageBody";
import classes from "./ChatMessage.module.scss";
import { formatTimestamp } from "../../../utility/time";
import Tooltip from "../../ui/tooltip/Tooltip";
import TooltipContent from "../../ui/tooltip/TooltipContent";
import { TooltipTrigger } from "../../ui/tooltip/TooltipTrigger";
import { forwardRef } from "react";
import { Emote as BTTVEmote } from "../emote-providers/bttv/BTTVEmote";

interface ChatMessageProps {
  comment: Comment;
  bttvMap: Map<string, BTTVEmote> | null;
}

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ bttvMap, comment }, ref) => {
    const formattedTimestamp = formatTimestamp(comment.content_offset_seconds);
    return (
      <div className={classes["chat-message-container"]} ref={ref}>
        <Tooltip
          offset={15}
          arrow
          arrowOptions={{ fill: "white", width: 12, height: 8 }}
        >
          <TooltipTrigger asChild>
            <button className={classes["chat-message-timestamp"]}>
              {formattedTimestamp}
            </button>
          </TooltipTrigger>
          <TooltipContent
            className={classes["chat-message-timestamp__tooltip"]}
          >
            Jump to{" "}
            <span className={classes["chat-message-timestamp--bold"]}>
              {formattedTimestamp}
            </span>
          </TooltipContent>
        </Tooltip>
        <div className={classes["chat-message"]}>
          <ChatCommenter comment={comment} />
          <ChatMessageBody comment={comment} bttvMap={bttvMap} />
        </div>
      </div>
    );
  }
);

export default ChatMessage;
