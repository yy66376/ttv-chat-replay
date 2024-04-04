import {DetailedHTMLProps, forwardRef, useContext, VideoHTMLAttributes,} from "react";
import VideoSource from "../VideoSource";
import classes from "./VideoPlayer.module.scss";
import {VideoPlayerContext} from "../../../store/video-player-context";

export type VideoPlayerProps = {} & DetailedHTMLProps<
  VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>;

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  function VideoPlayer(props, ref) {
    const {sources} = useContext(VideoPlayerContext);

    return (
      <video className={classes["video-player"]} {...props} ref={ref}>
        {sources.map((sourceProps) => (
          <VideoSource key={sourceProps.src} {...sourceProps} />
        ))}
      </video>
    );
  }
);

export default VideoPlayer;
