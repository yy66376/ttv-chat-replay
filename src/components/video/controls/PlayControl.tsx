import { FaPause, FaPlay } from "react-icons/fa6";

interface PlayControlProps {
  className?: string;
  isPlaying: boolean;
  onTogglePlayPause: () => void;
}

const PlayControl = ({
  className,
  isPlaying,
  onTogglePlayPause,
}: PlayControlProps) => {
  return (
    <button className={className ?? ""} onClick={onTogglePlayPause}>
      {!isPlaying && <FaPlay />}
      {isPlaying && <FaPause />}
    </button>
  );
};

export default PlayControl;
