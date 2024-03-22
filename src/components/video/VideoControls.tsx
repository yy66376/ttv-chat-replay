import { ChangeEvent, useContext, useMemo } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import {
  BiSolidVolumeFull,
  BiSolidVolumeLow,
  BiSolidVolumeMute,
} from "react-icons/bi";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import {
  RiPictureInPicture2Fill,
  RiPictureInPictureExitFill,
} from "react-icons/ri";
import { VideoPlayerContext } from "../../store/video-player-context";
import classes from "./VideoControls.module.scss";
import { formatTimestamp } from "../../utility/time";

const VideoControls = () => {
  const {
    duration,
    time,
    isFullscreen,
    isPlaying,
    isPip,
    isMuted,
    volume,
    onTogglePlayPause,
    onTogglePip,
    onToggleFullscreen,
    onChangeVolume,
    onToggleMute,
  } = useContext(VideoPlayerContext);

  const pipSupported = useMemo(() => document.pictureInPictureEnabled, []);

  const handleChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = e.target.valueAsNumber;
    onChangeVolume(newVolume);
  };

  let volumeIcon = <BiSolidVolumeFull />;
  if (isMuted || volume === 0) volumeIcon = <BiSolidVolumeMute />;
  else if (volume < 0.5) volumeIcon = <BiSolidVolumeLow />;
  else volumeIcon = <BiSolidVolumeFull />;

  return (
    <div className={classes["video-controls"]}>
      <button
        className={classes["video-controls__btn"]}
        onClick={onTogglePlayPause}
      >
        {!isPlaying && <FaPlay />}
        {isPlaying && <FaPause />}
      </button>
      <div className={classes["video-controls__volume-container"]}>
        <button
          className={classes["video-controls__btn"]}
          onClick={onToggleMute}
        >
          {volumeIcon}
        </button>
        <input
          className={classes["video-controls__volume-slider"]}
          type="range"
          min={0}
          max={1}
          step="any"
          value={volume}
          onChange={handleChangeVolume}
        />
      </div>
      <div className={classes["video-controls__duration-container"]}>
        <span className={classes["video-controls__current-time"]}>
          {formatTimestamp(time)}
        </span>
        /
        <span className={classes["video-controls__total-time"]}>
          {formatTimestamp(duration)}
        </span>
      </div>
      {pipSupported && (
        <button
          className={classes["video-controls__btn"]}
          onClick={onTogglePip}
        >
          {!isPip && <RiPictureInPictureExitFill />}
          {isPip && <RiPictureInPicture2Fill />}
        </button>
      )}
      <button
        className={classes["video-controls__btn"]}
        onClick={onToggleFullscreen}
      >
        {!isFullscreen && <BsFullscreen />}
        {isFullscreen && <BsFullscreenExit />}
      </button>
    </div>
  );
};

export default VideoControls;
