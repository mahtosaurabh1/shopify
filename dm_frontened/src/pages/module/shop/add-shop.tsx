import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { IconButton, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../../redux/features/rootslice";
import {
  addShop,
  editShop,
  listShop,
  setSelectedShop,
} from "../../../redux/features/shop.slice";

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
  selectedShop: any;
}

interface shopType {
  shopname: string;
}
export default function Addshop(props: propsType) {
  const { dialogClose, isedit, open, selectedShop } = props;

  const { userInfo }: any = useSelector(
    (state: rootReducerType) => state.authReducer
  );

  const [shopInfo, setShopInfo] = React.useState<shopType>({
    shopname: ""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShopInfo({ ...shopInfo, [name]: value });
  };

  const handleDialogClose=()=>{
    dialogClose();
    dispatch(setSelectedShop({}));
    setShopInfo({
      shopname:""
    });
  }

  const handleButton = () => {
    if (isedit) {
      let obj = {
        shopname: shopInfo?.shopname,
        shopid: selectedShop?._id,
        successCallback: () => {
          const paramAs = { userid: userInfo?._id };
          dispatch(listShop(paramAs));
          handleDialogClose();
        },
      };
      dispatch(editShop(obj));
    } else {
      let obj = {
        shopname: shopInfo?.shopname,
        userid: userInfo?._id,
        successCallback: () => {
          const paramAs = { userid: userInfo?._id };
          dispatch(listShop(paramAs));
          handleDialogClose();
        },
      };
      dispatch(addShop(obj));
    }
  };



  React.useEffect(() => {
    if (isedit) {
      setShopInfo({
        shopname: selectedShop?.shopname,
      });
    }
  }, [selectedShop,isedit]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={handleDialogClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{isedit ? "Edit shop" : "Add shop"}</DialogTitle>
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
          label="Shop name"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
          fullWidth
          name="shopname"
          value={shopInfo.shopname}
          onChange={handleChange}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleButton}>
          {isedit ? "Edit shop" : "Add shop"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
