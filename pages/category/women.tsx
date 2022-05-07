import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../../components/layout";
import { ProductList } from "../../components/products";
import { useProduct } from "../../hooks";
import { FullScreenLoading, SideMenu } from "../../components/ui";

const Women: NextPage = () => {
  const { products, isLoading } = useProduct("/products?gender=women");

  return (
    <ShopLayout title="Teslo Shop | Women" pageDescription="Woman Products">
      <Typography variant="h1" component="h1">
        Teslo Shop | Women
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos Mujer
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
      <SideMenu />
    </ShopLayout>
  );
};

export default Women;
