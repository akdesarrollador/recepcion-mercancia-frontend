import { useCallback } from "react";

export default function useNumericInput(unitLabel: string, onTextChange?: (v: string) => void) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/,/g, ".");
    onTextChange?.(v);
  }, [onTextChange]);

  const beforeInput = useCallback(() => {
    /* …lógica extraída… */
  }, [unitLabel]);

  const onPaste = useCallback(() => {
    /* …lógica extraída… */
  }, [unitLabel]);

  return {
    inputProps: {
      inputMode: unitLabel === "Kg" ? "decimal" : "numeric",
      pattern: unitLabel === "Kg"
        ? "^[0-9]+(\\.[0-9]*)?$"
        : "^[0-9]*$",
      onBeforeInput: beforeInput,
      onPaste,
    },
    valueProps: {
      value: "",      // se inyecta desde el contenedor
      onChange: handleChange,
    },
  };
}
