import {CSSProperties, MouseEvent, useCallback, useEffect, useRef, useState,} from "react";
import clamp from "../../../utility/clamp";
import {formatTimestamp} from "../../../utility/time";
import Tooltip from "../../ui/tooltip/Tooltip";
import TooltipContent from "../../ui/tooltip/TooltipContent";
import TooltipMouseMoveTrigger from "../../ui/tooltip/TooltipMouseMoveTrigger";
import classes from "./VideoTimeline.module.scss";

interface VideoTimelineProps {
  duration: number;
  time: number;
  onSeek: (seconds: number) => void;
}

const VideoTimeline = ({duration, time, onSeek}: VideoTimelineProps) => {
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [seekTime, setSeekTime] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const leftProgress = `${
    ((isScrubbing && seekTime !== null ? seekTime : time) / duration) * 100
  }%`;

  const calculateTime = useCallback(
    (e: MouseEvent<HTMLDivElement> | globalThis.MouseEvent) => {
      if (!timelineRef.current) return 0;
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const mouseX = clamp(e.clientX, timelineRect.left, timelineRect.right);
      const percentage = (mouseX - timelineRect.left) / timelineRect.width;
      return percentage * duration;
    },
    [duration]
  );

  const handleTimelineMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setSeekTime(calculateTime(e));
    setIsTooltipOpen(true);
  };

  const handleTimelineMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsScrubbing(true);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      if (!isScrubbing || seekTime === null) return;
      setIsScrubbing(false);
      setIsTooltipOpen(false);
      onSeek(seekTime);
    };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!isScrubbing) return;
      setSeekTime(calculateTime(e));
      setIsTooltipOpen(true);
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isScrubbing, seekTime, onSeek, calculateTime]);

  return (
    <div className={classes["video-timeline-container"]}>
      <Tooltip offset={15} open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
        <TooltipMouseMoveTrigger triggerRef={timelineRef}/>
        <TooltipContent className={classes["tooltip"]}>
          {seekTime !== null ? formatTimestamp(seekTime) : ""}
        </TooltipContent>
      </Tooltip>
      <div
        className={classes["video-timeline"]}
        ref={timelineRef}
        style={{"--timeline-left": leftProgress} as CSSProperties}
        onMouseMove={handleTimelineMouseMove}
        onMouseDown={handleTimelineMouseDown}
      >
        <div className={classes["video-timeline__elapsed"]}></div>
      </div>
    </div>
  );
};

export default VideoTimeline;
