import { Comment } from "../Chat";
import classes from "./ChatMessageBody.module.scss";
import BTTVEmote, {
  Emote as BttvEmote,
} from "../emote-providers/bttv/BTTVEmote";

interface ChatMessageBodyProps {
  comment: Comment;
  bttvMap: Map<string, BttvEmote> | null;
}

const ChatMessageBody = ({ bttvMap, comment }: ChatMessageBodyProps) => {
  const bodyFragments = comment.message.body.split(" ");
  const isEmote = bodyFragments.map((f) => bttvMap?.has(f));
  const spaceHelper = (index: number) => {
    return index <= 0 || index >= isEmote.length || !isEmote[index] ? " " : "";
  };

  return (
    <div className={classes["chat-message-body"]}>
      {bodyFragments.map((f, index) => {
        if (bttvMap && isEmote[index])
          return <BTTVEmote key={index} emote={bttvMap.get(f)!} />;
        return <span key={index}>{spaceHelper(index - 1) + f + " "}</span>;
      })}
    </div>
  );
};

export default ChatMessageBody;
