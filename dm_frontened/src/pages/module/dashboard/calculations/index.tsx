import { Box, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getTotalExpenses } from "../../../../redux/features/expenses.slice";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../../../redux/features/rootslice";
import { totalBuySellPrice } from "../../../../redux/features/product.transaction.slice";

export const Calculations =()=>{
    const { selectedShop }: any = useSelector(
        (state: rootReducerType) => state.shopReducer
      );
      const {totalExpense}:any=useSelector((state:rootReducerType)=>state.expensesReducer);
      const {totalBuySell}:any=useSelector((state:rootReducerType)=>state.productTransactionReducer)
    const dispatch=useDispatch();
    useEffect(()=>{
        const paramAs = { shopid: selectedShop?._id };
        dispatch(getTotalExpenses(paramAs));
        dispatch(totalBuySellPrice(paramAs));
    },[])
    return(
        <Box>
            <Box>
            <Typography>Shop Expenses = {totalExpense?.totalExpenses}</Typography>
            </Box>
            <Box>
                
            <Typography>Total buy = {totalBuySell?.totalBuy}</Typography>
            <Typography>Total sell = {totalBuySell?.totalSell}</Typography>

            </Box>  
        </Box>
    )
}