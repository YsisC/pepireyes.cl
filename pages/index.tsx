import type { NextPage } from "next";

import { Typography, Grid } from "@mui/material";
// import useSWR, { SWRConfiguration } from "swr";

import { ShopLayout } from "../components/layouts";
import Banner from "../components/homepage/Banner";

import { ProductSlideshow } from "../components/products";

import FeatureProducts from "@/components/homepage/FeatureProducts";
import ContacUs from "@/components/homepage/ContactUs";
import { useSession } from "next-auth/react";

const HomePage: NextPage = () => {
  
  const featuredProduct = [
    "2023-07-03 at 14.25.14 (15).jpeg",
    "2023-07-03 at 14.25.14 (16).jpeg",
    "2023-07-03 at 14.25.14 (17).jpeg",
  ];
  const { data: session } = useSession();

  console.log(session)

  return (
    <ShopLayout
      title={"Pepireyes - Home"}
      pageDescription={"Encuentra los mejores productos de pepireyes aquí"}
    >
  
      <ProductSlideshow images={featuredProduct} />
      <Banner />
      <FeatureProducts />
      <ContacUs />

    </ShopLayout>
  );
};

export default HomePage;
