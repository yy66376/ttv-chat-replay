import { useContext } from "react";
import { VideoPlayerContext } from "../../store/video-player-context";
import VideoPlayerContainer from "./player/VideoPlayerContainer";
import VideoDragDrop from "./VideoDragDrop";

const VideoSelector = () => {
  const { sources } = useContext(VideoPlayerContext);
  return sources.length ? <VideoPlayerContainer /> : <VideoDragDrop />;
};

export default VideoSelector;
