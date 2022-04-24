import React from "react";
import { Grid, Typography } from "@mui/material";

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display={"flex"} justifyContent={"end"}>
        <Typography>3</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display={"flex"} justifyContent={"end"}>
        <Typography>$ 150.36</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuestos</Typography>
      </Grid>
      <Grid item xs={6} display={"flex"} justifyContent={"end"}>
        <Typography>$ 15.03</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant={"subtitle1"}>Total:</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display={"flex"} justifyContent={"end"}>
        <Typography variant={"subtitle1"}>$ 166.72</Typography>
      </Grid>
    </Grid>
  );
};
