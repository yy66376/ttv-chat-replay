import {
  arrow,
  ArrowOptions,
  autoUpdate,
  flip,
  FlipOptions,
  FloatingFocusManager,
  FloatingList,
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
  useListNavigation,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import {
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  SelectContext,
  SelectContextValue,
} from "../../../store/select-context";
import classes from "./Select.module.scss";

type RequiredSelectProps = PropsWithChildren<{
  initialOpen?: boolean;
  initialSelected?: { index: number; label: string };
  placement?: Placement;
  arrow?: ArrowOptions;
  offset?: OffsetOptions;
  flip?: FlipOptions;
  shift?: ShiftOptions;
  clickProps?: UseClickProps;
  dismissProps?: UseDismissProps;
  hoverProps?: UseHoverProps;
  referenceClassName?: string;
  floatingClassName?: string;
}>;

interface ControlledSelectProps extends RequiredSelectProps {
  open: boolean;
  activeIndex: number | null;
  selectedIndex: number | null;
  selectedLabel: string | null;
  onOpenChange: (open: boolean) => void;
  onActiveIndexChange: (activeIndex: number | null) => void;
  onSelectedIndexChange: (selectedIndex: number | null) => void;
  onSelectedLabelChange: (label: string | null) => void;
}

interface UncontrolledSelectProps extends RequiredSelectProps {
  open: undefined;
  activeIndex: undefined;
  selectedIndex: undefined;
  selectedLabel: undefined;
  onOpenChange?: never;
  onActiveIndexChange?: never;
  onSelectedIndexChange?: never;
  onSelectedLabelChange?: never;
}

type SelectProps = ControlledSelectProps | UncontrolledSelectProps;

const Select = ({
  children,
  activeIndex: controlledActiveIndex,
  selectedIndex: controlledSelectedIndex,
  selectedLabel: controlledSelectedLabel,
  initialOpen = false,
  initialSelected,
  placement = "bottom",
  offset: offSetOptions = 10,
  arrow: arrowOptions,
  flip: flipOptions,
  shift: shiftOptions,
  open: controlledOpen,
  clickProps,
  dismissProps,
  hoverProps,
  referenceClassName,
  floatingClassName,
  onOpenChange: setControlledOpen,
  onActiveIndexChange: setControlledActiveIndex,
  onSelectedIndexChange: setControlledSelectedIndex,
  onSelectedLabelChange: setControlledSelectedLabel,
}: SelectProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const [uncontrolledActiveIndex, setUncontrolledActiveIndex] = useState<
    number | null
  >(null);
  const [uncontrolledSelectedIndex, setUncontrolledSelectedIndex] = useState<
    number | null
  >(initialSelected?.index ?? null);
  const [uncontrolledSelectedLabel, setUncontrolledSelectedLabel] = useState<
    string | null
  >(initialSelected?.label ?? null);

  const isOpen = controlledOpen ?? uncontrolledOpen;
  const setIsOpen = setControlledOpen ?? setUncontrolledOpen;
  const activeIndex = controlledActiveIndex ?? uncontrolledActiveIndex;
  const setActiveIndex = setControlledActiveIndex ?? setUncontrolledActiveIndex;
  const selectedIndex = controlledSelectedIndex ?? uncontrolledSelectedIndex;
  const setSelectedIndex =
    setControlledSelectedIndex ?? setUncontrolledSelectedIndex;
  const selectedLabel = controlledSelectedLabel ?? uncontrolledSelectedLabel;
  const setSelectedLabel =
    setControlledSelectedLabel ?? setUncontrolledSelectedLabel;

  const {
    refs: { setReference, setFloating },
    floatingStyles,
    context,
  } = useFloating({
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

  const handleSelect = useCallback(
    (index: number | null) => {
      setSelectedIndex(index);
      setIsOpen(false);
      if (index !== null) {
        setSelectedLabel(labelsRef.current[index]);
      }
    },
    [setIsOpen, setSelectedIndex, setSelectedLabel],
  );

  function handleTypeaheadMatch(index: number | null) {
    if (isOpen) {
      setActiveIndex(index);
    } else {
      handleSelect(index);
    }
  }

  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
  });

  const typeAhead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: handleTypeaheadMatch,
  });

  const click = useClick(context, clickProps);
  const role = useRole(context, { role: "listbox" });
  const dismiss = useDismiss(context, dismissProps);
  const hover = useHover(context, { ...hoverProps, enabled: !!hoverProps });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [listNavigation, typeAhead, click, role, dismiss, hover],
  );

  const selectContext = useMemo<SelectContextValue>(
    () => ({
      activeIndex,
      selectedIndex,
      getItemProps,
      handleSelect,
    }),
    [activeIndex, selectedIndex, getItemProps, handleSelect],
  );

  return (
    <>
      <div
        ref={setReference}
        tabIndex={0}
        {...getReferenceProps()}
        className={referenceClassName ?? ""}
      >
        {selectedLabel ?? ""}
      </div>
      <SelectContext.Provider value={selectContext}>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              className={`${classes["select"]} ${floatingClassName ?? ""}`}
              ref={setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                {children}
              </FloatingList>
            </div>
          </FloatingFocusManager>
        )}
      </SelectContext.Provider>
    </>
  );
};

export default Select;
