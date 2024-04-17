import { useMemo } from "react";
import {
  RiPictureInPicture2Fill,
  RiPictureInPictureExitFill,
} from "react-icons/ri";
import { useRootDispatch } from "../../../hooks/useRootDispatch";
import { useRootSelector } from "../../../hooks/useRootSelector";
import {
  selectIsPip,
  togglePip,
} from "../../../store/redux/features/video/videoSlice";

interface PipControlProps {
  className?: string;
}

const PipControl = ({ className }: PipControlProps) => {
  const pipSupported = useMemo(() => document.pictureInPictureEnabled, []);

  const isPip = useRootSelector(selectIsPip);
  const dispatch = useRootDispatch();

  const handleToggle = () => dispatch(togglePip());

  if (!pipSupported) return null;
  return (
    <button className={className ?? ""} onClick={handleToggle}>
      {!isPip && <RiPictureInPictureExitFill />}
      {isPip && <RiPictureInPicture2Fill />}
    </button>
  );
};

export default PipControl;
