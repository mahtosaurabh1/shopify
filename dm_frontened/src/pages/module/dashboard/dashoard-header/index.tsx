import { AppBar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../../../redux/features/rootslice";
import Filter from "../filter";


export const DashboardHeader = () => {
  const { selectedShop }: any = useSelector(
    (state: rootReducerType) => state.shopReducer
  );
  const [open, setOpen] = useState<boolean>(false);

  const dialogClose = () => {
    setOpen(false);
  };
  const dialogOpen = () => {
    setOpen(true);
  };
  return (
    <Box ml={'.8rem'} sx={{display:'flex',gap:'2rem'}}>
      <Typography fontWeight={"bold"}>
        {selectedShop?.shopname}(Shop)
      </Typography>
      <Button variant="outlined" sx={{height:'1.5rem'}} onClick={dialogOpen}>Filter</Button>
      <Filter
        dialogClose={dialogClose}
        dialogOpen={dialogOpen}
        open={open}
      />
    </Box>
  );
};
