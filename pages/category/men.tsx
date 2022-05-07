import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../../components/layout";
import { ProductList } from "../../components/products";
import { useProduct } from "../../hooks";
import { FullScreenLoading, SideMenu } from "../../components/ui";

const Men: NextPage = () => {
  const { products, isLoading } = useProduct("/products?gender=men");

  return (
    <ShopLayout title="Teslo Shop | Man" pageDescription="Man Products">
      <Typography variant="h1" component="h1">
        Teslo Shop | Man
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos Hombre
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
      <SideMenu />
    </ShopLayout>
  );
};

export default Men;
