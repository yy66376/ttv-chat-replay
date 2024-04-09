import { formatTimestamp } from "../../../utility/time";
import classes from "./TimeDurationControl.module.scss";

interface TimeDurationControlProps {
  className: string;
  time: number;
  duration: number;
}

const TimeDurationControl = ({
  time,
  duration,
  className,
}: TimeDurationControlProps) => {
  return (
    <div className={`${className ?? ""} ${classes["time-duration-container"]}`}>
      <span className={classes["current-time"]}>{formatTimestamp(time)}</span>/
      <span className={classes["total-time"]}>{formatTimestamp(duration)}</span>
    </div>
  );
};

export default TimeDurationControl;
