import VideoPlayer from "./VideoPlayer";
import classes from "./VideoPlayerContainer.module.scss";
import VideoControlsContainer from "./VideoControlsContainer";
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  KeyboardEvent,
  useState,
} from "react";
import { VideoPlayerContext } from "../../store/video-player-context";

const VideoPlayerContainer = () => {
  const [controlsVisible, setControlsVisible] = useState(false);

  const {
    isFullscreen,
    onTogglePlayPause,
    onToggleFullscreen,
    onTogglePip,
    onEnterFullscreen,
    onExitFullscreen,
    onToggleMute,
    onIncreaseVolume,
    onDecreaseVolume,
    onSkip,
  } = useContext(VideoPlayerContext);

  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRefCurrent = videoContainerRef.current;

  const handleFullScreenChange = useCallback(() => {
    if (document.fullscreenElement) onEnterFullscreen();
    else onExitFullscreen();
  }, [onEnterFullscreen, onExitFullscreen]);

  useEffect(() => {
    videoContainerRefCurrent?.addEventListener(
      "fullscreenchange",
      handleFullScreenChange
    );
    return () => {
      videoContainerRefCurrent?.removeEventListener(
        "fullscreenchange",
        handleFullScreenChange
      );
    };
  }, [videoContainerRefCurrent, handleFullScreenChange]);

  useEffect(() => {
    if (isFullscreen) videoContainerRefCurrent?.requestFullscreen();
    else if (document.fullscreenElement) document.exitFullscreen();
  }, [isFullscreen, videoContainerRefCurrent]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key.toLowerCase()) {
      case " ":
        if (e.target !== videoContainerRefCurrent) return;
        onTogglePlayPause();
        break;
      case "k":
        onTogglePlayPause();
        break;
      case "f":
        onToggleFullscreen();
        break;
      case "i":
        onTogglePip();
        break;
      case "m":
        onToggleMute();
        break;
      case "arrowup":
        onIncreaseVolume();
        break;
      case "arrowdown":
        onDecreaseVolume();
        break;
      case "arrowleft":
      case "j":
        onSkip(-5);
        break;
      case "arrowright":
      case "l":
        onSkip(5);
        break;
    }
    setControlsVisible(true);
  };

  useEffect(() => {
    if (!controlsVisible) return;
    const timeoutId = setTimeout(() => {
      setControlsVisible(false);
    }, 2200);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [controlsVisible]);

  const hideControlsAndCusor = `${controlsVisible ? "" : classes["hidden"]}`;
  return (
    <div
      className={`${classes["video-player-container"]} ${hideControlsAndCusor}`}
      ref={videoContainerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseMove={() => setControlsVisible(true)}
    >
      <VideoPlayer />
      <VideoControlsContainer
        className={`${classes["video-controls-container"]} ${hideControlsAndCusor}`}
      />
    </div>
  );
};

export default VideoPlayerContainer;
