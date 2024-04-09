import { PropsWithChildren } from "react";
import useTooltip, { UseTooltipProps } from "../../../hooks/useTooltip";
import { TooltipContext } from "../../../store/tooltip-context";

type TooltipProps = PropsWithChildren<UseTooltipProps>;

const Tooltip = ({ children, ...options }: TooltipProps) => {
  const tooltip = useTooltip(options);
  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
};

export default Tooltip;
