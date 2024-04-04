import {useMemo} from "react";
import {RiPictureInPicture2Fill, RiPictureInPictureExitFill,} from "react-icons/ri";

interface PipControlProps {
  className?: string;
  isPip: boolean;
  onTogglePip: () => void;
}

const PipControl = ({className, isPip, onTogglePip}: PipControlProps) => {
  const pipSupported = useMemo(() => document.pictureInPictureEnabled, []);
  if (!pipSupported) return null;
  return (
    <button className={className ?? ""} onClick={onTogglePip}>
      {!isPip && <RiPictureInPictureExitFill/>}
      {isPip && <RiPictureInPicture2Fill/>}
    </button>
  );
};

export default PipControl;
