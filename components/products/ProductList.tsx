import { Grid } from "@mui/material";
import React, { FC } from "react";
import { IProduct } from "../../interfaces/products";
import { ProductCard } from "./ProductCard";

interface Props {
  products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid spacing={4} container>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </Grid>
  );
};
