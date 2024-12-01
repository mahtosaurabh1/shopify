import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../../../redux/features/rootslice";
import BuySellPopup from "./buy.sell.popup";
import { deleteProductTransaction, listProductTransaction } from "../../../../redux/features/product.transaction.slice";
import { useDispatch } from "react-redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

interface Product {
  id: string;
  productname: string;
  productprice: number;
  weight: string;
  transactionstatus: string;
  createdAt: string;
  shopid: string;
  productid: string;
}

function Business() {
  const [open, setOpen] = useState<boolean>(false);
  const [isedit, setIsEdit] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { selectedShop }: any = useSelector(
    (state: rootReducerType) => state.shopReducer
  );
  const { productTransaction } = useSelector(
    (state: rootReducerType) => state.productTransactionReducer
  );
  const dispatch = useDispatch();

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>, val: any) => {
    setSelectedProduct(val);
    setAnchorEl(event.currentTarget);
  };

  const dialogClose = () => {
    setOpen(false);
    setIsEdit(false);
  };
  const dialogOpen = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteProduct = () => {
    const paramAs = { shopid: selectedShop?._id }
    const data = {
      producttransactionid: selectedProduct?._id,
      successCallback: () => {
        dispatch(listProductTransaction(paramAs));
        setAnchorEl(null);
      },
    };
    dispatch(deleteProductTransaction(data));
  };

  const handleEditProduct = () => {
    setOpen(true);
    setIsEdit(true);
    setAnchorEl(null);
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

  const columns: GridColDef[] = [
    { field: "productname", headerName: "Product Name", flex: 1 },
    { field: "productprice", headerName: "Product Price", flex: 1 },
    { field: "weight", headerName: "Weight", flex: 1 },
    {
      field: "transactionstatus",
      headerName: "Transaction Status",
      flex: 1,
      renderCell: (params) => (
        <span>{params.row.transactionstatus === 1 ? "Sell" : "Buy"}</span>
      ),
    },
    { field: "transactionprice", headerName: "Total price", flex: 1 },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      renderCell: (params) => (
        <span>
          {dayjs(params?.row?.createdAt).format("D MMMM YYYY")}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          aria-label="settings"
          onClick={(e) => handleMoreClick(e, params.row)}
        >
          <MoreVertIcon />
        </IconButton>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  useEffect(() => {
    const obj = { shopid: selectedShop?._id };
    dispatch(listProductTransaction(obj));
  }, []);
  return (
    <Box p={2} sx={{width:'80rem',height:'100%'}}>
       <Box sx={{display:'flex',justifyContent:'flex-end',mb:'.4rem'}}>
       <Button variant="outlined" onClick={dialogOpen} sx={{height:'2rem'}}>
            Add business
          </Button>
       </Box>

      <Box sx={{height:'33rem'}}>
        <DataGrid
          rows={productTransaction}
          columns={columns}
          getRowId={(row) => row._id}
          disableRowSelectionOnClick
          // hideFooter
        />
        {renderMenue}
      </Box>

      <BuySellPopup
        dialogClose={dialogClose}
        dialogOpen={dialogOpen}
        open={open}
        isedit={isedit}
        selectedProduct={selectedProduct}
      />
    </Box>
  );
}

export default Business;
