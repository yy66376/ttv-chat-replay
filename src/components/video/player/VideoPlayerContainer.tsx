import VideoPlayer from "./VideoPlayer";
import classes from "./VideoPlayerContainer.module.scss";
import VideoControlsContainer from "../controls/VideoControlsContainer";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import VideoIconOverlay from "../VideoIconOverlay";
import {
  decreasePlaybackRate,
  decreaseVolume,
  increasePlaybackRate,
  increaseVolume,
  selectIsFullscreen,
  selectIsPlaying,
  skip,
  toggleFullscreen,
  toggleMute,
  togglePip,
  togglePlayPause,
} from "../../../store/redux/features/video/videoSlice";
import { useRootDispatch } from "../../../hooks/useRootDispatch";
import { useRootSelector } from "../../../hooks/useRootSelector";

const MOUSE_TIMEOUT = 4220;

const VideoPlayerContainer = () => {
  const dispatch = useRootDispatch();
  const isPlaying = useRootSelector(selectIsPlaying);
  const isFullscreen = useRootSelector(selectIsFullscreen);

  const [isControlsVisible, setIsControlsVisible] = useState(false);

  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  const handleTogglePlayPause = () => dispatch(togglePlayPause());

  const handleToggleFullscreen = () => dispatch(toggleFullscreen());

  const handleIncreaseVolume = () => dispatch(increaseVolume());

  const handleDecreaseVolume = () => dispatch(decreaseVolume());

  const handleToggleMute = () => dispatch(toggleMute());

  const handleIncreasePlaybackRate = () => dispatch(increasePlaybackRate());

  const handleDecreasePlaybackRate = () => dispatch(decreasePlaybackRate());

  const handleTogglePip = () => dispatch(togglePip());

  // hide video controls when the mouse has not moved for MOUSE_TIMEOUT duration
  // and when the video is not playing
  useEffect(() => {
    if (!isControlsVisible || !isPlaying) return;
    const timeoutId = setTimeout(() => {
      setIsControlsVisible(false);
    }, MOUSE_TIMEOUT);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isControlsVisible, isPlaying]);

  useEffect(() => {
    const updateFullscreen = async () => {
      if (!videoContainerRef || !videoContainerRef.current) return;

      if (isFullscreen) {
        await videoContainerRef.current.requestFullscreen();
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    };

    updateFullscreen();
  }, [isFullscreen]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== videoContainerRef.current) return;
    switch (e.key.toLowerCase()) {
      case " ":
      case "k":
        handleTogglePlayPause();
        break;
      case "f":
        handleToggleFullscreen();
        break;
      case "i":
        handleTogglePip();
        break;
      case "m":
        handleToggleMute();
        break;
      case "arrowup":
        handleIncreaseVolume();
        break;
      case "arrowdown":
        handleDecreaseVolume();
        break;
      case "arrowleft":
      case "j":
        dispatch(skip(-5));
        break;
      case "arrowright":
      case "l":
        dispatch(skip(5));
        break;
      case ">":
      case ".":
        handleIncreasePlaybackRate();
        break;
      case "<":
      case ",":
        handleDecreasePlaybackRate();
        break;
    }
    setIsControlsVisible(true);
  };

  const hideControlsAndCusor = `${isControlsVisible ? "" : classes["hidden"]}`;
  return (
    <div
      className={`${classes["video-player-container"]} ${hideControlsAndCusor}`}
      ref={videoContainerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseMove={() => setIsControlsVisible(true)}
    >
      <VideoIconOverlay onClick={handleTogglePlayPause} />
      <VideoPlayer />
      <VideoControlsContainer
        className={`${classes["video-controls-container"]} ${hideControlsAndCusor}`}
      />
    </div>
  );
};

export default VideoPlayerContainer;
