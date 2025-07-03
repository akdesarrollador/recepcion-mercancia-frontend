import React, { useEffect, useState, useCallback } from "react";
import { Box, IconButton, InputBase, Menu, MenuItem, Paper } from "@mui/material";
import { ChevronDown } from "lucide-react";
import type { Option, InputWithSelectorProps } from "../../utils/interfaces/component.props";
import { sxInputBase, sxMenuItem, sxPaper, sxPaperPropsMenu, sxUnitSelectorBox } from "../../styles/sxInputWithSelector";

const defaultOptions: Option[] = [
  { value: "Unidades", label: "U" },
  { value: "Bultos", label: "B" },
  { value: "Kilogramos", label: "Kg" },
];

const InputWithSelector: React.FC<InputWithSelectorProps> = ({
  selectedUnit,
  textValue = "",
  onUnitChange,
  onTextChange,
  options = defaultOptions,
  placeholder = "",
  disabled = false,
  fullWidth = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentUnit, setCurrentUnit] = useState<Option>(selectedUnit ?? defaultOptions[0]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (selectedUnit) setCurrentUnit(selectedUnit);
  }, [selectedUnit]);

  const handleUnitClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (!disabled) setAnchorEl(event.currentTarget);
  }, [disabled]);

  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleUnitSelect = useCallback((option: Option) => {
    setCurrentUnit(option);
    onUnitChange?.(option);
    handleClose();
  }, [onUnitChange, handleClose]);

  // const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  //   onTextChange?.(event.target.value);
  // }, [onTextChange]);

  return (
    <Box sx={{ position: "relative", width: fullWidth ? "100%" : "50%" }}>
      <Paper
        variant="outlined"
        sx={{
          ...sxPaper,
          opacity: disabled ? 0.3 : 1,
        }}
      >
        {/* Unit Selector Section */}
        <Box
          onClick={handleUnitClick}
          sx={{
            ...sxUnitSelectorBox,
            cursor: disabled ? "default" : "pointer",
          }}
          aria-label="Seleccionar unidad"
          tabIndex={disabled ? -1 : 0}
          role="button"
        >
          <Box
            sx={{
              fontSize: "10px",
              fontWeight: 500,
              color: "#424242",
            }}
          >
            {currentUnit.label}
          </Box>
          <IconButton
            size="small"
            disabled={disabled}
            sx={{
              padding: "2px",
              color: "#666",
            }}
            aria-label="Abrir menú de unidades"
            tabIndex={-1}
          >
            <ChevronDown
              style={{
                width: "14px",
                height: "14px",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease-in-out",
              }}
            />
          </IconButton>
        </Box>

        {/* Text Input Section */}
        <InputBase
          value={textValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            // Reemplaza comas por puntos automáticamente
            const value = event.target.value.replace(/,/g, ".");
            onTextChange?.(value);
          }}
          placeholder={placeholder}
          disabled={disabled}
          sx={sxInputBase}
          inputProps={{
            inputMode: "decimal",
            pattern: "[0-9]*[.,]?[0-9]*",
            // Prevent typing non-numeric characters
            onBeforeInput: (e: React.FormEvent<HTMLInputElement>) => {
              const input = (e as unknown as InputEvent).data;
              if (
                input &&
                !/^[0-9.,]$/.test(input)
              ) {
                e.preventDefault();
              }
            },
            // Prevent pasting non-numeric content
            onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => {
              const paste = e.clipboardData.getData("text");
              if (!/^[0-9]*[.,]?[0-9]*$/.test(paste)) {
                e.preventDefault();
              }
            },
          }}
        />
      </Paper>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: { sxPaperPropsMenu },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleUnitSelect(option)}
            selected={option.value === currentUnit.value}
            sx={sxMenuItem}
          >
            {option.value} ({option.label})
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default InputWithSelector;