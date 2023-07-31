import type { NextPage } from "next";
import { Typography, Grid } from "@mui/material";
// import useSWR, { SWRConfiguration } from "swr";
import { Container } from "@mui/material";

import { useProducts } from "../hooks";
import { IProduct } from "../interfaces";
import { ProductList } from "../components/products";

import { ShopLayout } from "../components/layouts";
import Banner from "../components/homepage/Banner";

import { ProductSlideshow } from "../components/products";
import { FullScreenLoading } from "@/components/ui";
import FeatureProducts from "@/components/homepage/FeatureProducts";

const Menu: NextPage = () => {
  const { products, isLoading } = useProducts("/products");
  // const { data, isLoading } = useSWR<IProduct[]>("/products");
  // const products = data ?? [];
  // const featuredProduct = products.slice(0,5).map(product => product.images)
  const featuredProduct = [
    "2023-07-03 at 14.25.14 (15).jpeg",
    "2023-07-03 at 14.25.14 (16).jpeg",
    "2023-07-03 at 14.25.14 (17).jpeg",
  ];

  // console.log(featuredProduct)

  return (
    <ShopLayout
      title={"Menu - PR"}
      pageDescription={"Encuentra los mejores productos de pepireyes aquí"}
    >
    <section className="paddings" >
    <Typography variant="h1" component="h1">
        Menu
      </Typography>
      <Typography variant="h2" sx={{ mb: 2 , mt:1}}>
        Todas las categorias
      </Typography>
     
 
        {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    
     

    </section>
      
   
    </ShopLayout>
  );
};

export default Menu;
