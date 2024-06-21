import axios from "axios";
import { EmoteSet, STVChannelEmoteResponse } from "./STVEmote.types";
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
