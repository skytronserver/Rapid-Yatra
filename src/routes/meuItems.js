import {
    Dashboard,
    Analytics,
    People,
    Settings,
    Notifications,
    Assignment,
    Description,
    BarChart,
    Timeline,
    AccountBox,
  } from '@mui/icons-material';
export const menuItems = {
    main: [
      { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    ],
    create: [
      { text: 'Create Device Model', icon: <People />, path: '/create-device-model' },
      { text: 'TAC Extension', icon: <Assignment />, path: '/tac-extension' },
    ],
    device: [
      { text: 'Device Stock', icon: <Description />, path: '/device-stock' },
      { text: 'Assign Device', icon: <Description />, path: '/assign-device' },
      { text: 'Bulk Device Stock', icon: <Description />, path: '/bulk-device-stock' },
    ],
    reports: [
      { text: 'Device Report', icon: <BarChart />, path: '/reports/device' },
      { text: 'Dealer Report', icon: <Timeline />, path: '/reports/dealer' },
      { text: 'All Devices', icon: <Description />, path: '/reports/all-devices' },
    ],
    account: [
      { text: 'Profile', icon: <AccountBox />, path: '/profile' },
      { text: 'Settings', icon: <Settings />, path: '/settings' },
      { text: 'Notifications', icon: <Notifications />, path: '/notifications' },
    ],
  };
