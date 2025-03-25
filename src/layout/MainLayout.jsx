import React from 'react'
import { Box, CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useMediaQuery } from '@mui/material'

const MainLayout = () => {
  const [open, setOpen] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'))

  React.useEffect(() => {
    setOpen(isDesktop)
  }, [isDesktop])

  const toggleDrawer = () => {
    if (isDesktop) {
      setOpen(!open)
    } else {
      setMobileOpen(!mobileOpen)
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} toggleDrawer={toggleDrawer} />
      <Sidebar 
        open={open} 
        mobileOpen={mobileOpen} 
        onMobileClose={() => setMobileOpen(false)}
        isDesktop={isDesktop}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          mt: 8,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          width: { xs: '100%', md: `calc(100% - ${open ? '280px' : '0px'})` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
