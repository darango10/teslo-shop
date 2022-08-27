import React, { FC, useContext } from "react";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { Counter } from "../ui";
import { CartContext } from "../../context";
import { ICartProduct } from "../../interfaces";

interface Props {
  editable: boolean;
}

export const CartList: FC<Props> = ({ editable }) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext);

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  return (
    <>
      {cart.map((product) => (
        <Grid
          container
          spacing={2}
          sx={{ mb: 1 }}
          key={product.slug + product.size}
        >
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images}`}
                    component={"img"}
                    sx={{ borderRadius: "5px" }}
                    alt={product.images}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography variant={"body1"}>{product.title}</Typography>
              <Typography variant={"body1"}>
                Talla: <strong>M</strong>
              </Typography>
              {editable ? (
                <Counter
                  inStock={product.inStock}
                  quantity={
                    product.quantity > product.inStock
                      ? product.inStock
                      : product.quantity
                  }
                  updatedQuantity={(value) =>
                    onNewCartQuantityValue(product, value)
                  }
                />
              ) : (
                <Typography variant={"h6"}>{product.quantity} items</Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Typography variant={"subtitle1"}>${product.price}</Typography>
            {editable && (
              <Button
                variant={"text"}
                color={"secondary"}
                onClick={() => removeCartProduct(product)}
              >
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
