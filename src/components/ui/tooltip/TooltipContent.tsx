import {
  FloatingArrow,
  FloatingPortal,
  useMergeRefs,
} from "@floating-ui/react";
import { forwardRef, HTMLProps } from "react";
import useTooltipContext from "../../../hooks/useTooltipContext";

export type TooltipContentProps = {} & HTMLProps<HTMLElement>;

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent({ style, children, ...props }, propRef) {
    const {
      refs: { setFloating },
      isOpen,
      floatingStyles,
      portalRoot,
      arrowRef,
      arrowOptions,
      context,
      getFloatingProps,
    } = useTooltipContext();
    const ref = useMergeRefs([setFloating, propRef]);

    if (!isOpen) return null;
    return (
      <FloatingPortal root={portalRoot ?? null}>
        <div
          ref={ref}
          style={{
            ...floatingStyles,
            ...style,
          }}
          {...getFloatingProps(props)}
        >
          {children}
          {arrowRef && (
            <FloatingArrow context={context} ref={arrowRef} {...arrowOptions} />
          )}
        </div>
      </FloatingPortal>
    );
  }
);

export default TooltipContent;
