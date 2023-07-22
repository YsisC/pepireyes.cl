import type { NextPage } from "next";
import { Typography, Grid } from "@mui/material";
import useSWR, { SWRConfiguration } from "swr";

// import { useProducts } from '../hooks';
import { IProduct } from "../interfaces";
import { ProductList } from "../components/products";
import { ShopLayout } from "../components/layouts";
import { FullScreenLoading } from "../components/ui";
import { ProductSlideshow } from "../components/products";

import { seedDatabase } from "../database";
// import { ItemCounter } from '../../components/ui/ItemCounter';

// const { products, isLoading } = useProducts('/products');

const HomePage: NextPage = () => {
  const { data, isLoading } = useSWR<IProduct[]>("/products");
  const products = data ?? [];
  // const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );
  return (
    <ShopLayout
      title={"Pepireyes - Home"}
      pageDescription={"Encuentra los mejores productos de pepireyes aquí"}
    >
      <Typography variant="h1" component="h1">
        Hamburguesas
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={10} sx={{ mb: { sm: 1 } }}>
          {/* <ProductSlideshow 
            products={ products }
          /> */}
        </Grid>
      </Grid>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
