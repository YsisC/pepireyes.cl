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

const HomePage: NextPage = () => {
  const [open, setOpen] = useState(false);
  const { openLocal, verificarEstadoDeTienda } = useOpenLocal();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const featuredProduct = [
    "2023-07-03 at 14.25.14 (15).jpeg",
    "2023-07-03 at 14.25.14 (16).jpeg",
    "2023-07-03 at 14.25.14 (17).jpeg",
  ];
  useEffect(() => {
    let isComponentMounted = true;
    const isOpen = verificarEstadoDeTienda();
    const checkAndSetOpenState = () => {
       
        console.log("is open", isOpen);
        console.log("openLocal", openLocal)

        // Use the isComponentMounted flag to check if the component is still mounted
        if (isComponentMounted && isOpen === false) {
            setOpen(true);
        }
    };

    // Use setTimeout to delay the execution by 2500 milliseconds (2.5 seconds)
    const timeoutId = setTimeout(() => {
        checkAndSetOpenState();
        
    }, 3500);

    // Cleanup function to set the isComponentMounted flag to false when the component is unmounted
    return () => {
        isComponentMounted = false;
        clearTimeout(timeoutId);
    };
}, []);

  return (
    <ShopLayout
      title={"Pepireyes "}
      pageDescription={"Encuentra los mejores productos de pepireyes aquí"}
    >
      <section className=" paddings">
        <ProductSlideshow images={featuredProduct} />
      </section>
      <Banner />
      <FeatureProducts />
      <ContacUs />
      <ModalOpenLocal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </ShopLayout>
  );
};

export default HomePage;
