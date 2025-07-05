import React from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { ChevronDown } from "lucide-react";
import type { Option } from "../../utils/interfaces/component.props";
import { sxMenuItem, sxPaperPropsMenu, sxUnitSelectorBox } from "../../styles/sxInputWithSelector";

export const UnitSelector = React.memo(function UnitSelector({
    current, options, disabled,
    anchorEl, onOpen, onSelect, onClose
}: {
    current: Option;
    options: Option[];
    disabled?: boolean;
    anchorEl: HTMLElement | null;
    onOpen(e: React.MouseEvent<HTMLElement>): void;
    onSelect(opt: Option): void;
    onClose(): void;
}) {
    const open = Boolean(anchorEl);
    return (
        <>
            <Box
                onClick={disabled ? undefined : onOpen}
                role="button"
                aria-label="Seleccionar unidad"
                tabIndex={disabled ? -1 : 0}
                sx={{ ...sxUnitSelectorBox, cursor: disabled ? "default" : "pointer" }}
            >
                <Box sx={{ fontSize: 10, fontWeight: 500, color: "#424242" }}>
                    {current.label}
                </Box>
                <IconButton size="small" disabled={disabled} sx={{ padding: 2, color: "#666" }}>
                    <ChevronDown
                        style={{
                            width: 14, height: 14,
                            transform: open ? "rotate(180deg)" : undefined,
                            transition: "transform 0.2s"
                        }}
                    />
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                PaperProps={{ sx: sxPaperPropsMenu }}
            >
                {options.map(opt => (
                    <MenuItem
                        key={opt.value}
                        onClick={() => onSelect(opt)}
                        selected={opt.value === current.value}
                        sx={sxMenuItem}
                    >
                        {opt.value} ({opt.label})
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
});
