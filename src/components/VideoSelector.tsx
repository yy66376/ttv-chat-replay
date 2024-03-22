import { useContext } from "react";
import { VideoPlayerContext } from "../store/video-player-context";
import DragDrop from "./DragDrop";
import VideoPlayerContainer from "./video/VideoPlayerContainer";

const VideoSelector = () => {
  const { sources } = useContext(VideoPlayerContext);
  return sources.length ? <VideoPlayerContainer /> : <DragDrop />;
};

export default VideoSelector;
