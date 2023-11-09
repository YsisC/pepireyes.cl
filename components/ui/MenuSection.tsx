import React, { useTransition, useState, FC } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { IProduct, IType } from "@/interfaces";
import { useProducts } from "@/hooks";
import { ProductList } from "../products";
import { Box } from "@mui/material";

interface Props {
  products: IProduct[];
  isLoading: boolean;
}

const MenuSection: FC<Props> = ({ products, isLoading }) => {
  const [tab, setTab] = useState("burguer");
  const [isPending, startTransition] = useTransition();

  const categoryProduct = (category: IType) => {
    return products.filter((product) => product.type === category);
  };

  const TAB_DATA = [
    {
      title: "burguer",
      content: <ProductList products={categoryProduct("burguer")} />,
    },
    {
      title: "pepito",
      content: <ProductList products={categoryProduct("pepito")} />,
    },
    {
      title: "cachapa",
      content: <ProductList products={categoryProduct("cachapa")} />,
    },
    {
      title: "drink",
      content: <ProductList products={categoryProduct("drink")} />,
    },
    {
      title: "papas",
      content: <ProductList products={categoryProduct("papas")} />,
    },
    {
      title: "combo",
      content: <ProductList products={categoryProduct("combo")} />,
    },
  ];

  const currentTabContent = TAB_DATA.find((t) => t.title === tab)?.content;

  return (
<>
      <nav className={"nav"}>
        <TabButton  selectTab={() => setTab("burguer")} active={tab === "burguer"}>
         Hamburguesas
        </TabButton>
        <TabButton selectTab={() => setTab("pepito")} active={tab === "pepito"}>
          Pepito
        </TabButton>
        <TabButton selectTab={() => setTab("cachapa")} active={tab === "cachapa"}>
          Cachapa
        </TabButton>
        <TabButton selectTab={() => setTab("drink")} active={tab === "drink"}>
          Bebidas
        </TabButton>
        <TabButton selectTab={() => setTab("papas")} active={tab === "papas"}>
          Papas
        </TabButton>
        <TabButton selectTab={() => setTab("combo")} active={tab === "combo"}>
          Combos
        </TabButton>
      </nav>
      <div style={{marginTop: '1.5rem' }}>

      {currentTabContent}

     
      </div>
      </>
  );
};

export default MenuSection;
