import { useEffect, useRef } from "react";

const useInputFocus = () => {
    const textFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
    const handleClick = () => {
      if (textFieldRef.current) {
        textFieldRef.current.focus();
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

    return textFieldRef;
}

export default useInputFocus;