import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { sxSeeProgressButton } from '../../styles/sxCheckMerchandise';
import theme from '../../theme/theme';

const ReceptionOptionsMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                sx={{
                    ...sxSeeProgressButton,
                    border: `1px solid ${theme.palette.primary.main}`,
                    color: theme.palette.primary.main,
                    width: '100%'
                }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Opciones
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                    },
                }}
            >
                <MenuItem onClick={handleClose}>Ver Progreso</MenuItem>
                <MenuItem onClick={handleClose}>Añadir orden</MenuItem>
                <MenuItem onClick={handleClose}>Pausar recepción</MenuItem>
            </Menu>
        </div>
    );
}

export default ReceptionOptionsMenu;
