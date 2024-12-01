import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../redux/features/rootslice";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function Appheader() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { userInfo }: any = useSelector(
    (state: rootReducerType) => state.authReducer
  );

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleProduct = () => {
    navigate("/dashboard/product");
  };

  const handleGotoHome = () => {
    navigate("/shoplist");
  };

  const renderMenue = (
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
      <MenuItem onClick={handleCloseUserMenu}>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ marginRight: 2 }}>
            {userInfo?.fullname?.charAt(0)}
          </Avatar>
          <Typography sx={{ textAlign: "center" }}>
            {userInfo?.fullname}
          </Typography>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
      <LogoutOutlinedIcon/>
        <Typography sx={{ textAlign: "center" ,ml:'.8rem'}}>Logout</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={handleGotoHome}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            U
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ marginRight: 2 }}>
                  {userInfo?.fullname?.charAt(0)}
                </Avatar>
              </IconButton>
            </Tooltip>
            {renderMenue}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Appheader;
