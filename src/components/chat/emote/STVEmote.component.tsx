import Emote from "./Emote";
import { Emote as StvEmote, EmoteDataFlags } from "./STVEmote.types";

interface STVEmoteProps {
  /** An object obtained from the 7TV endpoint containing information about the emote. */
  emote: StvEmote;
}

/** UI component for a 7TV emote with a hoverable tooltip. */
const STVEmote = ({ emote }: STVEmoteProps) => {
  const emoteAuthor = emote.data.owner.display_name;
  const emoteName = emote.name;

  const emoteURL = "https:" + emote.data.host.url;
  const emoteSources = emote.data.host.files.map((f) => ({
    url: emoteURL + "/" + f.name,
    pixelDensity: f.name.match(/(\d{1})x/)![1],
  }));

  const pixelDensities = emote.data.host.files
    .map((f) => f.name.match(/(\d{1})x/)![1])
    .sort();
  const pixelDensityRegex = new RegExp(
    `${pixelDensities[pixelDensities.length - 1]}x`
  );
  const enlargedEmoteSource =
    emoteURL +
    "/" +
    emote.data.host.files.filter(
      (f) => f.format === "AVIF" && pixelDensityRegex.test(f.name)
    )[0].name;

  const isZeroWidth =
    (emote.data.flags & EmoteDataFlags.ZeroWidth) === EmoteDataFlags.ZeroWidth;

  return (
    <Emote
      author={emoteAuthor}
      name={emoteName}
      provider={"7TV"}
      isZeroWidth={isZeroWidth}
      src={emoteSources[0].url}
      enlargedSrc={enlargedEmoteSource}
      srcSet={emoteSources.map((e) => `${e.url} ${e.pixelDensity}x`).join(", ")}
    />
  );
};

export default STVEmote;
