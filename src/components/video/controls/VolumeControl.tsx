import { ChangeEvent, useMemo } from "react";
import {
  BiSolidVolumeFull,
  BiSolidVolumeLow,
  BiSolidVolumeMute,
} from "react-icons/bi";
import { useRootDispatch } from "../../../hooks/useRootDispatch";
import { useRootSelector } from "../../../hooks/useRootSelector";
import {
  selectIsMuted,
  selectVolume,
  setVolume,
  toggleMute,
} from "../../../store/redux/features/video/videoSlice";
import classes from "./VolumeControl.module.scss";

interface VolumeControlProps {
  btnClassName?: string;
  containerClassName?: string;
  sliderClassName?: string;
}

const VolumeControl = ({
  btnClassName,
  containerClassName,
  sliderClassName,
}: VolumeControlProps) => {
  const dispatch = useRootDispatch();
  const volume = useRootSelector(selectVolume);
  const isMuted = useRootSelector(selectIsMuted);

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = e.target.valueAsNumber;
    dispatch(setVolume(newVolume));
  };

  const handleToggleMute = () => dispatch(toggleMute());

  const volumeIcon = useMemo(() => {
    if (isMuted || volume === 0) return <BiSolidVolumeMute />;
    else if (volume < 0.5) return <BiSolidVolumeLow />;
    else return <BiSolidVolumeFull />;
  }, [volume, isMuted]);

  return (
    <div
      className={`${containerClassName ?? ""} ${classes["volume-container"]}`}
    >
      <button className={btnClassName ?? ""} onClick={handleToggleMute}>
        {volumeIcon}
      </button>
      <input
        className={`${sliderClassName ?? ""} ${classes["volume-slider"]}`}
        type="range"
        min={0}
        max={1}
        step="any"
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default VolumeControl;
