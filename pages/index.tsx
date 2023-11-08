import type { NextPage } from "next";

import { Typography, Grid, Button } from "@mui/material";
// import useSWR, { SWRConfiguration } from "swr";

import { ShopLayout } from "../components/layouts";
import Banner from "../components/homepage/Banner";

import { ProductSlideshow } from "../components/products";

import FeatureProducts from "@/components/homepage/FeatureProducts";
import ContacUs from "@/components/homepage/ContactUs";
import { useSession } from "next-auth/react";
import {useState , useEffect} from 'react';
import { useOpenLocal } from "@/hooks/useOpenLocal";
import ModalOpenLocal from "@/components/homepage/ModalOpenLocal";



const HomePage: NextPage = () => {
  const [openM, setOpenM] = useState(false);
  const { openLocal,  verificarEstadoDeTienda} = useOpenLocal();

  const handleOpen = () => setOpenM(true);
  const handleClose = () => setOpenM(false);
  const featuredProduct = [
    "2023-07-03 at 14.25.14 (15).jpeg",
    "2023-07-03 at 14.25.14 (16).jpeg",
    "2023-07-03 at 14.25.14 (17).jpeg",
  ];

  
  useEffect(() => {
 
    verificarEstadoDeTienda()
    console.log("local abierto",openLocal)
    if(openLocal){
      handleOpen()
    }
     }, [])


  return (

    <ShopLayout
      title={"Pepireyes - Home"}
      pageDescription={"Encuentra los mejores productos de pepireyes aquí"}
    >
   <Button onClick={handleOpen}>Open modal</Button>
      <section className=" paddings">
      <ProductSlideshow images={featuredProduct} />
        
        </section>
      <Banner />
      <FeatureProducts />
      <ContacUs />
      <ModalOpenLocal
      openM={openM}
      handleOpen={handleOpen}
      handleClose={handleClose} />
    </ShopLayout>
  );
};

export default HomePage;
