import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastSuccess = (message: string) => {
  toast.success(message, {
    position: "bottom-center", 
    autoClose: 1000, 
  });
};

export const toastError = (error: string) => {
  toast.error(error, {
    position: "bottom-center", 
    autoClose: 1000, 
  });
};
