import { useEffect, useRef, useState } from "react";
import { useRootSelector } from "../../hooks/useRootSelector";
import {
  selectDisplayTime,
  selectRealTime,
} from "../../store/redux/features/video/videoSlice";
import {
  Badge as TTVBadge,
  GetTwitchChannelBadges,
  GetTwitchGlobalBadges,
} from "./badge/TwitchBadge";
import ChatMessage from "./chat-message/ChatMessage";
import classes from "./Chat.module.scss";
import {
  Emote as BTTVEmote,
  GetBTTVChannelEmotes,
  GetBTTVGlobalEmotes,
} from "./emote-providers/bttv/BTTVEmote";
import {
  Emote as STVEmote,
  GetSTVChannelEmotes,
  GetSTVGlobalEmotes,
} from "./emote-providers/stv/STVEmote";
import { FaArrowDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { getTtvBadgeKey } from "./chat-message/ChatBadge";

export interface ChatFile {
  FileInfo: ChatInfo;
  streamer: Streamer;
  video: Video;
  comments: Comment[];
  embeddedData: null;
}

export interface ChatInfo {
  Version: ChatFileVersion;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface ChatFileVersion {
  Major: number;
  Minor: number;
  Patch: number;
}

export interface Streamer {
  name: string;
  id: number;
}

export interface Video {
  title: string;
  description: string | null;
  id: string;
  created_at: string;
  start: number;
  end: number;
  length: number;
  viewCount: number;
  game: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  startMilliseconds: number;
  lengthMilliseconds: number;
  type: string;
  description: string;
  subDescription: string;
  thumbnailUrl: string;
  gameId: string;
  gameDisplayName: string;
  gameBoxArtUrl: string;
}

export interface Comment {
  _id: string;
  created_at: string;
  channel_id: string;
  content_type: string;
  content_id: string;
  content_offset_seconds: number;
  commenter: Commenter;
  message: Message;
}

export interface Commenter {
  display_name: string;
  _id: string;
  name: string;
  bio: string;
  created_at: string;
  updated_at: string;
  logo: string;
}

export interface Message {
  body: string;
  bits_spent: number;
  fragments: Fragment[];
  user_badges: UserBadge[];
  user_color: string;
  emoticons: Emoticon2[];
}

export interface Fragment {
  text: string;
  emoticon: Emoticon;
}

export interface UserBadge {
  _id: string;
  version: string;
}

export interface Emoticon {
  emoticon_id: string;
}

export interface Emoticon2 {
  _id: string;
  begin: number;
  end: number;
}

export interface EmbeddedData {
  thirdParty: EmbedEmoteData[];
  firstParty: EmbedEmoteData[];
  twitchBadges: EmbedChatBadge[];
  twitchBits: EmbedCheerEmote[];
}

export interface EmbedEmoteData {
  id: string;
  imageScale: number;
  data: Uint8Array;
  name: string;
  url: string;
  width: number;
  height: number;
}

export interface EmbedChatBadge {
  name: string;
  versions: Map<string, EmbedChatBadgeData>;
}

export interface EmbedChatBadgeData {
  title: string;
  description: string;
  bytes: Uint8Array;
}

export interface EmbedCheerEmote {
  prefix: string;
  tierList: Map<number, EmbedEmoteData>;
}

/** The number of visible messages in the chat component when syncing with displayTime. */
const DISPLAY_TIME_MESSAGE_LIMIT = 150;

/** The number of visible messages in the chat component when syncing with realTime. */
const REAL_TIME_MESSAGE_LIMIT = 20;

interface ChatProps {
  chatFile: ChatFile;
}

const Chat = ({ chatFile }: ChatProps) => {
  const realTime = useRootSelector(selectRealTime);
  const displayTime = useRootSelector(selectDisplayTime);
  const messages = chatFile.comments;
  const [messageState, setMessageState] = useState<{
    /** The start index (inclusive). */
    startIndex: number;
    /** The end index (inclusive). */
    endIndex: number;
    /** The ID of the last message in the visibleMessages array. */
    lastMessageId: string | null;
    /** A list of visible messages, a subarray of messages (i.e. messages.slice(startIndex, endIndex + 1)) */
    visibleMessages: Comment[];
  }>({
    startIndex: -1,
    endIndex: -1,
    lastMessageId: null,
    visibleMessages: [],
  });
  const [ttvBadgeMap, setTtvBadgeMap] = useState<Map<string, TTVBadge> | null>(
    null
  );
  const [bttvEmoteMap, setBttvEmoteMap] = useState<Map<
    string,
    BTTVEmote
  > | null>(null);
  const [stvEmoteMap, setStvEmoteMap] = useState<Map<string, STVEmote> | null>(
    null
  );
  const chatWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isScrolledBottom, setIsScrolledBottom] = useState(true);

  // ensures that messages are synced with the display time in the video
  useEffect(() => {
    const updateMessages = () => {
      setMessageState((prevMessageState) => {
        // search to the right for the latest message with a time less than the display time
        let targetIndex =
          prevMessageState.endIndex < 0 ? 0 : prevMessageState.endIndex;
        while (
          targetIndex < messages.length &&
          messages[targetIndex].content_offset_seconds <= displayTime
        ) {
          targetIndex++;
        }

        // limit the visible messages to the last DISPLAY_TIME_MESSAGE_LIMIT messages
        const endIndex = targetIndex - 1;
        const startIndex = Math.max(
          0,
          prevMessageState.startIndex,
          endIndex - DISPLAY_TIME_MESSAGE_LIMIT + 1
        );
        return {
          startIndex,
          endIndex,
          lastMessageId: endIndex < 0 ? null : messages[endIndex]._id,
          visibleMessages:
            endIndex < 0 ? [] : messages.slice(startIndex, endIndex + 1),
        };
      });
    };

    const timeoutId = setTimeout(() => {
      updateMessages();
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [displayTime, messages]);

  // ensures that messages are synced with real time in the video (during seeks)
  useEffect(() => {
    const updateMessages = () => {
      // binary search for the entry point in visibleMessages
      let low = 0;
      let high = messages.length - 1;
      let targetIndex = -1;

      while (low <= high) {
        const mid = Math.floor((high - low) / 2) + low;
        const targetMessage = messages[mid];
        if (targetMessage.content_offset_seconds > realTime) {
          high = mid - 1;
        } else {
          targetIndex = mid;
          low = mid + 1;
        }
      }

      // visible messages should be the previous REAL_TIME_MESSAGE_LIMIT messages ending at targetIdx
      const startIndex = Math.max(0, targetIndex - REAL_TIME_MESSAGE_LIMIT + 1);
      const endIndex = targetIndex;
      setMessageState({
        startIndex,
        endIndex,
        lastMessageId: endIndex < 0 ? null : messages[endIndex]._id,
        visibleMessages:
          endIndex < 0 ? [] : messages.slice(startIndex, endIndex + 1),
      });
    };

    const timeoutId = setTimeout(() => {
      updateMessages();
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [messages, realTime]);

  // retreive TTV, BTTV, and STV emotes/badges
  useEffect(() => {
    const streamerId = chatFile.streamer.id.toString();
    const fetchTtvBadges = async () => {
      const channelBadges = await GetTwitchChannelBadges(streamerId);
      const globalBadges = await GetTwitchGlobalBadges();

      const newTtvBadgeMap = new Map<string, TTVBadge>();
      globalBadges?.forEach((b) => newTtvBadgeMap.set(getTtvBadgeKey(b), b));
      channelBadges?.forEach((b) => newTtvBadgeMap.set(getTtvBadgeKey(b), b));
      setTtvBadgeMap(newTtvBadgeMap);
    };

    const fetchBttvEmotes = async () => {
      const channelEmotes = await GetBTTVChannelEmotes(streamerId);
      const globalEmotes = await GetBTTVGlobalEmotes();

      const newBttvEmoteMap = new Map<string, BTTVEmote>();
      channelEmotes?.forEach((e) => newBttvEmoteMap.set(e.code, e));
      globalEmotes?.forEach((e) => newBttvEmoteMap.set(e.code, e));
      setBttvEmoteMap(newBttvEmoteMap);
    };

    const fetchStvEmotes = async () => {
      const channelEmotes = await GetSTVChannelEmotes(streamerId);
      const globalEmotes = await GetSTVGlobalEmotes();

      const newStvEmoteMap = new Map<string, STVEmote>();
      channelEmotes?.forEach((e) => newStvEmoteMap.set(e.name, e));
      globalEmotes?.forEach((e) => newStvEmoteMap.set(e.name, e));
      setStvEmoteMap(newStvEmoteMap);
    };

    fetchTtvBadges();
    fetchBttvEmotes();
    fetchStvEmotes();
  }, [chatFile.streamer.id]);

  const handleScroll = () => {
    if (!chatWrapperRef || !chatWrapperRef.current) return;
    const elem = chatWrapperRef.current;

    // determine whether the div is scrollled to the bottom
    const scrolledBottom = elem.scrollTop >= 0 && elem.scrollTop <= 1;
    setIsScrolledBottom(scrolledBottom);
  };

  const handleScrollBottomClick = () => {
    if (!chatWrapperRef || !chatWrapperRef.current) return;

    const elem = chatWrapperRef.current;
    elem.scrollTop = 0;
  };

  return (
    <div className={classes["chat-container"]}>
      <div
        className={classes["chat-wrapper"]}
        ref={chatWrapperRef}
        onScroll={handleScroll}
      >
        <div className={classes["chat"]}>
          {messageState.visibleMessages.map((m) => (
            <ChatMessage
              key={m._id}
              comment={m}
              bttvEmoteMap={bttvEmoteMap}
              stvEmoteMap={stvEmoteMap}
              ttvBadgeMap={ttvBadgeMap}
            />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {!isScrolledBottom && (
          <motion.button
            whileHover={{ backgroundColor: "#6441a5" }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 10 },
            }}
            transition={{ duration: 0.2 }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={classes["scroll-bottom-button"]}
            type="button"
            onClick={handleScrollBottomClick}
          >
            <FaArrowDown />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chat;
