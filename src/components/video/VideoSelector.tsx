import { useRootSelector } from "../../hooks/useRootSelector";
import { selectSources } from "../../store/redux/features/video/videoSlice";
import VideoPlayerContainer from "./player/VideoPlayerContainer";
import VideoDragDrop from "./VideoDragDrop";

const VideoSelector = () => {
  const sources = useRootSelector(selectSources);
  return sources.length ? <VideoPlayerContainer /> : <VideoDragDrop />;
};

export default VideoSelector;
