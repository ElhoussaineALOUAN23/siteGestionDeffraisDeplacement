import * as React from 'react';
import { createTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
 
import TopBar from './TopBar';
import SideBar from './SideBar';
import { getDesignTokens } from '../components/header/theme';
import { ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
 
export default function MiniDrawer() {

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const [mode, setMode] = React.useState(
  Boolean(localStorage.getItem("currentMode")) ? 
  localStorage.getItem("currentMode") : "light");
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <TopBar open={open} handleDrawerOpen={handleDrawerOpen} setMode={setMode} />


        <SideBar open={open} handleDrawerClose={handleDrawerClose} />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
         <Outlet/>
        </Box>
      </Box>
    </ThemeProvider>
  );
}