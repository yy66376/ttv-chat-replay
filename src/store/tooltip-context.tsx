import { createContext } from "react";
import useTooltip from "../hooks/useTooltip";

export type TooltipContextValue = ReturnType<typeof useTooltip> | null;

export const TooltipContext = createContext<TooltipContextValue>(null);
