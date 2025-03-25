import React, { useState } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  styled,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from '../Images/logo.png';
import profile from '../Images/profile.png';
import { useNavigate } from 'react-router-dom';
const LogoSection = styled(Box)(({ theme }) => ({
  padding: '20px 24px',
  display: 'flex',
  alignItems: 'center',
  height: 70,
  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#1E293B',
  color: '#fff',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
}));

const Header = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 0 }}
          >
            <MenuIcon />
          </IconButton>
          <LogoSection>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{ height: 45, mr: 0, cursor: 'pointer' }}
              onClick={() => navigate("/")}
            />
          </LogoSection>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            onClick={handleClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 }
            }}
          >
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mr: 2,
                display: { xs: 'none', sm: 'block' }
              }}
            >
              John Doe
            </Typography>
            <Box
              component="img"
              src={profile}
              alt="Profile"
              sx={{
                height: { xs: 32, sm: 40 },
                width: { xs: 32, sm: 40 },
                borderRadius: '50%',
              }}
            />
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              sx: { width: 200, mt: 1 }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem sx={{ gap: 2 }}>
              <AccountCircleIcon /> Profile
            </MenuItem>
            <MenuItem sx={{ gap: 2 }}>
              <SettingsIcon /> Settings
            </MenuItem>
            <MenuItem sx={{ gap: 2 }}>
              <LogoutIcon /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header; 