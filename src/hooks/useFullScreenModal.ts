/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const useFullScreenModal = () => {
  const [showFullScreenModal, setShowFullScreenModal] = useState(false);

  useEffect(() => {
    const checkFullScreen = () => {
      const isFullScreen =
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement;
      setShowFullScreenModal(!isFullScreen);
    };

    checkFullScreen();
    document.addEventListener("fullscreenchange", checkFullScreen);
    document.addEventListener("webkitfullscreenchange", checkFullScreen);
    document.addEventListener("mozfullscreenchange", checkFullScreen);
    document.addEventListener("MSFullscreenChange", checkFullScreen);

    return () => {
      document.removeEventListener("fullscreenchange", checkFullScreen);
      document.removeEventListener("webkitfullscreenchange", checkFullScreen);
      document.removeEventListener("mozfullscreenchange", checkFullScreen);
      document.removeEventListener("MSFullscreenChange", checkFullScreen);
    };
  }, []);

  return [showFullScreenModal, setShowFullScreenModal] as const;
}

export default useFullScreenModal;