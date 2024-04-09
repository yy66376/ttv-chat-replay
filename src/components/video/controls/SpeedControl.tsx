import { useState } from "react";
import Option from "../../ui/select/Option";
import Select from "../../ui/select/Select";
import classes from "./SpeedControl.module.scss";

export const playbackSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export interface SpeedControlProps {
  className?: string;
  onChangeSpeed: (speed: number) => void;
}

const initialSpeed = 1;

const SpeedControl = ({ className, onChangeSpeed }: SpeedControlProps) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    playbackSpeeds.indexOf(initialSpeed),
  );
  const [selectedLabel, setSelectedLabel] = useState<string | null>(
    `${initialSpeed.toString()}x`,
  );

  const handleSelectedIndexChange = (index: number | null) => {
    setSelectedIndex(index);
    if (!index) return;
    onChangeSpeed(playbackSpeeds[index]);
  };

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
