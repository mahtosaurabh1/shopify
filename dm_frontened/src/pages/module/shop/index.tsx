import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Addshop from "./add-shop";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../../redux/features/rootslice";
import { useDispatch } from "react-redux";
import {
  deleteShop,
  listShop,
  setSelectedShop,
} from "../../../redux/features/shop.slice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Shop2, Shop2Outlined } from "@mui/icons-material";

function Shop() {
  const [open, setOpen] = useState<boolean>(false);
  const [isedit, setIsEdit] = useState<boolean>(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const { userInfo }: any = useSelector(
    (state: rootReducerType) => state.authReducer
  );
  const { shopList, selectedShop }: any = useSelector(
    (state: rootReducerType) => state.shopReducer
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteShop = () => {
    const query = { userid: userInfo?._id };

    const data = {
      shopid: selectedShop?._id,
      successCallback: () => {
        dispatch(listShop(query));
        setAnchorElUser(null);
      },
    };
    dispatch(deleteShop(data));
  };

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>, val: any) => {
    setAnchorElUser(event.currentTarget);
    dispatch(setSelectedShop(val));
  };
  const handleEditProduct = () => {
    setOpen(true);
    setIsEdit(true);
    setAnchorElUser(null);
  };
  const dialogClose = () => {
    setOpen(false);
    setIsEdit(false);
  };
  const dialogOpen = () => {
    setOpen(true);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleGotoBusinessPage = (val: any) => {
    navigate("/dashboard");
    dispatch(setSelectedShop(val));
  };
  const handleProduct = () => {
    navigate("/product");
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
      <MenuItem onClick={handleProduct}>
        <ShoppingBagOutlinedIcon />
        <Typography sx={{ textAlign: "center", ml: ".8rem" }}>
          Product
        </Typography>
      </MenuItem>

      <MenuItem onClick={handleEditProduct}>
        <ModeEditOutlinedIcon />
        <Typography sx={{ textAlign: "center", ml: ".8rem" }}>Edit</Typography>
      </MenuItem>
      <MenuItem onClick={handleDeleteShop}>
        <DeleteOutlineRoundedIcon />
        <Typography sx={{ textAlign: "center", ml: ".8rem" }}>
          Delete
        </Typography>
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    const paramAs = { userid: userInfo?._id };
    dispatch(listShop(paramAs));
  }, []);

  const isAuthenticated = () => {
    return localStorage.getItem("userinfo") !== null;
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <Box p={"1rem"}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Shoplist</Typography>
        <Button variant="outlined" onClick={dialogOpen}>
          Add shop
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: "2rem" }}>
        {shopList?.map((val: any) => {
          return (
            <Card
              sx={{
                px: 1.25,
                py: 1.25,
                backgroundColor: "#fff",
                boxShadow: "4px 9px 30px 0 rgba(0,0,0,0.04)",
                position: "relative",
                borderRadius: 2,
                cursor: "pointer",
                display:'flex',
                width:'15rem',
                gap:'2rem'

              }}
              
            >
      
              <Stack
                sx={{ height: "100%",display:'flex',alignItems:'center',justifyContent:'center' }}
                onClick={() => handleGotoBusinessPage(val)}
              >
               <img src='/image/shop-logo.png' alt="logo" style={{width:'3rem',height:'3rem'}}/>
              </Stack>

              <CardHeader
                action={
                  <IconButton aria-label="settings" onClick={(e)=>handleMoreClick(e,val)}>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={val?.shopname}
                subheader="address"
              />
            </Card>
          );
        })}
      </Box>

      <Addshop
        dialogClose={dialogClose}
        dialogOpen={dialogOpen}
        open={open}
        isedit={isedit}
        selectedShop={selectedShop}
      />
      {renderMenue}
    </Box>
  );
}

export default Shop;
