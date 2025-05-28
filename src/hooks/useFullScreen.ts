import { useEffect } from "react";

/**
 * Hook que habilita el modo pantalla completa al hacer doble clic en cualquier parte de la ventana.
 *
 * - Utiliza `document.fullscreenElement` para verificar si ya está en pantalla completa.
 * - Si no lo está, invoca `requestFullscreen()` sobre `document.documentElement`.
 * - Registra un `eventListener` sobre el `window` para el evento `"dblclick"`.
 * - Elimina correctamente el listener al desmontar el componente.
 *
 * @example
 * useFullScreen(); // Llama este hook en un componente para habilitar el modo fullscreen con doble clic
 */
const useFullScreen = (): void => {
  useEffect(() => {
    const toggleFullscreen = (): void => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.error("Error attempting to enable full-screen mode:", err);
        });
      }
    };

    window.addEventListener("dblclick", toggleFullscreen);

    return () => {
      window.removeEventListener("dblclick", toggleFullscreen);
    };
  }, []);
};

export default useFullScreen;