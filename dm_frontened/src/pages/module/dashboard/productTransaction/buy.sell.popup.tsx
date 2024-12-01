import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Autocomplete,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../../../redux/features/rootslice";
import CloseIcon from "@mui/icons-material/Close";
import {
  addProduct,
  editProduct,
  listProduct,
} from "../../../../redux/features/product.slice";
import { BuySellEnum } from "../../../../shared/constant";
import {
  addProductTransaction,
  editProductTransaction,
  listProductTransaction,
} from "../../../../redux/features/product.transaction.slice";
import dayjs from "dayjs";

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
  selectedProduct: any;
}

interface productType {
  productname: string;
  productprice: number;
  weight: number;
  transactionstatus: number;
  createdAt: any;
}
export default function BuySellPopup(props: propsType) {
  const { dialogClose, isedit, open, selectedProduct } = props;

  const { selectedShop }: any = useSelector(
    (state: rootReducerType) => state.shopReducer
  );

  const { productList }: any = useSelector(
    (state: rootReducerType) => state.productReduer
  );
  const Today = dayjs();

  const [productInfo, setProductInfo] = React.useState<productType>({
    productname: "",
    productprice: 0,
    weight: 0,
    transactionstatus: 0,
    createdAt: Today.format("YYYY-MM-DD"),
  });

  const [chips, setChips] = React.useState<any>(null);

  const handleDelete = () => {
    setChips(null);
  };

  const handleAddChip = (event: any, newValue: any) => {
    setChips(newValue);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductInfo({
      ...productInfo,
      transactionstatus: Number(event.target.value),
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleShopnameChange = (shopname: string) => {
    setProductInfo({ ...productInfo, [shopname]: shopname });
    if (shopname.trim().length !== 0) {
      const obj = { shopid: selectedShop?._id, productname: shopname };
      dispatch(listProduct(obj));
    }
  };


  const handleDateChange = (e: any) => {
    const val = dayjs(e).format("YYYY-MM-DD");
    if (val !== "Invalid Date") {
      setProductInfo({
        ...productInfo,
        createdAt: val,
      });
    } else {
      setProductInfo({
        ...productInfo,
        createdAt: val,
      });
    }
  };

  const handleButton = () => {
    if (isedit) {
      let obj = {
        productname: chips?.productname,
        productid: chips?._id,
        productprice: productInfo?.productprice,
        weight: productInfo?.weight,
        producttransactionid: selectedProduct?._id,
        transactionstatus: productInfo?.transactionstatus,
        createdAt: productInfo?.createdAt !== "Invalid Date"?productInfo?.createdAt:Today,
        successCallback: () => {
          const paramAs = { shopid: selectedShop?._id };
          dispatch(listProductTransaction(paramAs));
          handleDialogClose();
        },
      };
      dispatch(editProductTransaction(obj));
    } else {
      let obj = {
        productname: chips?.productname,
        productid: chips?._id,
        productprice: productInfo?.productprice,
        weight: productInfo?.weight,
        shopid: selectedShop?._id,
        createdAt: productInfo?.createdAt !== "Invalid Date"?productInfo?.createdAt:Today,
        transactionstatus: productInfo?.transactionstatus,
        successCallback: () => {
          const paramAs = { shopid: selectedShop?._id };
          dispatch(listProductTransaction(paramAs));
          handleDialogClose();
        },
      };

      dispatch(addProductTransaction(obj));
    }
  };

  const handleDialogClose = () => {
    setProductInfo({
      productname: "",
      productprice: 0,
      weight: 0,
      transactionstatus: 0,
      createdAt: '',
    });
    dialogClose();
    setChips(null);
  };

  React.useEffect(() => {
    if (isedit) {
      setProductInfo({
        productname: selectedProduct?.productname,
        productprice: selectedProduct?.productprice,
        weight: selectedProduct?.weight,
        transactionstatus: selectedProduct?.transactionstatus,
        createdAt: selectedProduct?.createdAt,
      });
      setChips({
        productname: selectedProduct.productname,
        _id: selectedProduct.productid,
      });
    }
  }, [selectedProduct, isedit]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={handleDialogClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {isedit ? "Edit transaction" : "Add transaction"}
      </DialogTitle>
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
        <Autocomplete
          freeSolo
          options={productList}
          getOptionLabel={(option: any) => option.productname}
          disableClearable
          onInputChange={(event, newInputValue) =>
            handleShopnameChange(newInputValue)
          }
          onChange={(event, newValue) => handleAddChip(event, newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add products"
              variant="outlined"
              fullWidth
              value={productInfo.productname}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    {chips && (
                      <Chip
                        // key={index}
                        label={chips?.productname}
                        size="small"
                        color="primary"
                        onDelete={handleDelete}
                        deleteIcon={<CloseIcon />}
                        style={{ marginRight: 4 }}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <TextField
          label="Product price"
          id="outlined-size-small"
          size="small"
          fullWidth
          type="number"
          name="productprice"
          value={productInfo.productprice}
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

        <TextField
          label="Product weight in kg"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
          fullWidth
          type="number"
          name="weight"
          value={productInfo.weight}
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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Basic date picker"
              maxDate={Today}
              onChange={handleDateChange}
              value={dayjs(productInfo?.createdAt)}
            />
          </DemoContainer>
        </LocalizationProvider>

        <FormControl component="fieldset">
          <FormLabel component="legend">Transaction Type</FormLabel>
          <RadioGroup
            aria-label="transaction"
            name="transaction"
            value={productInfo?.transactionstatus}
            onChange={handleRadioChange}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value={BuySellEnum.BUY}
              control={<Radio />}
              label="Buy"
            />
            <FormControlLabel
              value={BuySellEnum.SELL}
              control={<Radio />}
              label="Sell"
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleButton} variant="outlined">{isedit ? "Edit" : "Save"}</Button>
      </DialogActions>
    </Dialog>
  );
}
