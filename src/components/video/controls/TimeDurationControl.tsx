import { useRootSelector } from "../../../hooks/useRootSelector";
import {
  selectDisplayTime,
  selectDuration,
} from "../../../store/redux/features/video/videoSlice";
import { formatTimestamp } from "../../../utility/time";
import classes from "./TimeDurationControl.module.scss";

interface TimeDurationControlProps {
  className: string;
}

const TimeDurationControl = ({ className }: TimeDurationControlProps) => {
  const time = useRootSelector(selectDisplayTime);
  const duration = useRootSelector(selectDuration);

  return (
    <div className={`${className ?? ""} ${classes["time-duration-container"]}`}>
      <span className={classes["current-time"]}>{formatTimestamp(time)}</span>/
      <span className={classes["total-time"]}>{formatTimestamp(duration)}</span>
    </div>
  );
};

export default TimeDurationControl;
