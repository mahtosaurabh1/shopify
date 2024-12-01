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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../../../redux/features/rootslice";
import {
  addProduct,
  editProduct,
  listProduct,
} from "../../../../redux/features/product.slice";
import {
  addExpenses,
  editExpenses,
  listExpenses,
} from "../../../../redux/features/expenses.slice";

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
  isedit: boolean;
  selectedExpenses: any;
}

interface expensesType {
  expensesname: string;
  expensesprice: number;
}
export default function Addexpenses(props: propsType) {
  const { dialogClose, isedit, open, selectedExpenses } = props;

  const { selectedShop }: any = useSelector(
    (state: rootReducerType) => state.shopReducer
  );

  const [expensesInfo, setexpensesInfo] = React.useState<expensesType>({
    expensesname: "",
    expensesprice: 0,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setexpensesInfo({ ...expensesInfo, [name]: value });
  };

  const handleDialogClose = () => {
    setexpensesInfo({
      expensesname: "",
      expensesprice: 0,
    });
    dialogClose();
  };

  const handleButton = () => {
    if (isedit) {
      let obj = {
        expensesname: expensesInfo?.expensesname,
        expensesprice: expensesInfo?.expensesprice,
        expensesid: selectedExpenses?._id,
        successCallback: () => {
          const paramAs = { shopid: selectedShop?._id };
          dispatch(listExpenses(paramAs));
          handleDialogClose();
        },
      };
      dispatch(editExpenses(obj));
    } else {
      let obj = {
        expensesname: expensesInfo?.expensesname,
        expensesprice: expensesInfo?.expensesprice,
        shopid: selectedShop?._id,
        successCallback: () => {
          const paramAs = { shopid: selectedShop?._id };
          dispatch(listExpenses(paramAs));
          handleDialogClose();
        },
      };
      dispatch(addExpenses(obj));
    }
  };

  React.useEffect(() => {
    if (isedit) {
      setexpensesInfo({
        expensesname: selectedExpenses?.expensesname,
        expensesprice: selectedExpenses?.expensesprice,
      });
    }
  }, [selectedExpenses, isedit]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={handleDialogClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{isedit ? "Edit expenses" : "Add expenses"}</DialogTitle>
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
        <TextField
          label="Expenses name"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
          fullWidth
          name="expensesname"
          value={expensesInfo.expensesname}
          onChange={handleChange}
        />
        <TextField
          label="Expenses price"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
          fullWidth
          name="expensesprice"
          type="number"
          value={expensesInfo.expensesprice}
          onChange={handleChange}
          InputProps={{
            inputProps: {
              style: {
                // Hides the default increment/decrement icons (spinner)
                MozAppearance: "textfield",
              },
            },
            sx: {
              "& input[type=number]": {
                MozAppearance: "textfield", // Firefox
                "&::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "&::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleButton} variant="outlined">
          {isedit ? "Save expenses" : "Add expenses"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
