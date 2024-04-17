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
import { Emote as STVEmote } from "../emote-providers/stv/STVEmote";
import { useRootDispatch } from "../../../hooks/useRootDispatch";
import { seek } from "../../../store/redux/features/video/videoSlice";

interface ChatMessageProps {
  comment: Comment;
  bttvEmoteMap: Map<string, BTTVEmote> | null;
  stvEmoteMap: Map<string, STVEmote> | null;
}

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ bttvEmoteMap, stvEmoteMap, comment }, ref) => {
    const dispatch = useRootDispatch();

    const timestamp = comment.content_offset_seconds;
    const formattedTimestamp = formatTimestamp(timestamp);

    const handleTimestampClick = () => dispatch(seek(timestamp));

    return (
      <div className={classes["chat-message-container"]} ref={ref}>
        <Tooltip
          offset={15}
          arrow
          arrowOptions={{ fill: "white", width: 12, height: 8 }}
        >
          <TooltipTrigger asChild>
            <button
              className={classes["chat-message-timestamp"]}
              onClick={handleTimestampClick}
            >
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
          <ChatMessageBody
            comment={comment}
            bttvEmoteMap={bttvEmoteMap}
            stvEmoteMap={stvEmoteMap}
          />
        </div>
      </div>
    );
  }
);

export default ChatMessage;
