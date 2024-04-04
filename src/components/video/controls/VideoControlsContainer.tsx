import VideoControls from "./VideoControls";
import classes from "./VideoControlsContainer.module.scss";
import VideoTimeline from "./VideoTimeline";

export type VideoControlsContainerProps = {
  className?: string;
  duration: number;
  isEnded: boolean;
  isPlaying: boolean;
  isFullscreen: boolean;
  isMuted: boolean;
  isPip: boolean;
  time: number;
  volume: number;
  onTogglePlayPause: () => void;
  onToggleFullscreen: () => void;
  onToggleMuted: () => void;
  onTogglePip: () => void;
  onChangeVolume: (volume: number) => void;
  onReplay: () => void;
  onSkip: (seconds: number) => void;
  onChangeSpeed: (speed: number) => void;
  onSeek: (seconds: number) => void;
};

const VideoControlsContainer = ({
                                  className,
                                  duration,
                                  isEnded,
                                  isPlaying,
                                  isFullscreen,
                                  isMuted,
                                  isPip,
                                  time,
                                  volume,
                                  onTogglePlayPause,
                                  onToggleFullscreen,
                                  onToggleMuted,
                                  onTogglePip,
                                  onChangeVolume,
                                  onReplay,
                                  onSkip,
                                  onChangeSpeed,
                                  onSeek,
                                }: VideoControlsContainerProps) => {
  return (
    <div className={`${className} ${classes["video-controls-container"]}`}>
      <div className={classes["video-controls-container__overlay"]}></div>
      <VideoTimeline duration={duration} time={time} onSeek={onSeek}/>
      <VideoControls
        duration={duration}
        isEnded={isEnded}
        isPlaying={isPlaying}
        isFullscreen={isFullscreen}
        isMuted={isMuted}
        isPip={isPip}
        time={time}
        volume={volume}
        onTogglePlayPause={onTogglePlayPause}
        onToggleFullscreen={onToggleFullscreen}
        onToggleMuted={onToggleMuted}
        onTogglePip={onTogglePip}
        onChangeVolume={onChangeVolume}
        onReplay={onReplay}
        onSkip={onSkip}
        onChangeSpeed={onChangeSpeed}
      />
    </div>
  );
};

export default VideoControlsContainer;
