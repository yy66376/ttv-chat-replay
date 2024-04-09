import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";

interface FullscreenControlProps {
  className?: string;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

const FullscreenControl = ({
  isFullscreen,
  className,
  onToggleFullscreen,
}: FullscreenControlProps) => {
  return (
    <button className={className ?? ""} onClick={onToggleFullscreen}>
      {!isFullscreen && <BsFullscreen />}
      {isFullscreen && <BsFullscreenExit />}
    </button>
  );
};

export default FullscreenControl;
