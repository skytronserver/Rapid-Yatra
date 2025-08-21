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
    background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #fef2f2 100%)', // Orange-red gradient theme
    borderRight: '1px solid rgba(251, 146, 60, 0.2)', // Orange border
    boxShadow: '4px 0 8px -3px rgba(251, 146, 60, 0.15)',
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
  borderBottom: '1px solid rgba(251, 146, 60, 0.2)',
  background: 'linear-gradient(135deg, #fff7ed 0%, #fef2f2 100%)',
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: '#ea580c', // Orange-600
  padding: '16px 24px 8px',
  letterSpacing: '0.5px',
}));

const CategoryHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  padding: '16px 24px 8px',
  borderRadius: '8px',
  margin: '0 8px',
  '&:hover': {
    backgroundColor: 'rgba(251, 146, 60, 0.1)',
  },
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: '4px 12px',
  borderRadius: '12px',
  backgroundColor: active 
    ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.15), rgba(239, 68, 68, 0.1))' 
    : 'transparent',
  color: active ? '#ea580c' : theme.palette.text.primary, // Orange-600 when active
  transition: 'all 0.3s ease',
  border: active ? '1px solid rgba(251, 146, 60, 0.3)' : '1px solid transparent',
  '&:hover': {
    backgroundColor: active 
      ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(239, 68, 68, 0.15))' 
      : 'rgba(251, 146, 60, 0.08)',
    transform: 'translateX(5px)',
    border: '1px solid rgba(251, 146, 60, 0.4)',
  },
  '& .MuiListItemIcon-root': {
    color: active ? '#ea580c' : '#9ca3af', // Orange-600 when active, gray when not
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
      if (!user) return false;
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
          <IconButton 
            size="small" 
            sx={{ 
              p: 0, 
              color: '#ea580c',
              '&:hover': {
                backgroundColor: 'rgba(251, 146, 60, 0.1)'
              }
            }}
          >
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
                      color: location.pathname === item.path ? '#ea580c' : '#374151',
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
      <LogoSection>
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{ 
            height: 75, 
            mr: 1, 
            cursor: 'pointer',
            filter: 'drop-shadow(2px 2px 4px rgba(251, 146, 60, 0.2))'
          }}
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
          <Divider sx={{ my: 2, opacity: 0.3, borderColor: 'rgba(251, 146, 60, 0.3)' }} />
        )}

        {renderCategory('Vehicle', menuItems.Vehicle, 'Vehicle')}
        {filterMenuItems(menuItems.Vehicle).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.3, borderColor: 'rgba(251, 146, 60, 0.3)' }} />
        )}

        {renderCategory('ESIM', menuItems.esim, 'esim')}
        {filterMenuItems(menuItems.esim).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.3, borderColor: 'rgba(251, 146, 60, 0.3)' }} />
        )}

        {renderCategory('Tagging&Activation', menuItems.TaggingAndActivation, 'TaggingAndActivation')}
        {filterMenuItems(menuItems.TaggingAndActivation).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.3, borderColor: 'rgba(251, 146, 60, 0.3)' }} />
        )}

        {renderCategory('Create', menuItems.create, 'create')}
        {filterMenuItems(menuItems.create).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.3, borderColor: 'rgba(251, 146, 60, 0.3)' }} />
        )}

        {renderCategory('Device', menuItems.device, 'device')}
        {filterMenuItems(menuItems.device).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.3, borderColor: 'rgba(251, 146, 60, 0.3)' }} />
        )}

        {renderCategory('Reports', menuItems.reports, 'reports')}
        {filterMenuItems(menuItems.reports).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.3, borderColor: 'rgba(251, 146, 60, 0.3)' }} />
        )}

        {renderCategory('Settings', menuItems.settings, 'settings')}
        {filterMenuItems(menuItems.settings).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.3, borderColor: 'rgba(251, 146, 60, 0.3)' }} />
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
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #fef2f2 100%)',
            borderRight: '1px solid rgba(251, 146, 60, 0.2)',
            boxShadow: '4px 0 8px -3px rgba(251, 146, 60, 0.15)',
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
