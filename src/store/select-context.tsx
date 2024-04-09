import { useInteractions } from "@floating-ui/react";
import { createContext } from "react";

export interface SelectContextValue {
  activeIndex: number | null;
  selectedIndex: number | null;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  handleSelect: (index: number | null) => void;
}

export const SelectContext = createContext<SelectContextValue>({
  activeIndex: null,
  selectedIndex: null,
  getItemProps: (userProps) => ({ "": "" }),
  handleSelect: (index) => {},
});
