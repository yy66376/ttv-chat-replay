import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { useRootDispatch } from "../../../hooks/useRootDispatch";
import { useRootSelector } from "../../../hooks/useRootSelector";
import {
  selectIsFullscreen,
  toggleFullscreen,
} from "../../../store/redux/features/video/videoSlice";

interface FullscreenControlProps {
  className?: string;
}

const FullscreenControl = ({ className }: FullscreenControlProps) => {
  const dispatch = useRootDispatch();
  const isFullscreen = useRootSelector(selectIsFullscreen);

  const handleToggle = () => dispatch(toggleFullscreen());

  return (
    <button className={className ?? ""} onClick={handleToggle}>
      {!isFullscreen && <BsFullscreen />}
      {isFullscreen && <BsFullscreenExit />}
    </button>
  );
};

export default FullscreenControl;
