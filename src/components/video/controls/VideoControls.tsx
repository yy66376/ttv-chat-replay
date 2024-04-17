import { RiForward5Line, RiReplay5Line } from "react-icons/ri";
import classes from "./VideoControls.module.scss";
import SpeedControl from "./SpeedControl";
import TimeDurationControl from "./TimeDurationControl";
import FullscreenControl from "./FullscreenControl";
import PipControl from "./PipControl";
import VolumeControl from "./VolumeControl";
import ReplayControl from "./ReplayControl";
import PlayControl from "./PlayControl";
import { useRootDispatch } from "../../../hooks/useRootDispatch";
import {
  selectIsEnded,
  skip,
} from "../../../store/redux/features/video/videoSlice";
import { useRootSelector } from "../../../hooks/useRootSelector";

interface VideoControlsProps {
  className?: string;
}

const VideoControls = ({ className }: VideoControlsProps) => {
  const dispatch = useRootDispatch();
  const isEnded = useRootSelector(selectIsEnded);

  const handleSkip = (seconds: number) => dispatch(skip(seconds));

  return (
    <div className={`${className ?? ""} ${classes["video-controls"]}`}>
      {isEnded && <ReplayControl className={classes["video-controls__btn"]} />}
      {!isEnded && <PlayControl className={classes["video-controls__btn"]} />}
      <button
        className={classes["video-controls__btn"]}
        onClick={() => handleSkip(-5)}
      >
        <RiReplay5Line />
      </button>
      <button
        className={classes["video-controls__btn"]}
        onClick={() => handleSkip(5)}
      >
        <RiForward5Line />
      </button>
      <VolumeControl btnClassName={classes["video-controls__btn"]} />
      <TimeDurationControl className={classes["video-controls__btn"]} />
      <SpeedControl className={classes["video-controls__btn"]} />
      <PipControl className={classes["video-controls__btn"]} />
      <FullscreenControl className={classes["video-controls__btn"]} />
    </div>
  );
};

export default VideoControls;
