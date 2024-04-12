import axios from "axios";

const TwitchClientID = "kimne78kx3ncx6brgo4mv6wki5h1ko";
const TwitchGQLEndpoint = "https://gql.twitch.tv/gql";

/**
 * An object contained within the GQL response describing
 * the request ID and  how long it took for the GQL request to be processed
 */
export interface Extensions {
  /**
   * How long it took for the GQL request to be processed.
   */
  durationMilliseconds: number;
  /**
   * The request ID for this GQL request.
   */
  requestID: string;
}

/**
 * Enumerates valid badge image sizes.
 */
export enum BadgeImageSize {
  /**
   * The base badge image size: 18x18.
   */
  Normal = "NORMAL",
  /**
   * Double the normal badge image size: 36x36.
   */
  Double = "DOUBLE",
  /**
   * Quadruple the normal badge image size: 72x72.
   */
  Quadruple = "QUADRUPLE",
}

/**
 * Represents a Twitch chatter's status in chat.
 */
export interface Badge {
  /**
   * A localized, human-friendly description of the badge.
   * Defaults to English if no translation exists for the requested locale.
   */
  description: string;
  /**
   * A localized, human-friendly title for the badge.
   * Defaults to English if no translation exists for the requested locale.
   */
  title: string;
  /**
   * The identifier of the set which this badge belongs (e.g. "subscriber").
   */
  setId: string;
  /**
   * The badge's version (e.g. "1mo").
   */
  version: string;
  /**
   * A URL to the badge's image.
   */
  imageURL: string;
}

/**
 * The response object from calling Twitch's GQL Global Badge endpoint.
 */
export interface GlobalBadgeResponse {
  /**
   * An object containing a list of badges.
   */
  data: GlobalBadgeData;
  /**
   * Contains metadata on the GQL request.
   */
  extensions: Extensions;
}

/**
 * An object containing a list of badges under the "badges" key.
 */
export interface GlobalBadgeData {
  /**
   * A list of badges.
   */
  badges: Badge[];
}

/**
 * The response object from calling Twitch's GQL Channel Badge ednpoint.
 */
export interface ChannelBadgeResponse {
  /**
   * An object containing a channel's channel badges.
   */
  data: ChannelBadgeData;
  /**
   * Contains metadata on the GQL request.
   */
  extensions: Extensions;
}

/**
 * An object containing a ChannelBadgeUser, which includes a list of channel badges.
 */
export interface ChannelBadgeData {
  /**
   * An object containing a list of channel badges.
   */
  user: ChannelBadgeUser;
}

/**
 * An object containing a list of badges pertaining to a specific channel/user.
 */
export interface ChannelBadgeUser {
  /**
   * A list of badges pertaining to a specific channel/user.
   */
  broadcastBadges: Badge[];
}

export const GetTwitchGlobalBadges = async () => {
  try {
    const response = await axios.post<GlobalBadgeResponse>(
      TwitchGQLEndpoint,
      {
        query: `query {
                  badges {
                    imageURL(size: ${BadgeImageSize.Normal}),
                    description,
                    title,
                    setID,
                    version
                  }
                }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Client-ID": TwitchClientID,
        },
      }
    );
    console.log(response.data.data.badges);
    return response.data.data.badges;
  } catch (error) {
    console.log("Failed to retrieve Twitch Global Badges.");
    return null;
  }
};

export const GetTwitchChannelBadges = async (userId: string) => {
  try {
    const response = await axios.post<ChannelBadgeResponse>(
      TwitchGQLEndpoint,
      {
        query: `query {
                  user(id: "${userId}") {
                    broadcastBadges {
                      imageURL(size: ${BadgeImageSize.Normal}),
                      description,
                      title,
                      setID,
                      version
                    }
                  }
                }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Client-ID": TwitchClientID,
        },
      }
    );
    console.log(response.data.data.user.broadcastBadges);
    return response.data.data.user.broadcastBadges;
  } catch (error) {
    console.log("Failed to retrieve Twitch Global Badges.");
    return null;
  }
};

const TwitchBadge = () => {};

export default TwitchBadge;
