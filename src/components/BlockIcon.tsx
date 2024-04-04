import {IconContext} from "react-icons";
import {PropsWithChildren} from "react";

type BlockIconProps = IconContext & PropsWithChildren;

const BlockIcon = ({children, ...restProps}: BlockIconProps) => {
  return (
    <IconContext.Provider value={restProps}>
      <div>{children}</div>
    </IconContext.Provider>
  );
};

export default BlockIcon;
