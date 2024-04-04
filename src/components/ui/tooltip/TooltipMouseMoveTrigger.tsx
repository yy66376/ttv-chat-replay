import {MutableRefObject, useEffect, useMemo} from "react";
import useTooltipContext from "../../../hooks/useTooltipContext";
import clamp from "../../../utility/clamp";

interface TooltipMouseMoveTriggerProps {
  triggerRef: MutableRefObject<HTMLElement | null>;
}

const TooltipMouseMoveTrigger = ({
                                   triggerRef,
                                 }: TooltipMouseMoveTriggerProps) => {
  const {
    setIsOpen,
    refs: {setPositionReference},
  } = useTooltipContext();
  const triggerRefCurrent = triggerRef.current;

  const triggerRect = useMemo(() => {
    return triggerRefCurrent?.getBoundingClientRect();
  }, [triggerRefCurrent]);

  useEffect(() => {
    if (!triggerRefCurrent || !triggerRect) return;

    const handleTriggerMouseMove = (e: MouseEvent) => {
      setPositionReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: e.clientX,
            y: triggerRect.top,
            top: triggerRect.top,
            right: e.clientX,
            bottom: triggerRect.top,
            left: e.clientX,
          };
        },
      });

      setIsOpen(true);
    };

    const handleTriggerMouseOut = (e: MouseEvent) => setIsOpen(false);

    const handleDocumentMouseMove = (e: MouseEvent) => {
      setPositionReference({
        getBoundingClientRect() {
          const x = clamp(e.clientX, triggerRect.left, triggerRect.right);
          const y = triggerRect.top;
          return {
            width: 0,
            height: 0,
            x,
            y,
            top: y,
            left: x,
            right: x,
            bottom: y,
          };
        },
      });
    };

    triggerRefCurrent.addEventListener("mousemove", handleTriggerMouseMove);
    triggerRefCurrent.addEventListener("mouseout", handleTriggerMouseOut);
    document.addEventListener("mousemove", handleDocumentMouseMove);
    return () => {
      triggerRefCurrent.removeEventListener(
        "mousemove",
        handleTriggerMouseMove
      );
      triggerRefCurrent.removeEventListener("mouseout", handleTriggerMouseOut);
      document.removeEventListener("mousemove", handleDocumentMouseMove);
    };
  }, [triggerRefCurrent, triggerRect, setPositionReference, setIsOpen]);
  return <></>;
};

export default TooltipMouseMoveTrigger;
