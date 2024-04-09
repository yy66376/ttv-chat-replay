import VideoPlayer from "./VideoPlayer";
import classes from "./VideoPlayerContainer.module.scss";
import VideoControlsContainer from "../controls/VideoControlsContainer";
import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import VideoIconOverlay from "../VideoIconOverlay";
import { RiForward5Line, RiReplay5Line } from "react-icons/ri";
import {
  BiSolidVolumeFull,
  BiSolidVolumeLow,
  BiSolidVolumeMute,
} from "react-icons/bi";
import clamp from "../../../utility/clamp";

const MOUSE_TIMEOUT = 4220;

const VideoPlayerContainer = () => {
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [overlayIcon, setOverlayIcon] = useState<ReactNode | null>(null);

  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRefCurrent = videoContainerRef.current;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoRefCurrent = videoRef.current;

  const [time, setTime] = useState(videoRefCurrent?.currentTime ?? 0);
  const [duration, setDuration] = useState(videoRefCurrent?.duration ?? 0);
  const [isEnded, setIsEnded] = useState(videoRefCurrent?.ended ?? false);
  const [isPlaying, setIsPlaying] = useState(videoRefCurrent?.paused ?? false);
  const [isFullscreen, setIsFullscreen] = useState(
    !!document.fullscreenElement
  );
  const [isMuted, setIsMuted] = useState(videoRefCurrent?.muted ?? false);
  const [isPip, setIsPip] = useState(!!document.pictureInPictureElement);
  const [volume, setVolume] = useState(videoRefCurrent?.volume ?? 1);

  const handleToggleFullscreen = async () => {
    if (isFullscreen) {
      await document.exitFullscreen();
    } else {
      await videoContainerRefCurrent?.requestFullscreen();
    }
    setIsFullscreen((prevIsFullScreen) => !prevIsFullScreen);
  };

  const handleTogglePlayPause = () => {
    if (isPlaying) {
      setOverlayIcon(<FaPause />);
      handlePause();
    } else {
      setOverlayIcon(<FaPlay />);
      handlePlay();
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setIsEnded((prevIsEnded) => (prevIsEnded ? false : prevIsEnded));
  };

  const handlePause = () => {
    setIsControlsVisible(true);
    setIsPlaying(false);
  };

  const handleChangeVolume = (volume: number) => {
    if (!videoRefCurrent) return;
    videoRefCurrent.volume = volume;
    setVolume(volume);
  };

  const handleIncreaseVolume = () => {
    const newVolume = Math.min(1, volume + 0.05);
    handleChangeVolume(newVolume);
    setOverlayIcon(<BiSolidVolumeFull />);
  };

  const handleDecreaseVolume = () => {
    const newVolume = Math.max(0, volume - 0.05);
    handleChangeVolume(newVolume);
    setOverlayIcon(
      newVolume > 0 ? <BiSolidVolumeLow /> : <BiSolidVolumeMute />
    );
  };

  const handleChangeSpeed = (speed: number) => {
    if (!videoRefCurrent) return;
    videoRefCurrent.playbackRate = speed;
  };

  const handleToggleMuted = () => {
    if (!videoRefCurrent) return;
    videoRefCurrent.muted = !isMuted;
    setVolume(isMuted ? videoRefCurrent.volume : 0);
    setIsMuted((prevIsMuted) => !prevIsMuted);
  };

  const handleTogglePip = async () => {
    const prevPip = isPip;
    setIsPip((prevIsPip) => !prevIsPip);
    if (prevPip) {
      await document.exitPictureInPicture();
    } else {
      setIsFullscreen(false); // automatically exits full screen when entering PiP, so update state to be consistent
      await videoRefCurrent?.requestPictureInPicture();
    }
  };

  const handleSkip = (seconds: number) => {
    if (!videoRefCurrent) return;
    const newTime = clamp(time + seconds, 0, duration);
    videoRefCurrent.currentTime = newTime;
    setTime(newTime);
    setOverlayIcon(seconds > 0 ? <RiForward5Line /> : <RiReplay5Line />);
    if (newTime < duration) setIsEnded(false);
  };

  const handleSeek = (seconds: number) => {
    if (!videoRefCurrent) return;
    videoRefCurrent.currentTime = seconds;
    setTime(seconds);
    if (seconds < duration) setIsEnded(false);
  };

  const handleReplay = () => {
    if (!videoRefCurrent) return;
    videoRefCurrent.currentTime = 0;
    setTime(0);
    handlePlay();
  };

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

  // picture in picture event handlers
  useEffect(() => {
    if (!videoRefCurrent) return;

    const handleEnterPip = () => setIsPip(true);
    const handleExitPip = () => setIsPip(false);

    videoRefCurrent.addEventListener("enterpictureinpicture", handleEnterPip);
    videoRefCurrent.addEventListener("leavepictureinpicture", handleExitPip);
    return () => {
      videoRefCurrent.removeEventListener(
        "enterpictureinpicture",
        handleEnterPip
      );
      videoRefCurrent.removeEventListener(
        "leavepictureinpicture",
        handleExitPip
      );
    };
  }, [videoRefCurrent]);

  useEffect(() => {
    if (!videoRefCurrent) return;
    if (isPlaying) videoRefCurrent.play();
    else videoRefCurrent.pause();
  }, [isPlaying, videoRefCurrent]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== videoContainerRefCurrent) return;
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
        handleToggleMuted();
        break;
      case "arrowup":
        handleIncreaseVolume();
        break;
      case "arrowdown":
        handleDecreaseVolume();
        break;
      case "arrowleft":
      case "j":
        handleSkip(-5);
        break;
      case "arrowright":
      case "l":
        handleSkip(5);
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
      <VideoIconOverlay icon={overlayIcon} />
      <VideoPlayer
        ref={videoRef}
        onLoadedMetadata={handlePlay}
        onClick={handleTogglePlayPause}
        onPlay={handlePlay}
        onPause={handlePause}
        onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
        onLoadedData={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onEnded={() => setIsEnded(true)}
      />
      <VideoControlsContainer
        className={`${classes["video-controls-container"]} ${hideControlsAndCusor}`}
        duration={duration}
        isEnded={isEnded}
        isPlaying={isPlaying}
        isFullscreen={isFullscreen}
        isMuted={isMuted}
        isPip={isPip}
        volume={volume}
        time={time}
        onTogglePlayPause={handleTogglePlayPause}
        onToggleFullscreen={handleToggleFullscreen}
        onChangeVolume={handleChangeVolume}
        onToggleMuted={handleToggleMuted}
        onTogglePip={handleTogglePip}
        onReplay={handleReplay}
        onSkip={handleSkip}
        onSeek={handleSeek}
        onChangeSpeed={handleChangeSpeed}
      />
    </div>
  );
};

export default VideoPlayerContainer;
