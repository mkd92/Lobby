import * as React from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";

import userStore from "../../app/userStore";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/material";

export default function Navbar() {
  const userData = userStore((state) => state.userData);
  const logout = userStore((state) => state.logout);
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <AppBar position="sticky" color="primary" component="nav">
      <Container maxWidth="xl">
        <Toolbar>
          <HouseSidingIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography href="/" component="a" variant="h6">
            Lobby
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Setting">
              <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                {userData.username ? (
                  <Avatar
                    src={`https://avatars.dicebear.com/api/initials/${userData.username}.svg`}
                    alt="Sprite"
                  />
                ) : (
                  <PersonIcon />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userData.user_id ? (
                <MenuItem>
                  <Typography textAlign="center">
                    <button onClick={logout}>Logout</button>
                  </Typography>
                </MenuItem>
              ) : (
                <>
                  <MenuItem>
                    <Typography textAlign="center">
                      <Link to="/login">Login</Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center">
                      <Link to="/signup">Signup</Link>
                    </Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
