import { MutableRefObject, useEffect } from "react";
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
    refs: { setPositionReference },
  } = useTooltipContext();

  useEffect(() => {
    if (!triggerRef?.current) return;

    const handleTriggerMouseMove = (e: MouseEvent) => {
      if (!triggerRef?.current) return;
      const triggerRect = triggerRef.current.getBoundingClientRect();
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
    };

    const handleTriggerMouseOut = () => setIsOpen(false);

    const handleTriggerMouseEnter = () => setIsOpen(true);

    const handleDocumentMouseMove = (e: MouseEvent) => {
      if (!triggerRef?.current) return;
      const triggerRect = triggerRef.current.getBoundingClientRect();
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

    const triggerRefCurr = triggerRef.current;
    triggerRefCurr.addEventListener("mousemove", handleTriggerMouseMove);
    triggerRefCurr.addEventListener("mouseenter", handleTriggerMouseEnter);
    triggerRefCurr.addEventListener("mouseout", handleTriggerMouseOut);
    document.addEventListener("mousemove", handleDocumentMouseMove);
    return () => {
      triggerRefCurr.removeEventListener("mousemove", handleTriggerMouseMove);
      triggerRefCurr.removeEventListener("mouseenter", handleTriggerMouseEnter);
      triggerRefCurr.removeEventListener("mouseout", handleTriggerMouseOut);
      document.removeEventListener("mousemove", handleDocumentMouseMove);
    };
  }, [triggerRef, setPositionReference, setIsOpen]);
  return <></>;
};

export default TooltipMouseMoveTrigger;
