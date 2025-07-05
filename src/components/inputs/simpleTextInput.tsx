import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import { SimpleTextInputProps } from "../../utils/interfaces/component.props";
import { X } from "lucide-react";

const SimpleTextInput: React.FC<SimpleTextInputProps> = ({
  borderColor = "#F4F4F4",
  backgroundColor = "#F4F4F4",
  fontColor = "#000",
  fontSize = "16px",
  fontWeight = "400",
  inputHeight = "40px",
  inputWidth = "100%",
  placeholder,
  label,
  value,
  setValue,
  readonly = false,
  icon,
  onClickIcon,
  onKeyDown,
  textAlign = "left",
  disabled = false,
  inputRef,
  autoComplete = "off",
  autoFocus = false,
  onDoubleClick,
  disableTextSelect = false,
  variant = "text", // Nuevo prop para manejar enteros
}) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const showClearIcon = Boolean(value);

  // Evento para triple click
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);

  const handleTripleClick = () => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 600) {
      clickCountRef.current += 1;
    } else {
      clickCountRef.current = 1;
    }
    lastClickTimeRef.current = now;

    if (clickCountRef.current === 2) {
      clickCountRef.current = 0;
      if (onDoubleClick) {
        onDoubleClick();
      }
    }
  };

  // Usa el ref externo si lo pasan, si no, usa el interno
  const mergedRef = inputRef || internalRef;

  const handleClear = () => {
    setValue("");
    // Espera a que el valor se limpie y luego enfoca el input
    setTimeout(() => {
      mergedRef?.current?.focus();
    }, 0);
  };

  // Nueva función para manejar solo enteros si variant === "int"
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (variant === "int") {
      val = val.replace(/\D/g, ""); // Solo números
    }
    setValue(val);
  };

  // Previene caracteres no numéricos si variant === "int"
  const handleBeforeInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (variant === "int") {
      const input = (e as unknown as InputEvent).data;
      if (input && !/^[0-9]$/.test(input)) {
        e.preventDefault();
      }
    }
  };

  // Previene pegar caracteres no numéricos si variant === "int"
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (variant === "int") {
      const paste = e.clipboardData.getData("text");
      if (!/^[0-9]+$/.test(paste)) {
        e.preventDefault();
      }
    }
  };

  return (
    <TextField
      onClick={handleTripleClick}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      inputRef={mergedRef}
      disabled={disabled}
      fullWidth
      variant="outlined"
      label={label}
      placeholder={placeholder}
      value={value}
      type="text"
      onKeyDown={onKeyDown}
      onChange={handleChange}
      InputProps={{
        readOnly: readonly,
        endAdornment:
          showClearIcon && !readonly ? (
            <span
              onClick={handleClear}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <X size={18} color="#0000007b" />
            </span>
          ) : icon ? (
            <span
              onClick={onClickIcon}
              style={{
                cursor: onClickIcon ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              {icon}
            </span>
          ) : null,
        style: {
          height: inputHeight,
          display: "flex",
          alignItems: "center",
          userSelect: disableTextSelect ? "none" : undefined,
          WebkitUserSelect: disableTextSelect ? "none" : undefined,
          MozUserSelect: disableTextSelect ? "none" : undefined,
          msUserSelect: disableTextSelect ? "none" : undefined,
        },
        inputMode: variant === "int" ? "numeric" : undefined,
        onBeforeInput: handleBeforeInput,
        onPaste: handlePaste,
      }}
      inputProps={{
        pattern: variant === "int" ? "[0-9]*" : undefined,
      }}
      sx={{
        width: inputWidth,
        opacity: disabled ? 0.3 : 1,
        "& .MuiOutlinedInput-root": {
          backgroundColor: backgroundColor,
          color: fontColor,
          fontSize: fontSize,
          height: inputHeight,
          borderRadius: "10px",
          "& fieldset": {
            borderColor: borderColor,
            borderRadius: "10px",
          },
          "&:hover fieldset": {
            borderColor: borderColor,
          },
          "&.Mui-focused fieldset": {
            borderColor: borderColor,
          },
          display: "flex",
          alignItems: "center",
        },
        "& .MuiInputBase-input": {
          color: fontColor,
          fontSize: fontSize,
          fontWeight: fontWeight,
          height: "100%",
          boxSizing: "border-box",
          padding: "16.5px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: textAlign,
          userSelect: disableTextSelect ? "none" : undefined,
          WebkitUserSelect: disableTextSelect ? "none" : undefined,
          MozUserSelect: disableTextSelect ? "none" : undefined,
          msUserSelect: disableTextSelect ? "none" : undefined,
        },
        "& .MuiInputLabel-root": {
          fontSize: fontSize,
          color: "#00000084",
          fontWeight: fontWeight,
        },
      }}
    />
  );
};

export default SimpleTextInput;
