import { Comment } from "../Chat";
import classes from "./ChatMessageBody.module.scss";
import BTTVEmote, {
  Emote as BttvEmote,
} from "../emote-providers/bttv/BTTVEmote";
import STVEmote, { Emote as StvEmote } from "../emote-providers/stv/STVEmote";

interface ChatMessageBodyProps {
  comment: Comment;
  bttvEmoteMap: Map<string, BttvEmote> | null;
  stvEmoteMap: Map<string, StvEmote> | null;
}

const ChatMessageBody = ({
  bttvEmoteMap,
  stvEmoteMap,
  comment,
}: ChatMessageBodyProps) => {
  const bodyFragments = comment.message.body.split(" ");
  const isEmote = bodyFragments.map(
    (f) => !!(bttvEmoteMap?.has(f) || stvEmoteMap?.has(f))
  );

  const emoteIndices = [];
  for (let i = 0; i < bodyFragments.length; i++) {
    if (isEmote[i]) emoteIndices.push(i);
  }

  const mergedBodyFragments = [];
  if (emoteIndices.length > 0) {
    for (let i = 0; i < emoteIndices.length; i++) {
      const prevIndex = i === 0 ? 0 : emoteIndices[i - 1] + 1;
      const currIndex = emoteIndices[i];

      let mergedFragment = ` ${bodyFragments
        .slice(prevIndex, currIndex)
        .join(" ")} `;
      if (mergedFragment !== "") mergedBodyFragments.push(mergedFragment);

      mergedBodyFragments.push(bodyFragments[currIndex]);

      if (i < emoteIndices.length - 1) continue;

      mergedFragment = ` ${bodyFragments
        .slice(currIndex + 1, bodyFragments.length)
        .join(" ")} `;
      if (mergedFragment !== "") mergedBodyFragments.push(mergedFragment);
    }
  } else {
    mergedBodyFragments.push(comment.message.body);
  }

  return (
    <div className={classes["chat-message-body"]} lang="en">
      {mergedBodyFragments.map((f, index) => {
        if (bttvEmoteMap && bttvEmoteMap.has(f))
          return <BTTVEmote key={index} emote={bttvEmoteMap.get(f)!} />;
        else if (stvEmoteMap && stvEmoteMap.has(f))
          return <STVEmote key={index} emote={stvEmoteMap.get(f)!} />;
        return (
          <span className={classes["chat-message-text"]} key={index}>
            {f}
          </span>
        );
      })}
    </div>
  );
};

export default ChatMessageBody;
