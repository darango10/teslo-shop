import { Box, Button, Chip, Grid, Skeleton, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { ShopLayout } from "../../components/layout";
import { ProductSlideShow } from "../../components/products";
import { Counter, SizeSelector } from "../../components/ui";
import { ICartProduct, IProduct, ISize } from "../../interfaces";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { dbProducts } from "../../database";
import { usePrice } from "../../hooks";
import { useRouter } from "next/router";
import { CartContext } from "../../context";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const { price, isLoading } = usePrice(`/products/price/${product.slug}`);
  const { addProductToCart } = useContext(CartContext);
  const router = useRouter();
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    gender: product.gender,
    images: product.images[0],
    price: price ?? product.price,
    quantity: 1,
    size: undefined,
    inStock: product.inStock,
    slug: product.slug,
    title: product.title,
  });

  const selectedSize = (size: ISize) => {
    setTempCartProduct({
      ...tempCartProduct,
      size,
    });
  };

  const onUpdateQuantity = (newValue: number) => {
    setTempCartProduct({
      ...tempCartProduct,
      quantity: newValue,
    });
  };

  const onAddProductToCart = () => {
    if (!tempCartProduct.size) return;
    addProductToCart(tempCartProduct);
    router.push("/cart");
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            {isLoading ? (
              <Skeleton animation="wave" width={50} height={30} />
            ) : (
              <Typography variant="subtitle1" component="h2">
                ${price}
              </Typography>
            )}

            <Box
              sx={{ my: 2 }}
              display="flex"
              justifyContent={"flex-start"}
              alignItems="center"
            >
              <Typography variant="subtitle2" component="h2" sx={{ mr: 5 }}>
                Cantidad
              </Typography>
              <Counter
                inStock={product.inStock}
                quantity={tempCartProduct.quantity}
                updatedQuantity={onUpdateQuantity}
              />
            </Box>
            <Box
              sx={{ my: 2 }}
              display="flex"
              justifyContent={"flex-start"}
              alignItems="center"
            >
              <Typography variant="subtitle2" component="h2" sx={{ mr: 5 }}>
                Talla
              </Typography>
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={selectedSize}
              />
            </Box>

            {product.inStock === 0 ? (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
              />
            ) : (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={onAddProductToCart}
              >
                {tempCartProduct.size
                  ? "Agregar al Carrito"
                  : "Seleccione una Talla"}
              </Button>
            )}
            <Box sx={{ my: 3 }}>
              <Typography variant="subtitle2">Descripcion</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = "" } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug(slug);
//
//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//
//   return {
//     props: {
//       product,
//     },
//   };
// };

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productsSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productsSlugs.map(({ slug }) => ({
      params: {
        slug: slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
