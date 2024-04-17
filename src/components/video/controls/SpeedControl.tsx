import { useEffect, useState } from "react";
import { useRootDispatch } from "../../../hooks/useRootDispatch";
import { useRootSelector } from "../../../hooks/useRootSelector";
import {
  selectPlaybackRate,
  setPlaybackRate,
} from "../../../store/redux/features/video/videoSlice";
import Option from "../../ui/select/Option";
import Select from "../../ui/select/Select";
import classes from "./SpeedControl.module.scss";

export const playbackSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export interface SpeedControlProps {
  className?: string;
}

const SpeedControl = ({ className }: SpeedControlProps) => {
  const playbackRate = useRootSelector(selectPlaybackRate);
  const dispatch = useRootDispatch();

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    playbackSpeeds.indexOf(playbackRate)
  );
  const [selectedLabel, setSelectedLabel] = useState<string | null>(
    `${playbackRate.toString()}x`
  );

  const handleSelectedIndexChange = (index: number | null) => {
    setSelectedIndex(index);
    if (index === null) return;
    dispatch(setPlaybackRate(playbackSpeeds[index]));
  };

  useEffect(() => {
    setSelectedLabel(`${playbackRate}x`);
    setSelectedIndex(playbackSpeeds.indexOf(playbackRate));
  }, [playbackRate]);

  return (
    <Select
      referenceClassName={`${className ?? ""} ${classes["speed-btn"]}`}
      offset={30}
      open={open}
      activeIndex={activeIndex}
      selectedIndex={selectedIndex}
      selectedLabel={selectedLabel}
      onOpenChange={setOpen}
      onActiveIndexChange={setActiveIndex}
      onSelectedIndexChange={handleSelectedIndexChange}
      onSelectedLabelChange={setSelectedLabel}
    >
      {playbackSpeeds.map((s) => (
        <Option
          key={s}
          label={`${s.toString()}x`}
          value={s.toString()}
          className={classes["speed-option"]}
          selectedClassName={classes["speed-option--selected"]}
        />
      ))}
    </Select>
  );
};

export default SpeedControl;
