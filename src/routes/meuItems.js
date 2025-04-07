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
    Home,
    Info,
    ContactSupport,
    BusinessCenter,
    DirectionsCar,
    Assessment,
    History,
    Route,
  } from '@mui/icons-material';

export const menuItems = {
    main: [
      { text: 'Dashboard', icon: <Dashboard />, path: '/', roles: ['devicemanufacture', 'dealer', 'owner'] },
    ],
    esim: [
        { text: 'Request ESIM activation', icon: <Assignment />, path: '/request-esim-activation', roles: ['dealer'] },
    ],
    TaggingAndActivation: [
      { text: 'Tag a device', icon: <Assignment />, path: '/tag-device', roles: ['dealer'] },
      { text: 'Untag a device', icon: <Assignment />, path: '/untag-device', roles: ['dealer'] },
    ],
    create: [
      { text: 'Create Device Model', icon: <People />, path: '/create-device-model', roles: ['devicemanufacture'] },
      { text: 'TAC Extension', icon: <Assignment />, path: '/tac-extension', roles: ['devicemanufacture'] },
      { text: 'Vehicle Owner', icon: <DirectionsCar />, path: '/vehicle-owner', roles: ['dealer'] },
      { text: 'Create Dealer', icon: <Assignment />, path: '/create-dealer', roles: ['devicemanufacture'] },
    ],
    device: [
      { text: 'Device Stock', icon: <Description />, path: '/device-stock', roles: ['devicemanufacture'] },
      { text: 'Assign Device', icon: <Description />, path: '/assign-device', roles: ['devicemanufacture'] },
      { text: 'Bulk Device Stock', icon: <Description />, path: '/bulk-device-stock', roles: ['devicemanufacture'] },
    ],
    reports: [
      { text: 'Device Report', icon: <BarChart />, path: '/reports/device', roles: ['devicemanufacture'] },
      { text: 'Dealer Report', icon: <Timeline />, path: '/reports/dealer', roles: ['dealer'] },
      { text: 'All Devices', icon: <Description />, path: '/reports/all-devices', roles: ['devicemanufacture'] },
      { text: 'Stock Report', icon: <Description />, path: '/stock-report', roles: ['devicemanufacture'] },
      { text: 'Vehicle Owner Report', icon: <Assessment />, path: '/vehicle-owner-report', roles: ['dealer'] },
    ],
    settings: [
      { text: 'State & District Management', icon: <Description />, path: '/state-district-management', roles: ['devicemanufacture'] },
    ],
    account: [
      { text: 'Profile', icon: <AccountBox />, path: '/profile', roles: ['devicemanufacture', 'user', 'dealer'] },
      { text: 'Settings', icon: <Settings />, path: '/settings', roles: ['devicemanufacture'] },
      { text: 'Notifications', icon: <Notifications />, path: '/notifications', roles: ['devicemanufacture', 'user', 'dealer'] },
    ],
    Vehicle:[
      { text: 'Live Tracking', icon: <DirectionsCar />, path: '/live-tracking', roles: ['owner'] },
      { text: 'History Playback', icon: <History />, path: '/history-playback', roles: ['owner'] },
      { text: 'Route Fixing', icon: <Route />, path: '/route-fixing', roles: ['owner'] },
    ]
};

