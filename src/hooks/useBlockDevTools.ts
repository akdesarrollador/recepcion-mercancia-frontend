import { useEffect } from 'react'

export function useBlockDevTools() {
     useEffect(() => {
          // if (!import.meta.env.PROD) return
          // bloquear teclas usadas para inspeccionar
          const handleKeyDown = (e: KeyboardEvent) => {
               if (
                    e.key === 'F12' || // F12
                    (e.ctrlKey && e.shiftKey && e.key === 'I') || // Ctrl + Shift + I
                    (e.ctrlKey && e.shiftKey && e.key === 'J') || // Ctrl + Shift + J
                    (e.ctrlKey && e.shiftKey && e.key === 'C') || // Ctrl + Shift + C
                    (e.ctrlKey && e.key === 'u') // Ctrl + U
               ) {
                    e.preventDefault()
               }
          }
          // bloquear click derecho
          const handleContextMenu = (e: MouseEvent) => {
               e.preventDefault()
          }

          window.addEventListener('keydown', handleKeyDown)
          window.addEventListener('contextmenu', handleContextMenu)
          const threshold = 160
          let devtoolsOpen = false
          let intervalId = null

          function detectDevTools() {
               if (
                    window.outerWidth - window.innerWidth > threshold ||
                    window.outerHeight - window.innerHeight > threshold
               ) {
                    if (!devtoolsOpen) {
                         devtoolsOpen = true
                         document.body.innerHTML = ''
                    }
               } else {
                    devtoolsOpen = false
               }
          }

          intervalId = setInterval(detectDevTools, 500)

          return () => {
               window.removeEventListener('keydown', handleKeyDown)
               window.removeEventListener('contextmenu', handleContextMenu)
               clearInterval(intervalId)
          }
     }, [])
}
