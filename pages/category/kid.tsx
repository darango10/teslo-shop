import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../../components/layout";
import { ProductList } from "../../components/products";
import { useProduct } from "../../hooks";
import { FullScreenLoading, SideMenu } from "../../components/ui";

const Kids: NextPage = () => {
  const { products, isLoading } = useProduct("/products?gender=kid");

  return (
    <ShopLayout title="Teslo Shop | Kids" pageDescription="Kids Products">
      <Typography variant="h1" component="h1">
        Teslo Shop | Kids
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos Niños
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
      <SideMenu />
    </ShopLayout>
  );
};

export default Kids;
