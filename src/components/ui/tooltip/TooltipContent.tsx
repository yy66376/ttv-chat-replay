import {FloatingPortal, useMergeRefs} from "@floating-ui/react";
import {forwardRef, HTMLProps} from "react";
import useTooltipContext from "../../../hooks/useTooltipContext";

export type TooltipContentProps = {} & HTMLProps<HTMLElement>;

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent({style, ...props}, propRef) {
    const {
      refs: {setFloating},
      isOpen,
      floatingStyles,
      getFloatingProps,
    } = useTooltipContext();
    const ref = useMergeRefs([setFloating, propRef]);

    if (!isOpen) return null;
    return (
      <FloatingPortal>
        <div
          ref={ref}
          style={{
            ...floatingStyles,
            ...style,
          }}
          {...getFloatingProps(props)}
        />
      </FloatingPortal>
    );
  }
);

export default TooltipContent;
