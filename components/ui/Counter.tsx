import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { FC } from "react";

interface Props {
  quantity: number;
  inStock: number;
  updatedQuantity: (newValue: number) => void;
}

export const Counter: FC<Props> = ({ quantity, inStock, updatedQuantity }) => {
  return (
    <Box display={"flex"} alignItems={"center"}>
      <IconButton
        disabled={quantity === 1}
        onClick={() => updatedQuantity(quantity - 1)}
      >
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>
        {quantity}
      </Typography>
      <IconButton
        disabled={quantity === inStock}
        onClick={() => updatedQuantity(quantity + 1)}
      >
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
