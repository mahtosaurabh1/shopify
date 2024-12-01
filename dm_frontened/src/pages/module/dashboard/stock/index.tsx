import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { getStockLeft } from '../../../../redux/features/product.transaction.slice';
import { useSelector } from 'react-redux';
import { rootReducerType } from '../../../../redux/features/rootslice';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

function Stock() {
    const dispatch=useDispatch();
    const { selectedShop }: any = useSelector(
        (state: rootReducerType) => state.shopReducer
      );
      const {stock}=useSelector((state:rootReducerType)=>state.productTransactionReducer)

      const columns: GridColDef[] = [
        { field: "productname", headerName: "Product Name", flex: 1 },
        { field: "weightLeftInStock", headerName: "Weight", flex: 1 },
        { field: "avgTransactionPriceForStock", headerName: "Product Price", flex: 1 }
      ];
    useEffect(()=>{
        const paramAs = { shopid: selectedShop?._id };
      dispatch(getStockLeft(paramAs));

    },[])
  return (
    
    <Box sx={{height:'33rem',width:'82rem'}}>
    <DataGrid
      rows={stock}
      columns={columns}
      getRowId={(row) => row.productid}
      disableRowSelectionOnClick
      hideFooter
    />
  </Box>
  )
}

export default Stock