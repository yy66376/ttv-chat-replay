import Tooltip from "../../ui/tooltip/Tooltip";
import TooltipContent from "../../ui/tooltip/TooltipContent";
import { TooltipTrigger } from "../../ui/tooltip/TooltipTrigger";
import { Badge as TTVBadge } from "../badge/TwitchBadge";
import { Comment, UserBadge } from "../Chat";
import classes from "./ChatBadge.module.scss";

interface ChatBadgeProps {
  ttvBadgeMap: Map<string, TTVBadge> | null;
  comment: Comment;
}

const ChatBadge = ({ ttvBadgeMap, comment }: ChatBadgeProps) => {
  const matchingTtvBadges = comment.message.user_badges
    .map((b) => ttvBadgeMap?.get(getUserBadgeKey(b)))
    .filter((b) => !!b);

  return (
    <span className={classes["badge-container"]}>
      {matchingTtvBadges.map((b) => (
        <Tooltip
          key={getTtvBadgeKey(b!)}
          offset={15}
          arrow
          arrowOptions={{ fill: "white", width: 12, height: 8 }}
        >
          <TooltipTrigger asChild>
            <img
              src={b!.imageURL}
              alt={b!.title}
              className={classes["badge"]}
            />
          </TooltipTrigger>
          <TooltipContent className={classes["badge-tooltip"]}>
            <img
              src={b!.imageURL.substring(0, b!.imageURL.length - 1) + "/3"}
              alt={b!.title}
              className={classes["badge-tooltip__image"]}
            />
            <p className={classes["badge-tooltip__text"]}>{b!.title}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </span>
  );
};

export const getTtvBadgeKey = (b: TTVBadge) => `${b.setID}-${b.version}`;

export const getUserBadgeKey = (b: UserBadge) => `${b._id}-${b.version}`;

export default ChatBadge;
