import Promociones from "@/components/ui/Promociones";
import { ShopLayout } from "../components/layouts";
import type { NextPage } from "next";

const promociones: NextPage = () => {
  return (
    <ShopLayout
      title={"Promociones-PR"}
      pageDescription={"Encuentra los mejores productos de pepireyes aquí"}
    >
  <Promociones />
    </ShopLayout>
  );
};

export default promociones;
