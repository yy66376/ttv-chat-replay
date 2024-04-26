import VideoControls from "./VideoControls";
import classes from "./VideoControlsContainer.module.scss";
import VideoTimeline from "./VideoTimeline";

export type VideoControlsContainerProps = {
  className?: string;
};

const VideoControlsContainer = ({ className }: VideoControlsContainerProps) => {
  return (
    <div className={`${className} ${classes["video-controls-container"]}`}>
      <div className={classes["video-controls-container__overlay"]}></div>
      <VideoTimeline />
      <VideoControls className={classes["video-controls"]} />
    </div>
  );
};

export default VideoControlsContainer;
