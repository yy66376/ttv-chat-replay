import axios from "axios";

const BTTVAPIPrefix = "https://api.betterttv.net/3/";

/**
 * Returns the endpoint for retrieving a Twitch channel/user's BTTV emotes.
 * @param userId The ID of the Twitch channel/user.
 * @returns The endpoint for retrieving a Twitch channel/user's BTTV emotes.
 */
const BTTVChannelEmotesAPI = (userId: string) =>
  BTTVAPIPrefix + `cached/users/twitch/${userId}`;

/**
 * The endpoint for retrieving global BTTV emotes.
 */
const BTTVGlobalEmotesAPI = BTTVAPIPrefix + "cached/emotes/global";

/**
 * Returns the URL for the BTTV emote to be used in the src attribute of an image element.
 * @param emoteId The ID of the BTTV emote.
 * @param pixelDensity The pixel density of the emote, which is one of 1, 2, and 3.
 * @returns The URL for the BTTV emote to be used in the src attribute of an image element.
 */
const BTTVEmoteCDNAPI = (emoteId: string, pixelDensity: number = 1) =>
  `https://cdn.betterttv.net/emote/${emoteId}/${pixelDensity}x`;

/**
 * Contacts the BTTV API to return an array of BTTV Emote objects belonging to the specified Twitch channel/user.
 * @param userId The ID of the Twitch channel/user to get emotes BTTV emotes for.
 * @returns An array of emote BTTV Emote objects belonging to the specified Twitch channel/user, or null if the API cannot be contacted.
 */
export const GetBTTVChannelEmotes = async (userId: string) => {
  try {
    const response = await axios.get<BTTVChannelEmoteResponse>(
      BTTVChannelEmotesAPI(userId),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { channelEmotes, sharedEmotes } = response.data;
    return [...channelEmotes, ...sharedEmotes];
  } catch (error) {
    console.log("Failed to retrieve BTTV Channel Emotes.");
    return null;
  }
};

/**
 * Contacts the BTTV API to return an array of global BTTV Emote objects.
 * @returns An array of global BTTV Emote objects, or null if the API cannot be contacted.
 */
export const GetBTTVGlobalEmotes = async () => {
  try {
    const response = await axios.get<Emote[]>(BTTVGlobalEmotesAPI, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Failed to retrieve BTTV Global Emotes.");
    return null;
  }
};

export interface Emote {
  /**
   * ID of the emote.
   */
  id: string;
  /**
   * Name of the emote.
   */
  code: string;
  /**
   * The image type, e.g. "png", "webp" or "gif".
   */
  imageType: "png" | "webp" | "gif";
  /**
   * Whether the emote is animated.
   */
  animated: boolean;
  /**
   * The owner of the emote.
   */
  user: User | undefined | null;
}

export interface User {
  /**
   * The user ID of the emote owner.
   */
  id: string;
  /**
   * The username of the emote owner.
   */
  name: string;
  /**
   * The display name of the emote owner.
   */
  displayName: string;
  /**
   * Platform user ID of the emote owner.
   */
  providerId: "twitch" | "youtube";
}

export interface BTTVChannelEmoteResponse {
  /**
   * The user ID.
   */
  id: string;
  /**
   * List of usernames which BetterTTV renders with a bot badge.
   */
  bots: string[];
  /**
   * A URL containing an image of the user avatar.
   */
  avatar: string;
  /**
   * A list of channel emotes.
   * */
  channelEmotes: Emote[];
  /**
   * A list of shared emotes.
   */
  sharedEmotes: Emote[];
}

interface BTTVEmoteProps {
  emote: Emote | string;
}

const BTTVEmote = ({ emote }: BTTVEmoteProps) => {
  const emoteName = typeof emote === "string" ? emote : emote.code;
  const emoteId = typeof emote === "string" ? emote : emote.id;

  const emoteSources = [1, 2, 3].map((pixelDensity) => ({
    url: BTTVEmoteCDNAPI(emoteId, pixelDensity),
    pixelDensity,
  }));

  return (
    <img
      src={emoteSources[0].url}
      srcSet={emoteSources.map((e) => `${e.url} ${e.pixelDensity}x`).join(", ")}
      alt={emoteName}
      style={{ verticalAlign: "middle" }}
    />
  );
};

export default BTTVEmote;
