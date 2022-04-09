import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../components/layout/ShopLayout";
import { initialData } from "../database/products";

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

      <Grid spacing={4} container>
        {initialData.products.map((product) => (
          <Grid item xs={6} sm={4} key={product.slug}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component={"img"}
                  image={`products/${product.images[0]}`}
                  alt={product.title}
                ></CardMedia>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ShopLayout>
  );
};

export default Home;
