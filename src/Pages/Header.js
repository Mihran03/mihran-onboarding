import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import logo from '../css/logo-no-text.png';

const Header = ({ setLoggedIn }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    // Add any necessary logout logic here (e.g., clearing tokens, resetting state, etc.)
    setLoggedIn(false); // Set login state to false on logout
    navigate('/'); // Redirect to the login page
  };

  const handleAboutUs = () => {
    // Add logic for the 'About Us' button
    navigate('/about-us'); // Example: navigate to the About Us page
  };

  const handleNewFeatures = () => {
    // Add logic for the 'Want New Features?' button
    navigate('/new-features'); // Example: navigate to the New Features page
  };

  const handleMyAccount = () => {
    // Add logic for the 'My Account' button
    navigate('/my-account'); // Example: navigate to the My Account page
  };

  const drawerItems = [
    { text: 'About Us', action: handleAboutUs },
    { text: 'Want New Features?', action: handleNewFeatures },
    { text: 'My Account', action: handleMyAccount },
  ];

  return (
    <div className="header-main">
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      
      <div className="header-logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <IconButton edge="end" color="inherit" aria-label="logout" onClick={handleLogout}>
        <ExitToAppIcon />
      </IconButton>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {drawerItems.map((item, index) => (
            <ListItem button key={index} onClick={() => { item.action(); toggleDrawer(false); }}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
