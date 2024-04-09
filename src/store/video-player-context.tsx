import { createContext, PropsWithChildren, useState } from "react";
import { VideoSourceProps } from "../components/video/VideoSource";

interface VideoPlayerContextState {
  duration: number;
  time: number;
  isFullscreen: boolean;
  isPlaying: boolean;
  isPip: boolean;
  isMuted: boolean;
  sources: VideoSourceProps[];
  volume: number;
  onSetSources: (sources: VideoSourceProps[]) => void;
  onToggleFullscreen: () => void;
  onEnterFullscreen: () => void;
  onExitFullscreen: () => void;
  onTogglePlayPause: () => void;
  onPause: () => void;
  onPlay: () => void;
  onTogglePip: () => void;
  onEnterPip: () => void;
  onExitPip: () => void;
  onChangeVolume: (volume: number) => void;
  onToggleMute: () => void;
  onIncreaseVolume: () => void;
  onDecreaseVolume: () => void;
  onChangeDuration: (duration: number) => void;
  onChangeTime: (time: number) => void;
  onSkip: (seconds: number) => void;
}

export const VideoPlayerContext = createContext<VideoPlayerContextState>({
  duration: 0,
  time: 0,
  isFullscreen: false,
  isPlaying: false,
  isPip: false,
  isMuted: false,
  sources: [],
  volume: 1,
  onSetSources: (sources) => {},
  onToggleFullscreen: () => {},
  onEnterFullscreen: () => {},
  onExitFullscreen: () => {},
  onTogglePlayPause: () => {},
  onPause: () => {},
  onPlay: () => {},
  onTogglePip: () => {},
  onEnterPip: () => {},
  onExitPip: () => {},
  onChangeVolume: () => {},
  onToggleMute: () => {},
  onIncreaseVolume: () => {},
  onDecreaseVolume: () => {},
  onChangeDuration: (duration: number) => {},
  onChangeTime: (time: number) => {},
  onSkip: (seconds: number) => {},
});

const VideoPlayerContextProvider = ({ children }: PropsWithChildren) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPip, setIsPip] = useState(false);
  const [sources, setSources] = useState<VideoSourceProps[]>([]);
  const [volume, setVolume] = useState(1);
  const [mutedVolume, setMutedVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);

  const handleSetSources = (newSources: VideoSourceProps[]) =>
    setSources(newSources);

  const handleToggleFullscreen = () => setIsFullscreen((prev) => !prev);
  const handleEnterFullscreen = () => setIsFullscreen(true);
  const handleExitFullscreen = () => setIsFullscreen(false);

  const handleTogglePlayPause = () => setIsPlaying((prev) => !prev);
  const handlePause = () => setIsPlaying(false);
  const handlePlay = () => setIsPlaying(true);

  const handleTogglePip = () => setIsPip((prev) => !prev);
  const handleEnterPip = () => setIsPip(true);
  const handleExitPip = () => setIsPip(false);

  const handleChangeVolume = (volume: number) => {
    setVolume(volume);
    setIsMuted(volume === 0);
  };
  const handleToggleMute = () => {
    setIsMuted((prevMuted) => {
      if (prevMuted) {
        setVolume(mutedVolume);
      } else {
        setMutedVolume(volume);
        setVolume(0);
      }
      return !prevMuted;
    });
  };
  const handleIncreaseVolume = () => {
    setVolume((v) => {
      const newVolume = Math.min(1, v + 0.1);
      setIsMuted(newVolume === 0);
      return newVolume;
    });
  };
  const handleDecreaseVolume = () => {
    setVolume((v) => {
      const newVolume = Math.max(0, v - 0.1);
      setIsMuted(newVolume === 0);
      return newVolume;
    });
  };

  const handleChangeDuration = (duration: number) => setDuration(duration);
  const handleChangeTime = (time: number) => setTime(time);
  const handleSkip = (seconds: number) => setTime((time) => time + seconds);

  const videoPlayerCtxValue: VideoPlayerContextState = {
    isFullscreen,
    isPlaying,
    isPip,
    isMuted,
    sources,
    volume,
    duration,
    time,
    onSetSources: handleSetSources,
    onToggleFullscreen: handleToggleFullscreen,
    onEnterFullscreen: handleEnterFullscreen,
    onExitFullscreen: handleExitFullscreen,
    onTogglePlayPause: handleTogglePlayPause,
    onPause: handlePause,
    onPlay: handlePlay,
    onTogglePip: handleTogglePip,
    onEnterPip: handleEnterPip,
    onExitPip: handleExitPip,
    onChangeVolume: handleChangeVolume,
    onToggleMute: handleToggleMute,
    onIncreaseVolume: handleIncreaseVolume,
    onDecreaseVolume: handleDecreaseVolume,
    onChangeDuration: handleChangeDuration,
    onChangeTime: handleChangeTime,
    onSkip: handleSkip,
  };
  return (
    <VideoPlayerContext.Provider value={videoPlayerCtxValue}>
      {children}
    </VideoPlayerContext.Provider>
  );
};

export default VideoPlayerContextProvider;
