import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Addproduct from "./add-product";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  listProduct,
} from "../../../../redux/features/product.slice";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../../../redux/features/rootslice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

function Product() {
  const [open, setOpen] = useState<boolean>(false);
  const [isedit, setIsEdit] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { userInfo }: any = useSelector(
    (state: rootReducerType) => state.authReducer
  );
  const { productList }: any = useSelector(
    (state: rootReducerType) => state.productReduer
  );
  const { selectedShop }: any = useSelector(
    (state: rootReducerType) => state.shopReducer
  );

  const handleDeleteProduct = () => {
    const paramAs = { shopid: selectedShop?._id };
    const data = {
      productid: selectedProduct?._id,
      successCallback: () => {
        dispatch(listProduct(paramAs));
        setAnchorEl(null);
      },
    };
    dispatch(deleteProduct(data));
  };

  const handleEditProduct = () => {
    setOpen(true);
    setIsEdit(true);
    setAnchorEl(null);
  };
  const dialogClose = () => {
    setOpen(false);
    setIsEdit(false);
    setSelectedProduct({});
  };
  const dialogOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>, val: any) => {
    setSelectedProduct(val);
    setAnchorEl(event.currentTarget);
  };

  const renderMenue = (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={handleEditProduct}>
        <ModeEditOutlinedIcon />
        <Typography sx={{ textAlign: "center", ml: ".8rem" }}>Edit</Typography>
      </MenuItem>
      <MenuItem onClick={handleDeleteProduct}>
        <DeleteOutlineRoundedIcon />
        <Typography sx={{ textAlign: "center", ml: ".8rem" }}>
          Delete
        </Typography>
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    const paramAs = { shopid: selectedShop?._id };
    dispatch(listProduct(paramAs));
  }, []);

  return (
    <Box p={"1rem"} sx={{ width: "80rem", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={dialogOpen}>
          Add Product
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: "2rem",flexWrap:'wrap' }}>
        {productList?.map((val: any) => {
          return (
            <Card sx={{ width: "12rem", height: "12rem" }}>
              <CardHeader
                action={
                  <IconButton
                    aria-label="settings"
                    onClick={(e) => handleMoreClick(e, val)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
                title={val?.shopname}
              />
              <CardMedia
                sx={{ height: 50 }}
                image="https://img.freepik.com/free-photo/pink-flower-white-background_1203-2127.jpg?size=626&ext=jpg"
                title="green iguana"
              />

              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {val?.productname}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Addproduct
        dialogClose={dialogClose}
        dialogOpen={dialogOpen}
        open={open}
        isedit={isedit}
        selectedProduct={selectedProduct}
      />

      {renderMenue}
    </Box>
  );
}

export default Product;
