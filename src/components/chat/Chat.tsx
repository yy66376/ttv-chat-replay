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

const Chat = () => {
  return <div></div>;
};

export default Chat;
