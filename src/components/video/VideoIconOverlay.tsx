import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  OverlayIcon,
  selectOverlayIcon,
} from "../../store/redux/features/video/videoSlice";
import { FaPause, FaPlay } from "react-icons/fa6";
import { RiForward5Line, RiReplay5Line } from "react-icons/ri";
import {
  BiSolidVolumeFull,
  BiSolidVolumeLow,
  BiSolidVolumeMute,
} from "react-icons/bi";
import classes from "./VideoIconOverlay.module.scss";

interface VideoIconOverlayProps {
  onClick: () => void;
}

const VideoIconOverlay = ({ onClick }: VideoIconOverlayProps) => {
  const overlayIcon = useSelector(selectOverlayIcon);
  const [isVisible, setIsVisible] = useState(false);
  const [icon, setIcon] = useState<ReactNode | null>(null);

  useEffect(() => {
    switch (overlayIcon) {
      case OverlayIcon.Nothing:
        return;
      case OverlayIcon.Play:
        setIcon(<FaPlay />);
        break;
      case OverlayIcon.Pause:
        setIcon(<FaPause />);
        break;
      case OverlayIcon.SkipForward1:
      case OverlayIcon.SkipForward2:
        setIcon(<RiForward5Line />);
        break;
      case OverlayIcon.SkipBackward1:
      case OverlayIcon.SkipBackward2:
        setIcon(<RiReplay5Line />);
        break;
      case OverlayIcon.VolumeUp1:
      case OverlayIcon.VolumeUp2:
        setIcon(<BiSolidVolumeFull />);
        break;
      case OverlayIcon.VolumeDown1:
      case OverlayIcon.VolumeDown2:
        setIcon(<BiSolidVolumeLow />);
        break;
      case OverlayIcon.VolumeMute1:
      case OverlayIcon.VolumeMute2:
        setIcon(<BiSolidVolumeMute />);
        break;
    }
    setIsVisible(true);
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [overlayIcon]);

  const overlayClass = `${classes["video-icon-overlay"]} ${
    isVisible ? "" : classes["hidden"]
  }`;

  return (
    <div className={overlayClass} onClick={onClick}>
      <div className={classes["icon"]}>{!!icon && icon}</div>
    </div>
  );
};

export default VideoIconOverlay;
