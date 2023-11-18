import type { NextPage, GetServerSideProps } from 'next';
import { Typography,Box, Grid } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';
import { useProducts } from '@/hooks';



interface Props {
    products: IProduct[];
    type: string;
}


const CategoryPage: NextPage<Props> = ({  type }) => {

    const { products, isLoading } = useProducts(`/products?type=${type}`);
console.log(products)

  return (
    <ShopLayout title={'Pepireyes - Category'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
        <Grid container className={`paddings `}>


         <Typography variant="h2" component={"h2"}>
         Inicio / Categoria / <span> {type} </span>
        </Typography>
        

        

        
        <ProductList products={ products } />
        </Grid>
    </ShopLayout>
  )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { type = '' } = params as { type: string };

    if ( type.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    return {
        props: {
            type
        }
    }
}


export default CategoryPage