import {
  DetailedHTMLProps,
  forwardRef,
  SyntheticEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  VideoHTMLAttributes,
} from "react";
import classes from "./VideoPlayer.module.scss";
import { useRootSelector } from "../../../hooks/useRootSelector";
import {
  selectIsPlaying,
  selectSources,
  selectRealTime,
  setDisplayTime,
  loadedMetadata,
  selectIsPip,
  pause,
  play,
  enterPip,
  leavePip,
  end,
  setVolume,
  selectVolume,
  selectIsMuted,
  selectPlaybackRate,
} from "../../../store/redux/features/video/videoSlice";
import { useRootDispatch } from "../../../hooks/useRootDispatch";

export type VideoPlayerProps = {} & DetailedHTMLProps<
  VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>;

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  function VideoPlayer(props, ref) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const dispatch = useRootDispatch();
    const sources = useRootSelector(selectSources);
    const realTime = useRootSelector(selectRealTime);
    const isPlaying = useRootSelector(selectIsPlaying);
    const volume = useRootSelector(selectVolume);
    const isMuted = useRootSelector(selectIsMuted);
    const isPip = useRootSelector(selectIsPip);
    const playbackRate = useRootSelector(selectPlaybackRate);

    useImperativeHandle(ref, () => videoRef.current!, []);

    // keep player's play pause in sync with redux
    useEffect(() => {
      if (!videoRef || !videoRef.current) return;
      if (isPlaying) videoRef.current.play();
      else videoRef.current.pause();
    }, [isPlaying]);

    // keep player's current time in sync with redux
    useEffect(() => {
      if (!videoRef || !videoRef.current) return;
      videoRef.current.currentTime = realTime;
    }, [realTime]);

    // keep player's pip in sync with redux
    useEffect(() => {
      const updatePip = async () => {
        if (!videoRef || !videoRef.current) return;
        if (isPip) {
          await videoRef.current.requestPictureInPicture();
        } else if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        }
      };

      updatePip();
    }, [isPip]);

    // keep player's volume in sync with redux
    useEffect(() => {
      if (!videoRef || !videoRef.current) return;
      videoRef.current.volume = volume;
    }, [volume]);

    // keep player's mute in sync with redux
    useEffect(() => {
      if (!videoRef || !videoRef.current) return;
      videoRef.current.muted = isMuted;
    }, [isMuted]);

    // keep player's playback rate in sync with redux
    useEffect(() => {
      if (!videoRef || !videoRef.current) return;
      videoRef.current.playbackRate = playbackRate;
    }, [playbackRate]);

    // register picture in picture event handlers
    useEffect(() => {
      if (!videoRef || !videoRef.current) return;

      const handleEnterPip = () => dispatch(enterPip());
      const handleExitPip = () => dispatch(leavePip());

      const videoElem = videoRef.current;

      videoElem.addEventListener("enterpictureinpicture", handleEnterPip);
      videoElem.addEventListener("leavepictureinpicture", handleExitPip);
      return () => {
        videoElem.removeEventListener("enterpictureinpicture", handleEnterPip);
        videoElem.removeEventListener("leavepictureinpicture", handleExitPip);
      };
    }, [dispatch]);

    const handleEnd = () => dispatch(end());

    const handlePause = () => dispatch(pause());

    const handlePlay = () => dispatch(play());

    const handleTimeUpdate = (e: SyntheticEvent<HTMLVideoElement, Event>) =>
      dispatch(setDisplayTime(e.currentTarget.currentTime));

    const handleLoadedMetadata = (
      e: SyntheticEvent<HTMLVideoElement, Event>
    ) => {
      dispatch(loadedMetadata(e.currentTarget.duration));
    };

    const handleVolumeChange = (e: SyntheticEvent<HTMLVideoElement, Event>) =>
      dispatch(setVolume(e.currentTarget.volume));

    return (
      <video
        className={classes["video-player"]}
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnd}
        onVolumeChange={handleVolumeChange}
        {...props}
        ref={videoRef}
      >
        {sources.map((s) => (
          <source key={s} src={s} />
        ))}
      </video>
    );
  }
);

export default VideoPlayer;
