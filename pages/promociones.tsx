import Promociones from "@/components/ui/Promociones";
import { ShopLayout } from "../components/layouts";
import type { GetServerSideProps, NextPage } from "next";
import { dbProducts } from "@/database";
import { IProduct, IType } from "@/interfaces";


interface Props {
  products: IProduct[];
}


const promociones: NextPage<Props> = ({products}) => {
  console.log(products)
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
