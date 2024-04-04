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
  useClick,
  UseClickProps,
  useDismiss,
  UseDismissProps,
  useFloating,
  useHover,
  UseHoverProps,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import {PropsWithChildren, useState} from "react";

type PopoverProps = PropsWithChildren<{
  initialOpen?: boolean;
  placement?: Placement;
  modal?: boolean;
  open?: boolean;
  arrow?: ArrowOptions;
  offset?: OffsetOptions;
  flip?: FlipOptions;
  shift?: ShiftOptions;
  clickProps?: UseClickProps;
  dismissProps?: UseDismissProps;
  hoverProps?: UseHoverProps;
  onOpenChange?: (open: boolean) => void;
}>;

const Popover = ({
                   initialOpen = false,
                   placement = "bottom",
                   offset: offSetOptions = 10,
                   arrow: arrowOptions,
                   flip: flipOptions,
                   shift: shiftOptions,
                   open: controlledOpen,
                   clickProps,
                   dismissProps,
                   hoverProps,
                   onOpenChange: setControlledOpen,
                 }: PopoverProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const [labelId, setLabelId] = useState<string>();
  const [descriptionId, setDescriptionId] = useState<string>();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const {refs, floatingStyles, context} = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offSetOptions),
      flip(flipOptions),
      shift(shiftOptions),
      arrowOptions ? arrow(arrowOptions) : undefined,
    ],
  });

  const click = useClick(context, {
    ...clickProps,
    enabled: controlledOpen === null,
  });
  const role = useRole(context);
  const dismiss = useDismiss(context, dismissProps);
  const hover = useHover(context, {...hoverProps, enabled: !!hoverProps});

  const {getReferenceProps, getFloatingProps, getItemProps} = useInteractions([click, role, dismiss, hover])
};

export default Popover;
