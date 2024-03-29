import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import useTheme from '@mui/material/styles/useTheme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
 
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
 
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Avatar, Typography } from '@mui/material';
import {   useLocation, useNavigate } from "react-router-dom";
import { grey } from '@mui/material/colors';
 
const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Array1 = [
  { "text": "Home", "icon": <HomeOutlinedIcon />, "path": "/admin" },
  { "text": "Gestion Demande","icon": <SettingsSuggestOutlinedIcon />, "path": "/adminManage" },  
  { "text": "Gestion Contacts ", "icon": <GroupOutlinedIcon />, "path": "/adminContacts" },
  { "text": "Gestion Article ", "icon": <DescriptionOutlinedIcon />, "path": "/adminArticle" },
];

const Array2 = [
  { "text": "Article", "icon": <PersonOutlineOutlinedIcon />, "path": "/adminProfile" },
  { "text": "Calendar", "icon": <CalendarMonthOutlinedIcon />, "path": "/adminCalendar" },
 
   
];
 
const Array4 = [
  { "text": " Fonctionnaire", "icon": <BarChartOutlinedIcon />, "path": "/adminBar" },
  { "text": "Statistique Etats ", "icon": <PieChartOutlineOutlinedIcon />, "path": "/adminpie" },
  { "text": "Line Chart", "icon": <TimelineOutlinedIcon />, "path": "/adminLine" },
  
];

const SideBar = ({ open, handleDrawerClose }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  let location = useLocation();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <Avatar sx={{ mx: "auto", width: open ? 88 : 44, height: open ? 88 : 44, my: 1, transition: "0.25s", border: "2px solid grey" }} alt="Remy Sharp" src="images/Admin.jpg" />
      <Typography align="center" sx={{ fontSize: open ? 17 : 0, transition: "0.25s" }}>Nom Prenom </Typography>
      <Typography align="center" sx={{ fontSize: open ? 15 : 0, transition: "0.25s", color: theme.palette.info.main }}>Admin</Typography>

      <Divider />

      <List>
        {Array1.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => { navigate(item.path) }}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                bgcolor: location.pathname === item.path ? theme.palette.mode === "dark" ? grey[800] : grey[300] : null,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {Array2.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => { navigate(item.path) }}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                bgcolor: location.pathname === item.path ? theme.palette.mode === "dark" ? grey[800] : grey[300] : null,

              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>


      <Divider />
      

      <Divider />

      <List>
        {Array4.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => { navigate(item.path) }}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                bgcolor: location.pathname === item.path ? theme.palette.mode === "dark" ? grey[800] : grey[300] : null,

              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
