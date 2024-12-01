import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { IconButton, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../../../redux/features/rootslice";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { listProductTransaction, totalBuySellPrice } from "../../../../redux/features/product.transaction.slice";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { getTotalExpenses, listExpenses } from "../../../../redux/features/expenses.slice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface propsType {
  dialogClose: () => void;
  dialogOpen: () => void;
  open: boolean;
}

export default function Filter(props: propsType) {
  const { dialogClose, open } = props;
  const [filterData, setfilterData] = React.useState<any>({
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });

  const { selectedShop }: any = useSelector(
    (state: rootReducerType) => state.shopReducer
  );
  const dispatch = useDispatch();
  const Today = dayjs();
  const location = useLocation();

  const handleStartDateChange = (e: any) => {
    const val = dayjs(e).format("YYYY-MM-DD");
    setfilterData({
      ...filterData,
      startDate: val !== "Invalid Date" ? val : "",
    });
  };

  const handleEndDateChange = (e: any) => {
    const val = dayjs(e).format("YYYY-MM-DD");
    setfilterData({
      ...filterData,
      endDate: val !== "Invalid Date" ? val : "",
    });
  };

  const handleDialogClose = () => {
    setfilterData({
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
    });
    dialogClose();
  };

  const handleButton = () => {
    // Add functionality for handling the apply button
    console.log(filterData);
    if (location.pathname === "/dashboard") {
      const obj = {
        shopid: selectedShop?._id,
        // transactionstatus: 1,
        // deal: "deal",
        startDate: filterData.startDate,
        endDate: filterData.endDate,
      };
      dispatch(listProductTransaction(obj));
    } else if (location.pathname === "/tbuy") {
      const obj = {
        shopid: selectedShop?._id,
        transactionstatus: 0,
        deal: "deal",
        startDate: filterData.startDate,
        endDate: filterData.endDate,
      };
      dispatch(listProductTransaction(obj));
    } else if (location.pathname === "/tsell") {
      const obj = {
        shopid: selectedShop?._id,
        transactionstatus: 1,
        deal: "deal",
        startDate: filterData.startDate,
        endDate: filterData.endDate,
      };
      dispatch(listProductTransaction(obj));
    }else if (location.pathname === "/expenses") {
      const obj = {
        shopid: selectedShop?._id,
        startDate: filterData.startDate,
        endDate: filterData.endDate,
      };

      dispatch(listExpenses(obj));
    }else if (location.pathname === "/calculations") {
      const obj = {
        shopid: selectedShop?._id,
        startDate: filterData.startDate,
        endDate: filterData.endDate,
      };

      dispatch(getTotalExpenses(obj));
      dispatch(totalBuySellPrice(obj));
    }

  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={handleDialogClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Filter data"}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleDialogClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <Close />
      </IconButton>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              maxDate={Today}
              sx={{
                ".MuiInputBase-root": {
                  alignContent: "center",
                  textAlign: "center",
                },
              }}
              value={dayjs(filterData.startDate)}
              onChange={handleStartDateChange}
              label={"From"}
              openTo="month"
              views={["year", "month", "day"]}
            />

            <DatePicker
              maxDate={Today}
              sx={{
                ".MuiInputBase-root": {
                  alignContent: "center",
                  textAlign: "center",
                },
              }}
              value={dayjs(filterData.endDate)}
              onChange={handleEndDateChange}
              label={"To"}
              openTo="month"
              views={["year", "month", "day"]}
            />
          </DemoContainer>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleButton}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
}
