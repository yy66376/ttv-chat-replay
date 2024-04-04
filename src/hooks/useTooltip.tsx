import {
  arrow,
  ArrowOptions,
  autoUpdate,
  flip,
  FlipOptions,
  offset,
  OffsetOptions,
  Placement,
  shift,
  ShiftOptions,
  useDismiss,
  UseDismissProps,
  useFloating,
  useFocus,
  UseFocusProps,
  useHover,
  UseHoverProps,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import {PropsWithChildren, useMemo, useState} from "react";

type RequiredUseTooltipProps = PropsWithChildren<{
  initialOpen?: boolean;
  placement?: Placement;
  arrow?: ArrowOptions;
  offset?: OffsetOptions;
  flip?: FlipOptions;
  shift?: ShiftOptions;
  dismissProps?: UseDismissProps;
  hoverProps?: UseHoverProps;
  focusProps?: UseFocusProps;
  referenceClassName?: string;
  floatingClassName?: string;
}>;

interface ControlledUseTooltipProps extends RequiredUseTooltipProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UncontrolledUseTooltipProps extends RequiredUseTooltipProps {
  open?: never;
  onOpenChange?: never;
}

export type UseTooltipProps =
  | ControlledUseTooltipProps
  | UncontrolledUseTooltipProps;

const useTooltip = ({
                      initialOpen = false,
                      placement = "top",
                      open: controlledOpen,
                      onOpenChange: setControlledOpen,
                      offset: offSetOptions = 5,
                      arrow: arrowOptions,
                      flip: flipOptions,
                      focusProps: focusOptions,
                      shift: shiftOptions,
                      dismissProps,
                      hoverProps,
                    }: UseTooltipProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

  const isOpen = controlledOpen ?? uncontrolledOpen;
  const setIsOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offSetOptions),
      flip(flipOptions),
      shift(shiftOptions),
      arrowOptions ? arrow(arrowOptions) : undefined,
    ],
  });

  const role = useRole(data.context, {role: "tooltip"});
  const dismiss = useDismiss(data.context, dismissProps);
  const hover = useHover(data.context, hoverProps);
  const focus = useFocus(data.context, focusOptions);

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return useMemo(
    () => ({
      isOpen,
      setIsOpen,
      ...interactions,
      ...data,
    }),
    [isOpen, setIsOpen, interactions, data]
  );
};

export default useTooltip;
