import { useEffect } from 'react';

type Options = {
  disableRightClick?: boolean;
  disableLongPress?: boolean;
};

const useDisableContextMenu = (options: Options = {}) => {
  const { disableRightClick = true, disableLongPress = true } = options;

  useEffect(() => {
    if (!disableRightClick && !disableLongPress) return;

    const handleContextMenu = (e: Event) => {
      if (
        (disableRightClick && e.type === 'contextmenu') ||
        (disableLongPress && (e.type === 'touchend' || e.type === 'touchstart'))
      ) {
        e.preventDefault();
      }
    };

    // Opciones para los event listeners (especificamos que no son passive)
    const listenerOptions: AddEventListenerOptions = {
      passive: false
    };

    // Agregar event listeners con las opciones adecuadas
    if (disableRightClick) {
      document.addEventListener('contextmenu', handleContextMenu, listenerOptions);
    }

    if (disableLongPress) {
      document.addEventListener('touchend', handleContextMenu, listenerOptions);
      document.addEventListener('touchstart', handleContextMenu, listenerOptions);
    }

    return () => {
      // Limpiar event listeners al desmontar
      if (disableRightClick) {
        document.removeEventListener('contextmenu', handleContextMenu);
      }
      if (disableLongPress) {
        document.removeEventListener('touchend', handleContextMenu);
        document.removeEventListener('touchstart', handleContextMenu);
      }
    };
  }, [disableRightClick, disableLongPress]);
};

export default useDisableContextMenu;
