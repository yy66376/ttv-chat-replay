import { Comment } from "../Chat";
import classes from "./ChatCommenter.module.scss";

const TWITCH_URL = "https://twitch.tv/";

interface ChatCommenterProps {
  comment: Comment;
}

const ChatCommenter = ({ comment }: ChatCommenterProps) => {
  return (
    <a
      target="_blank"
      className={classes["chat-commenter-link"]}
      rel="noreferrer noopener"
      href={TWITCH_URL + comment.commenter.name}
      style={{ color: comment.message.user_color }}
    >
      {comment.commenter.display_name}
    </a>
  );
};

export default ChatCommenter;
