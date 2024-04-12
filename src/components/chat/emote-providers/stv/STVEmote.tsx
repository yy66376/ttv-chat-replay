import axios from "axios";
import Tooltip from "../../../ui/tooltip/Tooltip";
import TooltipContent from "../../../ui/tooltip/TooltipContent";
import { TooltipTrigger } from "../../../ui/tooltip/TooltipTrigger";
import classes from "./STVEmote.module.scss";

const STVAPIPrefix = "https://7tv.io/v3/";

/**
 * Returns the endpoint for retrieving a Twitch channel/user's STV emotes.
 * @param userId The ID of the Twitch channel/user.
 * @returns The endpoint for retrieving a Twitch channel/user's STV emotes.
 */
const STVChannelEmotesAPI = (userId: string) =>
  STVAPIPrefix + `users/twitch/${userId}`;

/**
 * The endpoint for retrieving global STV emotes.
 */
const STVGlobalEmotesAPI = STVAPIPrefix + "emote-sets/global";

/**
 * Contacts the BTTV API to return an array of BTTV Emote objects belonging to the specified Twitch channel/user.
 * @param userId The ID of the Twitch channel/user to get emotes BTTV emotes for.
 * @returns An array of emote BTTV Emote objects belonging to the specified Twitch channel/user, or null if the API cannot be contacted.
 */
export const GetSTVChannelEmotes = async (userId: string) => {
  try {
    const response = await axios.get<STVChannelEmoteResponse>(
      STVChannelEmotesAPI(userId),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.emote_set.emotes;
  } catch (error) {
    console.log("Failed to retrieve 7TV Channel Emotes.");
    return null;
  }
};

/**
 * Contacts the BTTV API to return an array of global BTTV Emote objects.
 * @returns An array of global BTTV Emote objects, or null if the API cannot be contacted.
 */
export const GetSTVGlobalEmotes = async () => {
  try {
    const response = await axios.get<EmoteSet>(STVGlobalEmotesAPI, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.emotes;
  } catch (error) {
    console.log("Failed to retrieve 7TV Global Emotes.");
    return null;
  }
};

export interface EmoteSet {
  /**
   * The ID associated with the emote set.
   */
  id: string;
  /**
   * The emote set's name.
   */
  name: string;
  /**
   * Flags of the emote set.
   */
  flags: number;
  /**
   * Search tags for the emote set.
   */
  tags: string[];
  /**
   * Whether this emote set is immmutable or not.
   */
  immutable: boolean;
  /**
   * If true, the set is "privileged" and can only be modified by its owner or a super administrator, regardless of the "Edit Any Emote Set" permission.
   */
  privileged: boolean;
  /**
   * A list of emotes contained within this emote set.
   */
  emotes: Emote[];
  /**
   * The maximum amount of emotes this set is allowed to contain.
   */
  capacity: number;
  /**
   * The number of emotes contained within this emote set.
   */
  emote_count: number;
  /**
   * The owner of this emote set.
   */
  owner: Owner;
}

export interface Emote {
  /**
   * The ID of this Emote.
   */
  id: string;
  /**
   * The string to associate with this emote.
   */
  name: string;
  /**
   * Flags of this Emote. Not currently being respected.
   */
  flags: EmoteFlags;
  /**
   * When this emote was added to 7TV.
   */
  timestamp: number;
  /**
   * The ID of the user that added this emote to the emote set.
   */
  actor_id: string;
  /**
   * The data associated with this emote.
   */
  data: EmoteData;
}

export interface EmoteData {
  /**
   * The ID of this Emote.
   */
  id: string;
  /**
   * The string to associate with this Emote.
   */
  name: string;
  /**
   * Flags associated with this Emote.
   */
  flags: EmoteDataFlags;
  /**
   * A list of string tags associated with this emote.
   */
  tags: string[];
  /**
   * The current life cycle of the emote.
   * Indicating whether it's processing, live, deleted, etc.
   */
  lifecycle: EmoteLifecycle;
  /**
   * Whether or not the emote is listed.
   */
  listed: boolean;
  /**
   * Whether or not the emote is animated.
   */
  animated: boolean;
  /**
   * The owner of the emote.
   */
  owner: Owner;
  /**
   * Host of the emote, containing data on where the emote is being hosted.
   */
  host: EmoteHost;
}

export enum EmoteDataFlags {
  /**
   * The emote is private and can only be accessed by its owner, editors and moderators
   */
  Private = 1 << 0,
  /**
   * The emote was verified to be an original creation by the uploader
   */
  Authentic = 1 << 1,
  /**
   * The emote is recommended to be enabled as Zero-Width
   */
  ZeroWidth = 1 << 8,
  /**
   * Sexually Suggesive
   */
  ContentSexual = 1 << 16,
  /**
   * Rapid flashing
   */
  ContentEpilepsy = 1 << 17,
  /**
   * Edgy or distasteful, may be offensive to some users
   */
  ContentEdgy = 1 << 18,
  /**
   * Not allowed specifically on the Twitch platform
   */
  ContentTwitchDisallowed = 1 << 24,
}

export enum EmoteLifecycle {
  /**
   * The emote is deleted.
   */
  Deleted = -1,
  /**
   * The emote is pending on the server.
   */
  Pending,
  /**
   * The emote is being processed.
   */
  Processing,
  /**
   * The emote is disabled.
   */
  Disabled,
  /**
   * The emote is enabled and ready to use.
   */
  Live,
  /**
   * The emote failed to be processed.
   * */
  Failed = -2,
}

export enum EmoteFlags {
  /**
   * Emote is zero-width
   */
  ZeroWidth = 1 << 0,
  /**
   * Overrides Twitch Global emotes with the same name
   */
  OverrideTwitchGlobal = 1 << 16,
  /**
   * Overrides Twitch Subscriber emotes with the same name
   */
  OverrideTwitchSubscriber = 1 << 17,
  /**
   * Overrides BetterTTV emotes with the same name
   */
  OverrideBetterTTV = 1 << 18,
  /**
   * Overrides FrankerFaceZ emotes with the same name
   */
  OverrideFrankerFacesZ = 1 << 19,
}

export interface Owner {
  /**
   * The ID of the owner.
   */
  id: string;
  /**
   * The owner's username.
   */
  username: string;
  /**
   * The owner's display name.
   */
  display_name: string;
  /**
   * A URL to the owner's avatar.
   */
  avatar_url: string;
  /**
   * The style associated with the owner.
   */
  style: Style;
  /**
   * A list of roles associated with the owner.
   */
  roles: string[];
}

export interface Style {
  /**
   * A color code.
   */
  color: number;
}

export interface EmoteHost {
  /**
   * The URL prefix where the emote is being hosted.
   * Should be combined with one of the names in files.
   */
  url: string;
  /**
   * A list of emote files hosted in this URL.
   */
  files: EmoteFile[];
}

export interface EmoteFile {
  /**
   * The name of the emote file.
   * To be appeneded to the URL of an EmoteHost to get the full URL of this emote file.
   */
  name: string;
  /**
   * The name of the static emote file (if the emote is animated).
   * To be appeneded to the URL of the EmoteHost to get the full URL of this emote file.
   */
  static_name: string;
  /**
   * The width of the emote file, in pixels.
   */
  width: number;
  /**
   * The height of the emote file, in pixels.
   */
  height: number;
  /**
   * The number of frames contained within this animated emote.
   */
  frame_count: number;
  /**
   * The size of this emote file, in bytes.
   */
  size: number;
  /**
   * The file format of this emote. Either AVIF, WEBP, PNG, or GIF.
   */
  format: "WEBP" | "AVIF" | "PNG" | "GIF";
}

export interface STVChannelEmoteResponse {
  /**
   * The user ID.
   */
  id: string;
  /**
   * The platform the user is on. Either Twitch, Youtube, Discord, or Kick.
   */
  platform: "TWITCH" | "YOUTUBE" | "DISCORD" | "KICK";
  /**
   * The username of the user.
   */
  username: string;
  /**
   * The display name of the user.
   */
  display_name: string;
  /**
   * When the user joined 7TV.
   */
  linked_at: string;
  /**
   * The maximum number of emotes this user is allowed to have.
   */
  emote_capacity: number;
  /**
   * The ID of the user's emote set.
   */
  emote_set_id: string | null | undefined;
  /**
   * The user's emote set.
   */
  emote_set: EmoteSet;
  /**
   * The user.
   */
  user: User;
}

export interface User extends Owner {
  /**
   * When this user created his/her 7TV account.
   */
  created_at: number;
  /**
   * The user's biography.
   */
  biography: string;
  /**
   * A list of the user's editors.
   */
  editors: Editor[];
  /**
   * A list of the user's connections.
   */
  connections: Connection[];
}

export interface Editor {
  /**
   * The ID of this editor.
   */
  id: string;
  /**
   * Permissions that this editor have.
   */
  permissions: EditorPermissions;
  /**
   * Whether this editor is visible.
   */
  visible: boolean;
  /**
   * When this user was added as an editor.
   */
  added_at: number;
}

export enum EditorPermissions {
  /**
   * Allows modifying emotes in the user's active emote sets.
   */
  ModifyEmotes = 1 << 0,
  /**
   * Allows using the user's private emotes.
   */
  UsePrivateEmotes = 1 << 1,
  /**
   * Allows managing the user's public profile.
   */
  ManageProfile = 1 << 2,
  /**
   * Allows managing the user's owned emotes.
   */
  ManageOwnedEmotes = 1 << 3,
  /**
   * Allows managing the user's owned emote sets.
   */
  ManageEmoteSets = 1 << 4,
  /**
   * Allows managing billing and payments, such as subscriptions.
   */
  ManageBilling = 1 << 5,
  /**
   *  Allows adding or removing editors for the user.
   */
  ManageEditors = 1 << 6,
  /**
   * Allows viewing the user's private messages, such as inbox.
   */
  ViewMessages = 1 << 7,
}

export interface Connection {
  /**
   * The ID of this connection.
   */
  id: string;
  /**
   * The platform this connection belongs to.
   */
  platform: "TWITCH" | "YOUTUBE" | "DISCORD" | "KICK";
  /**
   * The username of the user in this connection.
   */
  username: string;
  /**
   * The display name of the user in this connection.
   */
  display_name: string;
  /**
   * When the user in this connection first joined 7TV.
   */
  linked_at: number;
  /**
   * The maximum number of emotes the user in this connection can have.
   */
  emote_capacity: number;
  /**
   * The ID of the user in this connection's emote set.
   */
  emote_set_id: string | null | undefined;
  /**
   * The emote set of the user in this connection.
   */
  emote_set: EmoteSet;
}

interface STVEmoteProps {
  emote: Emote;
}

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
    <Tooltip
      offset={15}
      arrow
      arrowOptions={{ fill: "white", width: 12, height: 8 }}
    >
      <TooltipTrigger asChild>
        <img
          className={`${classes["stv-emote"]} ${
            isZeroWidth ? classes["zero-width"] : ""
          }`}
          src={emoteSources[0].url}
          alt={emoteName}
          srcSet={emoteSources
            .map((e) => `${e.url} ${e.pixelDensity}x`)
            .join(", ")}
        />
      </TooltipTrigger>
      <TooltipContent className={classes["stv-emote-tooltip"]}>
        <img src={enlargedEmoteSource} alt={emoteName} />
        <div>Emote: {emoteName}</div>
        <div>By: {emoteAuthor}</div>
      </TooltipContent>
    </Tooltip>
  );
};

export default STVEmote;
