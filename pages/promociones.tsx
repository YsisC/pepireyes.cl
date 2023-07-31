import { ShopLayout } from "../components/layouts";
import type { NextPage } from "next";

const promociones: NextPage = () => {
  return (
    <ShopLayout
      title={"Promociones-PR"}
      pageDescription={"Encuentra los mejores productos de pepireyes aquí"}
    >
      <div>
        <h2>Promociones</h2>
      </div>
    </ShopLayout>
  );
};

export default promociones;
