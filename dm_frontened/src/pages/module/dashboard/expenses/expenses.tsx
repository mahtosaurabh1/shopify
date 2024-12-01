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
import Addexpenses from "./add-expenses";
import { deleteExpenses, listExpenses } from "../../../../redux/features/expenses.slice";
  
  export const Expenses=()=> {
    const [open, setOpen] = useState<boolean>(false);
    const [isedit, setIsEdit] = useState<boolean>(false);
    const [selectedExpenses, setSelectedExpenses] = useState<any>({});
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { userInfo }: any = useSelector(
      (state: rootReducerType) => state.authReducer
    );
    const { expensesList }: any = useSelector(
      (state: rootReducerType) => state.expensesReducer
    );
    const { selectedShop }: any = useSelector(
      (state: rootReducerType) => state.shopReducer
    );
  
    const handleDeleteExpenses = () => {
      const paramAs = { shopid: selectedShop?._id };
      const data = {
        expensesid: selectedExpenses?._id,
        successCallback: () => {
          dispatch(listExpenses(paramAs));
          setAnchorEl(null);
        },
      };
      dispatch(deleteExpenses(data));
    };
  
    const handleEditExpenses = () => {
      setOpen(true);
      setIsEdit(true);
      setAnchorEl(null);
    };
    const dialogClose = () => {
      setOpen(false);
      setIsEdit(false);
      setSelectedExpenses({});
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
      setSelectedExpenses(val);
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
        <MenuItem onClick={handleEditExpenses}>
          <ModeEditOutlinedIcon />
          <Typography sx={{ textAlign: "center", ml: ".8rem" }}>Edit</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteExpenses}>
          <DeleteOutlineRoundedIcon />
          <Typography sx={{ textAlign: "center", ml: ".8rem" }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    );
  
    useEffect(() => {
      const paramAs = { shopid: selectedShop?._id };
      dispatch(listExpenses(paramAs));
    }, []);
  
    return (
      <Box p={"1rem"} sx={{ width: "80rem", height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={dialogOpen}>
            Add Expenses
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: "2rem" }}>
          {expensesList?.map((val: any) => {
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
                  image="https://c8.alamy.com/comp/2D6PMNP/monthly-expenses-food-insurance-transport-and-mobile-communications-concept-chart-with-keywords-and-icons-on-light-blue-background-2D6PMNP.jpg"
                  title="green iguana"
                />
  
                <CardContent>
                  <Typography >
                   Exp Name {val?.expensesname}
                  </Typography>
                  <Typography >
                    Exp price {val?.expensesprice}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
  
        <Addexpenses
          dialogClose={dialogClose}
          dialogOpen={dialogOpen}
          open={open}
          isedit={isedit}
          selectedExpenses={selectedExpenses}
        />
  
        {renderMenue}
      </Box>
    );
  }
  
  