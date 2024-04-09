import {
  arrow,
  autoUpdate,
  flip,
  FlipOptions,
  FloatingArrowProps,
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
import {
  PropsWithChildren,
  useMemo,
  useState,
  MutableRefObject,
  useRef,
} from "react";

type RequiredUseTooltipProps = PropsWithChildren<{
  arrow?: boolean;
  arrowOptions?: Omit<FloatingArrowProps, "context" | "ref">;
  initialOpen?: boolean;
  placement?: Placement;
  offset?: OffsetOptions;
  flip?: FlipOptions;
  shift?: ShiftOptions;
  dismissProps?: UseDismissProps;
  hoverProps?: UseHoverProps;
  focusProps?: UseFocusProps;
  referenceClassName?: string;
  floatingClassName?: string;
  portalRoot?: HTMLElement | MutableRefObject<HTMLElement | null>;
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
  arrow: arrowEnabled,
  arrowOptions,
  flip: flipOptions,
  focusProps: focusOptions,
  shift: shiftOptions,
  dismissProps,
  hoverProps,
  portalRoot,
}: UseTooltipProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const arrowRef = useRef<SVGSVGElement | null>(null);

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
      arrow({ element: arrowRef }),
    ],
  });

  const role = useRole(data.context, { role: "tooltip" });
  const dismiss = useDismiss(data.context, dismissProps);
  const hover = useHover(data.context, hoverProps);
  const focus = useFocus(data.context, focusOptions);

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return useMemo(
    () => ({
      arrowRef: arrowEnabled ? arrowRef : null,
      arrowOptions,
      portalRoot,
      isOpen,
      setIsOpen,
      ...interactions,
      ...data,
    }),
    [
      isOpen,
      setIsOpen,
      interactions,
      data,
      portalRoot,
      arrowEnabled,
      arrowOptions,
    ]
  );
};

export default useTooltip;
