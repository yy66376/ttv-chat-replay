import { useMergeRefs } from "@floating-ui/react";
import { cloneElement, forwardRef, HTMLProps, isValidElement } from "react";
import useTooltipContext from "../../../hooks/useTooltipContext";

export type TooltipTriggerProps = {
  asChild?: boolean;
} & HTMLProps<HTMLElement>;

export const TooltipTrigger = forwardRef<HTMLDivElement, TooltipTriggerProps>(
  function TooltipTrigger({ asChild = false, children, ...props }, propRef) {
    const {
      isOpen,
      refs: { setReference },
      getReferenceProps,
    } = useTooltipContext();

    const childrenRef = (children as any).ref;
    const ref = useMergeRefs([setReference, propRef, childrenRef]);

    // `asChild` allows the user to pass any element as the anchor
    if (asChild && isValidElement(children)) {
      return cloneElement(
        children,
        getReferenceProps({
          ref,
          ...props,
          ...children.props,
          "data-state": isOpen ? "open" : "closed",
        }),
      );
    }

    return (
      <button
        ref={ref}
        // The user can style the trigger based on the state
        data-state={isOpen ? "open" : "closed"}
        {...getReferenceProps(props)}
      >
        {children}
      </button>
    );
  },
);
