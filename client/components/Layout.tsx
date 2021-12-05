import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import Router from 'next/router';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import { CurrentUser } from '../types/types';

const drawerWidth = 240;

const Layout: React.FC<{ currentUser: CurrentUser }> = ({
  currentUser,
  children,
}) => {
  const router = useRouter();

  const menuItems = [
    {
      text: 'Home',
      icon: <HomeIcon color="secondary" />,
      path: '/',
      showCondition: true,
    },
    !currentUser && {
      text: 'Sign in',
      icon: <PersonIcon color="secondary" />,
      path: '/auth/signin',
    },
    !currentUser && {
      text: 'Sign up',
      icon: <PersonIcon color="secondary" />,
      path: '/auth/signup',
    },
    currentUser && {
      text: 'Sign Out',
      icon: <PersonIcon color="secondary" />,
      path: '/auth/signout',
    },
  ];
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        sx={{
          background: 'secondary',
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography noWrap component="div" variant="h6" sx={{ flexGrow: 1 }}>
            App
          </Typography>
          <Typography noWrap component="div" variant="h6">
            {currentUser ? `Logged as ${currentUser.email}` : ''}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography sx={{ p: 2 }} variant="h5" component="div">
          Tickets App
        </Typography>

        <Divider />
        <List>
          {menuItems.map(
            (item) =>
              item && (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => Router.push(item.path)}
                  sx={{
                    background: router.asPath === item.path ? '#f4f4f4' : null,
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              )
          )}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          width: '100%',
          background: '#f9f9f9',
          mt: 10,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
