import { FaPause, FaPlay } from "react-icons/fa6";
import { useRootDispatch } from "../../../hooks/useRootDispatch";
import { useRootSelector } from "../../../hooks/useRootSelector";
import {
  selectIsPlaying,
  togglePlayPause,
} from "../../../store/redux/features/video/videoSlice";

interface PlayControlProps {
  className?: string;
}

const PlayControl = ({ className }: PlayControlProps) => {
  const dispatch = useRootDispatch();
  const isPlaying = useRootSelector(selectIsPlaying);

  const handleToggle = () => dispatch(togglePlayPause());

  return (
    <button className={className ?? ""} onClick={handleToggle}>
      {!isPlaying && <FaPlay />}
      {isPlaying && <FaPause />}
    </button>
  );
};

export default PlayControl;
