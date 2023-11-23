import Promociones from "@/components/ui/Promociones";
import { ShopLayout } from "../components/layouts";
import type { GetServerSideProps, NextPage } from "next";
import { dbProducts } from "@/database";
import { IType } from "@/interfaces";


type PromoProduct = {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  slug: string;
  size: string;
  title: string;
  type: IType;
};
interface Props {
  products: PromoProduct[];
}


const promociones: NextPage<Props> = ({products}) => {
  return (
    <ShopLayout
      title={"Promociones-PR"}
      pageDescription={"Encuentra los mejores productos de pepireyes aquí"}
    >
  <Promociones products={products} />
    </ShopLayout>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    


  const products = await dbProducts.getAllProducts()
console.log(products)

  return {
      props: {
        products
      }
  }
}
export default promociones;
