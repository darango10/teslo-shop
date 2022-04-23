import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../components/layout/ShopLayout";
import { SideMenu } from "../components/ui";
import { initialData } from "../database/products";
import { ProductList } from "../components/products/ProductList";

const Home: NextPage = () => {
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

      <ProductList products={initialData.products as any} />
      <SideMenu />
    </ShopLayout>
  );
};

export default Home;
