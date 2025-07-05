import React, { useState } from "react";
import { Box, Paper, InputBase, useControlled } from "@mui/material";
import useNumericInput from "../../hooks/useNumericInputs";
import { UnitSelector } from "../selectors/unitsSelector";
import type { InputWithSelectorProps, Option } from "../../utils/interfaces/component.props";
import { sxInputBase, sxPaper } from "../../styles/sxInputWithSelector";
import { defaultUnitsOptions } from "../../utils/interfaces/component.props";

export default React.memo(function InputWithSelector({
  selectedUnit, onUnitChange, onTextChange,
  options = defaultUnitsOptions, placeholder, disabled, fullWidth
}: InputWithSelectorProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [currentUnit, setCurrentUnit] = useControlled<Option>({
    controlled: selectedUnit,
    default: defaultUnitsOptions[0],
    name: "InputWithSelector",
    state: "unit",
  });

  const { inputProps, valueProps } = useNumericInput(
    currentUnit.label,
    onTextChange
  );

  return (
    <Box sx={{ position: "relative", width: fullWidth ? "100%" : "50%" }}>
      <Paper variant="outlined" sx={{ ...sxPaper, opacity: disabled ? 0.3 : 1 }}>
        <UnitSelector
          current={currentUnit}
          options={options}
          disabled={disabled}
          anchorEl={anchorEl}
          onOpen={e => setAnchorEl(e.currentTarget)}
          onSelect={opt => {
            setCurrentUnit(opt);
            onUnitChange?.(opt);
            setAnchorEl(null);
          }}
          onClose={() => setAnchorEl(null)}
        />

        <InputBase
          placeholder={placeholder}
          disabled={disabled}
          sx={sxInputBase}
          {...{
            ...inputProps,
            inputMode: inputProps.inputMode as
              | "decimal"
              | "numeric"
              | "search"
              | "text"
              | "none"
              | "tel"
              | "url"
              | "email"
              | undefined,
          }}
          {...valueProps}
        />
      </Paper>
    </Box>
  );
});
