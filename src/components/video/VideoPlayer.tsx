import {
  DetailedHTMLProps,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  VideoHTMLAttributes,
} from "react";
import VideoSource from "./VideoSource";
import classes from "./VideoPlayer.module.scss";
import { VideoPlayerContext } from "../../store/video-player-context";

export type VideoPlayerProps = {} & DetailedHTMLProps<
  VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>;



const VideoPlayer = (props: VideoPlayerProps) => {
  const {
    time,
    sources,
    isPlaying,
    isPip,
    isMuted,
    volume,
    onTogglePlayPause,
    onPause,
    onPlay,
    onEnterPip,
    onExitPip,
    onChangeVolume,
    onChangeDuration,
    onChangeTime,
  } = useContext(VideoPlayerContext);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoRefCurr = videoRef.current;

  const handleChangeVolume = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    const newVolume = e.currentTarget.volume;
    onChangeVolume(newVolume);
  };

  const handleLoadedData = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    const duration = e.currentTarget.duration;
    onChangeDuration(duration);
  };

  const handleTimeUpdate = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    const time = e.currentTarget.currentTime;
    onChangeTime(time);
  };

  useEffect(() => {
    videoRefCurr?.addEventListener("enterpictureinpicture", onEnterPip);
    videoRefCurr?.addEventListener("leavepictureinpicture", onExitPip);

    return () => {
      videoRefCurr?.removeEventListener("enterpictureinpicture", onEnterPip);
      videoRefCurr?.removeEventListener("leavepictureinpicture", onExitPip);
    };
  }, [videoRefCurr, onEnterPip, onExitPip]);

  useEffect(() => {
    if (isPlaying) videoRefCurr?.play();
    else videoRefCurr?.pause();
  }, [isPlaying, videoRefCurr]);

  useEffect(() => {
    if (isPip) videoRefCurr?.requestPictureInPicture();
    else if (document.pictureInPictureElement) document.exitPictureInPicture();
  }, [videoRefCurr, isPip]);

  useEffect(() => {
    if (videoRefCurr) {
      videoRefCurr.volume = volume;
      videoRefCurr.muted = isMuted;
    }
  }, [videoRefCurr, volume, isMuted]);

  useEffect(() => {
    if (videoRefCurr) {
      videoRefCurr.currentTime = time;
    }
  }, [videoRefCurr, time]);

  return (
    <video
      className={classes["video-player"]}
      {...props}
      ref={videoRef}
      onPlay={onPlay}
      onPause={onPause}
      onClick={onTogglePlayPause}
      onVolumeChange={handleChangeVolume}
      onLoadedData={handleLoadedData}
      onTimeUpdate={handleTimeUpdate}
    >
      {sources.map((sourceProps) => (
        <VideoSource key={sourceProps.src} {...sourceProps} />
      ))}
    </video>
  );
};

export default VideoPlayer;
