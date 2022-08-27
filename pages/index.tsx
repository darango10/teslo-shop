import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../components/layout";
import { FullScreenLoading, SideMenu } from "../components/ui";
import { ProductList } from "../components/products";
import { useProduct } from "../hooks";

const Home: NextPage = () => {
  const { products, isLoading } = useProduct("/products");

  return (
    <ShopLayout
      title="Teslo Shop | Home"
      pageDescription="Home Page Teslo Shop"
    >
      <Typography variant="h1" component="h1">
        Teslo Shop | Home
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los Productos
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
      <SideMenu />
      <button></button>
    </ShopLayout>
  );
};

export default Home;
