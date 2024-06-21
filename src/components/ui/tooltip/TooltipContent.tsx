import {
  FloatingArrow,
  FloatingPortal,
  useMergeRefs,
} from "@floating-ui/react";
import { forwardRef, HTMLProps } from "react";
import useTooltipContext from "../../../hooks/useTooltipContext";
import { AnimatePresence, motion } from "framer-motion";

export type TooltipContentProps = HTMLProps<HTMLElement>;

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

    return (
      <FloatingPortal root={portalRoot ?? null}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={{
                visible: { opacity: 1 },
                hidden: { opacity: 0 },
              }}
              transition={{ duration: 0.3 }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              ref={ref}
              style={{
                ...floatingStyles,
                ...style,
              }}
              {...getFloatingProps(props)}
            >
              {children}
              {arrowRef && (
                <FloatingArrow
                  context={context}
                  ref={arrowRef}
                  {...arrowOptions}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    );
  }
);

export default TooltipContent;
