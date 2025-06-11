import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import { SimpleTextInputProps } from "../../utils/interfaces/componentsProps";
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
}) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const showClearIcon = Boolean(value);

  // Usa el ref externo si lo pasan, si no, usa el interno
  const mergedRef = inputRef || internalRef;

  const handleClear = () => {
    setValue("");
    // Espera a que el valor se limpie y luego enfoca el input
    setTimeout(() => {
      mergedRef?.current?.focus();
    }, 0);
  };

  return (
    <TextField
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
      onChange={(e) => setValue(e.target.value)}
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
        },
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
