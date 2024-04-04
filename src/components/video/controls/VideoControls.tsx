import {RiForward5Line, RiReplay5Line} from "react-icons/ri";
import classes from "./VideoControls.module.scss";
import SpeedControl from "./SpeedControl";
import TimeDurationControl from "./TimeDurationControl";
import FullscreenControl from "./FullscreenControl";
import PipControl from "./PipControl";
import VolumeControl from "./VolumeControl";
import ReplayControl from "./ReplayControl";
import PlayControl from "./PlayControl";

interface VideoControlsProps {
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
}

const VideoControls = ({
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
                       }: VideoControlsProps) => {
  return (
    <div className={classes["video-controls"]}>
      {isEnded && (
        <ReplayControl
          className={classes["video-controls__btn"]}
          onReplay={onReplay}
        />
      )}
      {!isEnded && (
        <PlayControl
          className={classes["video-controls__btn"]}
          isPlaying={isPlaying}
          onTogglePlayPause={onTogglePlayPause}
        />
      )}
      <button
        className={classes["video-controls__btn"]}
        onClick={() => onSkip(-5)}
      >
        <RiReplay5Line/>
      </button>
      <button
        className={classes["video-controls__btn"]}
        onClick={() => onSkip(5)}
      >
        <RiForward5Line/>
      </button>
      <VolumeControl
        isMuted={isMuted}
        volume={volume}
        btnClassName={classes["video-controls__btn"]}
        onChangeVolume={onChangeVolume}
        onToggleMuted={onToggleMuted}
      />
      <TimeDurationControl
        className={classes["video-controls__btn"]}
        time={time}
        duration={duration}
      />
      <SpeedControl
        className={classes["video-controls__btn"]}
        onChangeSpeed={onChangeSpeed}
      />
      <PipControl
        isPip={isPip}
        className={classes["video-controls__btn"]}
        onTogglePip={onTogglePip}
      />
      <FullscreenControl
        isFullscreen={isFullscreen}
        className={classes["video-controls__btn"]}
        onToggleFullscreen={onToggleFullscreen}
      />
    </div>
  );
};

export default VideoControls;
