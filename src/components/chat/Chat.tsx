import { useEffect, useRef, useState } from "react";
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

interface ChatProps {
  chatFile: ChatFile;
}

const Chat = ({ chatFile }: ChatProps) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const chatMessages = chatFile.comments;
  const trimmedMessages = chatMessages.slice(1000, 2000);
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

  useEffect(() => {
    if (!lastMessageRef || !lastMessageRef.current) return;
    lastMessageRef.current.scrollIntoView();
  }, [lastMessageRef]);

  useEffect(() => {
    const streamerId = chatFile.streamer.id.toString();
    const fetchTtvBadges = async () => {
      const channelBadges = await GetTwitchChannelBadges(streamerId);
      const globalBadges = await GetTwitchGlobalBadges();

      const newTtvBadgeMap = new Map<string, TTVBadge>();
      channelBadges?.forEach((b) =>
        newTtvBadgeMap.set(`${b.setId}-${b.version}`, b)
      );
      globalBadges?.forEach((b) =>
        newTtvBadgeMap.set(`${b.setId}-${b.version}`, b)
      );
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

  return (
    <div className={classes["chat"]}>
      {trimmedMessages.map((m, index) => (
        <ChatMessage
          key={m._id}
          comment={m}
          ref={index === trimmedMessages.length - 1 ? lastMessageRef : null}
          bttvEmoteMap={bttvEmoteMap}
          stvEmoteMap={stvEmoteMap}
        />
      ))}
    </div>
  );
};

export default Chat;
