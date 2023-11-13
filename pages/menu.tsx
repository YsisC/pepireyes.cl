import type { NextPage } from "next";
import { Typography, Grid } from "@mui/material";
// import useSWR, { SWRConfiguration } from "swr";
import { Container } from "@mui/material";

import { useProducts } from "../hooks";
import { IProduct, IType } from "../interfaces";


import { ShopLayout } from "../components/layouts";

import MenuSection from "@/components/ui/MenuSection";

const Menu: NextPage = () => {
  const { products, isLoading } = useProducts("/products");


  return (
    <ShopLayout
      title="Menu - PR"
      pageDescription="Encuentra los mejores productos de pepireyes aquí"
    >
      <section className="paddings">
        <Typography variant="h2" component="h2">
          Inicio / <span> Menu </span>
        </Typography>

        <MenuSection products={products} isLoading={isLoading} />

      
      </section>
 
    </ShopLayout>
  );
};

export default Menu;
