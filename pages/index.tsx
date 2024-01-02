import type { NextPage } from "next";

import { Typography, Grid, Button } from "@mui/material";
// import useSWR, { SWRConfiguration } from "swr";

import { ShopLayout } from "../components/layouts";
import Banner from "../components/homepage/Banner";

import { ProductSlideshow } from "../components/products";

import { useState, useEffect } from "react";
import FeatureProducts from "@/components/homepage/FeatureProducts";
import ContacUs from "@/components/homepage/ContactUs";
import { useLoadScript } from "@react-google-maps/api";
import { useOpenLocal } from "@/hooks/useOpenLocal";
import ModalOpenLocal from "@/components/homepage/ModalOpenLocal";

import Carrousel from "@/components/products/Carrousel";

const HomePage: NextPage = () => {
  const [open, setOpen] = useState(false);
  const { openLocal, verificarEstadoDeTienda } = useOpenLocal();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const featuredProduct = [
    "/products/2023-07-03 at 14.25.14 (15).jpeg",
    "/products/2023-07-03 at 14.25.14 (16).jpeg",
    "/products/2023-07-03 at 14.25.14 (17).jpeg",
  ];

  useEffect(() => {
   
    const updatedState = () => {
      const isOpen = verificarEstadoDeTienda();
      console.log(isOpen);
  
    };
    
 

    updatedState();


}, [openLocal, verificarEstadoDeTienda,  ]);

  return (
    <ShopLayout
      title={"Pepireyes "}
      pageDescription={"Encuentra los mejores productos de pepireyes aquí"}
    >
      <>
      <section className=" paddings">
        <ProductSlideshow images={featuredProduct} />
      </section>
      <Banner />
      {/* <FeatureProducts /> */}
   
      <Carrousel />
      <ContacUs />
      <ModalOpenLocal
        open={openLocal}
        handleOpen={handleOpen}
        handleClose={handleClose}
        />
     
        </>
    </ShopLayout>
  );
};

export default HomePage;
