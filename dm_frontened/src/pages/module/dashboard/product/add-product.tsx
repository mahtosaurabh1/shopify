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
import { addProduct, editProduct, listProduct } from "../../../../redux/features/product.slice";

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
  selectedProduct:any
}

interface productType {
  productname: string;
}
export default function Addproduct(props: propsType) {
  const { dialogClose, isedit, open,selectedProduct } = props;

  const {selectedShop}:any=useSelector((state:rootReducerType)=>state.shopReducer)
  

  const [productInfo, setProductInfo] = React.useState<productType>({
    productname: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleDialogClose=()=>{
    setProductInfo({
      productname: ""
    });
    dialogClose();
  }

  const handleButton=()=>{
    if(isedit){
      let obj={
        productname: productInfo?.productname,
        productid:selectedProduct?._id,
        successCallback:()=>{
          const paramAs = { shopid: selectedShop?._id }
          dispatch(listProduct(paramAs));
          handleDialogClose();
        }
    }
    dispatch(editProduct(obj))
    }else{
      let obj={
        productname: productInfo?.productname,
        shopid:selectedShop?._id,
        successCallback:()=>{
          const paramAs = { shopid: selectedShop?._id }
          dispatch(listProduct(paramAs));
          handleDialogClose();
        }
    }    
    dispatch(addProduct(obj))
    }
  }



  React.useEffect(()=>{
    if(isedit){     
      setProductInfo({
        productname: selectedProduct?.productname
      })
    } 
  },[selectedProduct,isedit])

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={handleDialogClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{isedit?"Edit product":"Add product"}</DialogTitle>
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
          label="Product name"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
          fullWidth
          name="productname"
          value={productInfo.productname}
          onChange={handleChange}
          
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleButton}>{isedit?"Edit product":"Add product"}</Button>
      </DialogActions>
    </Dialog>
  );
}
