import React from "react";
import { ShopLayout } from "../../components/layout";
import { Box, Typography } from "@mui/material";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";

const EmptyPage = () => {
  return (
    <ShopLayout
      title={"Carrito vacío"}
      pageDescription={"No hay articulos en el carrito"}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"calc(100vh - 200px)"}
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box>
          <Typography variant={"h1"}>Su carrito esta vacio</Typography>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
