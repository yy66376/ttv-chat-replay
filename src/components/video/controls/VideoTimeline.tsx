import {
  CSSProperties,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRootDispatch } from "../../../hooks/useRootDispatch";
import { useRootSelector } from "../../../hooks/useRootSelector";
import {
  seek,
  selectDisplayTime,
  selectDuration,
} from "../../../store/redux/features/video/videoSlice";
import clamp from "../../../utility/clamp";
import { formatTimestamp } from "../../../utility/time";
import Tooltip from "../../ui/tooltip/Tooltip";
import TooltipContent from "../../ui/tooltip/TooltipContent";
import TooltipMouseMoveTrigger from "../../ui/tooltip/TooltipMouseMoveTrigger";
import classes from "./VideoTimeline.module.scss";

let isScrubbing = false;

interface VideoTimelineProps {}

const VideoTimeline = (props: VideoTimelineProps) => {
  const time = useRootSelector(selectDisplayTime);
  const duration = useRootSelector(selectDuration);
  const dispatch = useRootDispatch();

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [seekTime, setSeekTime] = useState<number | null>(null);
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);
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
    isScrubbing = true;
  };

  useEffect(() => {
    const handleMouseUp = () => {
      if (!isScrubbing || seekTime === null) return;
      isScrubbing = false;
      setIsTooltipOpen(false);
      dispatch(seek(seekTime));
    };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!isScrubbing) return;
      e.preventDefault();
      setSeekTime(calculateTime(e));
      setIsTooltipOpen(true);
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [seekTime, calculateTime, dispatch]);

  return (
    <>
      <div
        className={classes["video-timeline-container"]}
        ref={timelineContainerRef}
        style={{ "--timeline-left": leftProgress } as CSSProperties}
      >
        <Tooltip
          offset={15}
          open={isTooltipOpen}
          portalRoot={timelineContainerRef}
          onOpenChange={setIsTooltipOpen}
        >
          <TooltipMouseMoveTrigger triggerRef={timelineRef} />
          <TooltipContent className={classes["tooltip"]}>
            {seekTime !== null ? formatTimestamp(seekTime) : ""}
          </TooltipContent>
        </Tooltip>
        <div
          className={classes["video-timeline"]}
          ref={timelineRef}
          onMouseMove={handleTimelineMouseMove}
          onMouseDown={handleTimelineMouseDown}
        >
          <div className={classes["video-timeline__elapsed"]}></div>
        </div>
      </div>
    </>
  );
};

export default VideoTimeline;
