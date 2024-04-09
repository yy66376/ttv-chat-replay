import { ReactNode, useEffect, useState } from "react";
import classes from "./VideoIconOverlay.module.scss";

interface VideoIconOverlayProps {
  icon: ReactNode | null;
}

const VideoIconOverlay = ({ icon }: VideoIconOverlayProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!icon) return;
    setIsVisible(true);
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [icon]);

  const overlayClass = `${classes["video-icon-overlay"]} ${
    isVisible ? "" : classes["hidden"]
  }`;

  return (
    <div className={overlayClass}>
      <div className={classes["icon"]}>{!!icon && icon}</div>
    </div>
  );
};

export default VideoIconOverlay;
