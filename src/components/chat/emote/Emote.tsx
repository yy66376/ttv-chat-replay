import Tooltip from "../../ui/tooltip/Tooltip";
import TooltipContent from "../../ui/tooltip/TooltipContent";
import { TooltipTrigger } from "../../ui/tooltip/TooltipTrigger";
import classes from "./Emote.module.scss";

interface EmoteProps {
  /** The name of the user who created/uploaded this emote to the emote provider. */
  author: string;
  /** The name of the provider of the emote (e.g., TTV, 7TV, FFZ, BTTV, etc.) */
  provider: string;
  /** The name of this emote (to be used as the alt text). */
  name: string;
  /** A string containing a URL representing the emote.  */
  src: string;
  /** A string containing a URL representing a zoomed/enlarged version of the emote (to be used in the tooltip). */
  enlargedSrc: string;
  /** A string which identifies one or more image candidate strings, separated using commas, each specifying image resources to use under given circumstances. */
  srcSet?: string;
  /** Whether this emote is zero-width (to be used in conjunction with a non-zero width emote). */
  isZeroWidth?: boolean;
}

/** UI component for an emote with a hoverable tooltip. */
export default function Emote({
  author: emoteAuthor,
  provider: emoteProvider,
  isZeroWidth,
  name,
  src,
  enlargedSrc,
  srcSet,
}: EmoteProps) {
  return (
    <Tooltip
      offset={15}
      arrow
      arrowOptions={{ fill: "white", width: 12, height: 8 }}
    >
      <TooltipTrigger asChild>
        <img
          className={`${classes["emote"]} ${
            isZeroWidth ? classes["zero-width"] : ""
          }`}
          src={src}
          alt={name}
          srcSet={srcSet}
        />
      </TooltipTrigger>
      <TooltipContent className={classes["emote-tooltip"]}>
        <img
          className={classes["emote-tooltip__image"]}
          src={enlargedSrc}
          alt={name}
        />
        <p className={classes["emote-tooltip__text"]}>Emote: {name}</p>
        <p className={classes["emote-tooltip__text"]}>From: {emoteProvider}</p>
        <p className={classes["emote-tooltip__text"]}>By: {emoteAuthor}</p>
      </TooltipContent>
    </Tooltip>
  );
}
