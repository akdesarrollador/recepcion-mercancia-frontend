import React from "react";
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment";
import { X } from 'lucide-react';
import { Eye } from 'lucide-react';
import { useState } from "react";
import { EyeOff } from 'lucide-react';
import { ColoredTextInputProps } from "../../utils/interfaces/component.props";

const ColoredTextInput: React.FC<ColoredTextInputProps> = ({
    borderColor = "#1976d2",
    placeholder,
    label,
    value,
    setValue,
    icon,
    password = false,
    ref,
    autoFocus = false,
    autoComplete = "off",
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const getEndAdornment = () => {
        if (value === "") {
            return icon ? (
                <InputAdornment position="start">{icon}</InputAdornment>
            ) : undefined;
        } else {
            if (password) {
                return (
                    <InputAdornment position="start">
                        {showPassword ? (
                            <Eye style={{ color: borderColor }} onClick={() => setShowPassword(false)} />
                        ) : (
                            <EyeOff style={{ color: borderColor }} onClick={() => setShowPassword(true)} />
                        )}
                    </InputAdornment>
                );
            } else {
                return (
                    <InputAdornment position="start">
                        <X style={{ cursor: "pointer", color: borderColor }} onClick={() => setValue("")} />
                    </InputAdornment>
                );
            }
        }
    };

    return (
        <TextField
            inputRef={ref}
            fullWidth
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            variant="outlined"
            label={label}
            placeholder={placeholder}
            value={value}
            type={password ? showPassword ? "text" : "password" : "text"}
            onChange={(e) => setValue(e.target.value)}
            InputProps={{
                endAdornment: getEndAdornment(),
                style: {
                    backgroundColor: "#F3F3F3",
                    color: "#000",
                    fontSize: 20,
                    height: 53,
                    borderRadius: 10,
                },
            }}
            sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                    backgroundColor: "#F3F3F3",
                    color: "#000",
                    fontSize: 20,
                    height: 53,
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
                },
                "& .MuiInputBase-input": {
                    color: "#000",
                    fontSize: 14,
                    height: "53px",
                    boxSizing: "border-box",
                    padding: "16.5px 14px",
                },
                "& .MuiInputLabel-root": {
                    fontSize: 14,
                    color: "#898989",
                },
            }}
        />
    );
};

export default ColoredTextInput;