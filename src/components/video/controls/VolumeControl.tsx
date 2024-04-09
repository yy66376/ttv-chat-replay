import { ChangeEvent } from "react";
import {
  BiSolidVolumeFull,
  BiSolidVolumeLow,
  BiSolidVolumeMute,
} from "react-icons/bi";
import classes from "./VolumeControl.module.scss";

interface VolumeControlProps {
  isMuted: boolean;
  volume: number;
  btnClassName?: string;
  containerClassName?: string;
  sliderClassName?: string;
  onToggleMuted: () => void;
  onChangeVolume: (volume: number) => void;
}

const VolumeControl = ({
  isMuted,
  volume,
  btnClassName,
  containerClassName,
  sliderClassName,
  onToggleMuted,
  onChangeVolume,
}: VolumeControlProps) => {
  let volumeIcon: JSX.Element;
  switch (true) {
    case isMuted || volume === 0:
      volumeIcon = <BiSolidVolumeMute />;
      break;
    case volume < 0.5:
      volumeIcon = <BiSolidVolumeLow />;
      break;
    default:
      volumeIcon = <BiSolidVolumeFull />;
      break;
  }

  const handleChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = e.target.valueAsNumber;
    onChangeVolume(newVolume);
  };

  return (
    <div
      className={`${containerClassName ?? ""} ${classes["volume-container"]}`}
    >
      <button className={btnClassName ?? ""} onClick={onToggleMuted}>
        {volumeIcon}
      </button>
      <input
        className={`${sliderClassName ?? ""} ${classes["volume-slider"]}`}
        type="range"
        min={0}
        max={1}
        step="any"
        value={isMuted ? 0 : volume}
        onChange={handleChangeVolume}
      />
    </div>
  );
};

export default VolumeControl;
