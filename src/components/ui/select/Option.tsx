import { useListItem } from "@floating-ui/react";
import { useContext } from "react";
import { SelectContext } from "../../../store/select-context";
import classes from "./Option.module.scss";

interface OptionProps {
  /**
   * The string to render for this option.
   */
  label: string;
  /**
   * The string to use as a value for this option.
   */
  value: string;
  /**
   * The class to use for this option.
   */
  className?: string;
  /**
   * The class to use when this option is active.
   */
  activeClassName?: string;
  /**
   * The class to use when this option is selected.
   * */
  selectedClassName?: string;
}

const Option = ({
  label,
  value,
  className,
  activeClassName,
  selectedClassName,
}: OptionProps) => {
  const { activeIndex, selectedIndex, getItemProps, handleSelect } =
    useContext(SelectContext);
  const { ref, index } = useListItem({ label });

  const isActive = activeIndex === index;
  const isSelected = selectedIndex === index;

  const classNames =
    [
      className,
      isActive ? activeClassName : "",
      isSelected ? selectedClassName : "",
    ]
      .filter((c) => !!c)
      .join(" ") +
    " " +
    classes["option"];

  return (
    <div className={classes["option-wrapper"]}>
      <button
        ref={ref}
        value={value}
        aria-selected={isActive && isSelected}
        tabIndex={isActive ? 0 : -1}
        role="option"
        {...getItemProps({
          onClick: () => handleSelect(index),
        })}
        style={{
          background: isActive ? "#3e4143" : "",
          fontWeight: isSelected ? "bold" : "",
        }}
        className={classNames}
      >
        {label}
      </button>
    </div>
  );
};

export default Option;
