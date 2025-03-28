import React, { useState } from 'react';
import logo from '../Images/logo.png';
import { menuItems } from '../routes/meuItems';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Box,
  Typography,
  Divider,
  useMediaQuery,
  Collapse,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { getUserInfo } from '../helper';

import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    borderRight: 'none',
    boxShadow: '4px 0 8px -3px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none',
    'scrollbarWidth': 'none',
  },
}));

const LogoSection = styled(Box)(({ theme }) => ({
  padding: '20px 24px',
  display: 'flex',
  alignItems: 'center',
  height: 70,
  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
  padding: '16px 24px 8px',
  letterSpacing: '0.5px',
}));

const CategoryHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  padding: '16px 24px 8px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: '4px 12px',
  borderRadius: '12px',
  backgroundColor: active ? 'rgba(33, 150, 243, 0.08)' : 'transparent',
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: active ? 'rgba(33, 150, 243, 0.12)' : 'rgba(0, 0, 0, 0.04)',
    transform: 'translateX(5px)',
  },
  '& .MuiListItemIcon-root': {
    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  },
}));

const Sidebar = ({ open, mobileOpen, onMobileClose, isDesktop }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUserInfo();
  console.log(user)
  const [expandedCategories, setExpandedCategories] = useState({
    main: true,
    create: true,
    device: true,
    reports: true,
    account: false,
    Vehicle: true,
    esim: true,
    TaggingAndActivation: true,
    settings: false,
  });

  const filterMenuItems = (items) => {
    if (!items) return [];
    return items.filter(item => {
      if (!item.roles) return true;
      return item.roles.includes(user.role);
    });
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const renderCategory = (title, items, category) => {
    const filteredItems = filterMenuItems(items);
    if (filteredItems.length === 0) return null;

    return (
      <>
        <CategoryHeader onClick={() => toggleCategory(category)}>
          <CategoryTitle sx={{ p: 0 }}>{title}</CategoryTitle>
          <IconButton size="small" sx={{ p: 0 }}>
            {expandedCategories[category] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </CategoryHeader>
        <Collapse in={expandedCategories[category]} timeout="auto">
          <List>
            {filteredItems.map((item) => (
              <StyledListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                active={location.pathname === item.path ? 1 : 0}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: location.pathname === item.path ? 600 : 400,
                    },
                  }}
                />
              </StyledListItem>
            ))}
          </List>
        </Collapse>
      </>
    );
  };

  const drawer = (
    <>
      <LogoSection sx={{bgcolor: '#1E293B' }}>
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{ height: 45, mr: 1, cursor: 'pointer' }}
          onClick={() => navigate("/")}
        />
      </LogoSection>

      <Box sx={{ 
        mt: 2, 
        px: 1, 
        overflow: 'auto', 
        height: 'calc(100vh - 70px)',
        overflowX: 'hidden'
      }}>
        {renderCategory('Main', menuItems.main, 'main')}
        {filterMenuItems(menuItems.main).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.5 }} />
        )}

        {renderCategory('Vehicle', menuItems.Vehicle, 'Vehicle')}
        {filterMenuItems(menuItems.Vehicle).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.5 }} />
        )}

        {renderCategory('ESIM', menuItems.esim, 'esim')}
        {filterMenuItems(menuItems.esim).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.5 }} />
        )}

        {renderCategory('Tagging&Activation', menuItems.TaggingAndActivation, 'TaggingAndActivation')}
        {filterMenuItems(menuItems.TaggingAndActivation).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.5 }} />
        )}
        
        {renderCategory('Create', menuItems.create, 'create')}
        {filterMenuItems(menuItems.create).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.5 }} />
        )}

        {renderCategory('Device', menuItems.device, 'device')}
        {filterMenuItems(menuItems.device).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.5 }} />
        )}
        
        {renderCategory('Reports', menuItems.reports, 'reports')}
        {filterMenuItems(menuItems.reports).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.5 }} />
        )}

        {renderCategory('Settings', menuItems.settings, 'settings')}
        {filterMenuItems(menuItems.settings).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.5 }} />
        )}
        
        {renderCategory('Account', menuItems.account, 'account')}
      </Box>
    </>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            borderRight: 'none',
            boxShadow: '4px 0 8px -3px rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <StyledDrawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
      >
        {drawer}
      </StyledDrawer>
    </>
  );
};

export default Sidebar; 