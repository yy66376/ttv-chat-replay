import {useContext} from "react";
import {VideoPlayerContext} from "../store/video-player-context";
import VideoPlayerContainer from "./video/player/VideoPlayerContainer";
import VideoDragDrop from "./video/VideoDragDrop";

const VideoSelector = () => {
  const {sources} = useContext(VideoPlayerContext);
  return sources.length ? <VideoPlayerContainer/> : <VideoDragDrop/>;
};

export default VideoSelector;
