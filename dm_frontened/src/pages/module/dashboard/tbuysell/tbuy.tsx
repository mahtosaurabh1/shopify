import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../../../redux/features/rootslice";
import {
  deleteProductTransaction,
  listProductTransaction,
} from "../../../../redux/features/product.transaction.slice";
import { useDispatch } from "react-redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function TotalBuy() {
  const { selectedShop }: any = useSelector(
    (state: rootReducerType) => state.shopReducer
  );
  const { productTransaction } = useSelector(
    (state: rootReducerType) => state.productTransactionReducer
  );
  const dispatch = useDispatch();

  const columns: GridColDef[] = [
    { field: "productname", headerName: "Product name", flex: 1 },
      { field: "totalprice", headerName: "Total price", flex: 1 },
    { field: "totalWeight", headerName: "Total weight", flex: 1 },
    {
      field: "transactionstatus",
      headerName: "Transaction Status",
      flex: 1,
      renderCell: (params) => (
        <span>{params.row.transactionstatus === 1 ? "Sell" : "Buy"}</span>
      ),
    },
  ];


  useEffect(() => {
    const obj = { shopid: selectedShop?._id ,transactionstatus:0,deal:'deal'};
    dispatch(listProductTransaction(obj));
  }, []);
  return (
    <Box p={2} sx={{ width: "80rem" }}>
      <Box sx={{height:'33rem'}}>
      <DataGrid
        rows={productTransaction}
        columns={columns}
        getRowId={(row) => row._id}
        disableRowSelectionOnClick
        hideFooter
      />
      </Box>
    </Box>
  );
}

export default TotalBuy;
