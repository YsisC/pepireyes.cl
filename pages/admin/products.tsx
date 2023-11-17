import Link from '../../themeMUI/Link';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';

import { AdminLayout } from '../../components/layouts'
import { IProduct  } from '../../interfaces';


const columns:GridColDef[] = [
    { 
        field: 'img', 
        headerName: 'Foto',
        renderCell: ({ row }:GridRenderCellParams<any, any> ) => {
            return (
                <Link color={'#FFFFFF '} href={ `/product/${ row.slug }` } target="_blank" rel="noreferrer">
                    <CardMedia 
                        component='img'
                        image={ row.img }
                        alt={ row.title }
                        className='fadeIn'
                       
                    />
                </Link>
            )
        }
    },
    { 
        field: 'title', 
        headerName: 'Title', 
        width: 250,
        renderCell: ({row}:GridRenderCellParams<any, any>) => {
            return (
                
                    <Link color={'#FFFFFF'} href={`/admin/products/${ row.slug }`} underline='always'>
                        { row.title}
                    </Link>
                
            )
        }
    },
  
    { field: 'type', headerName: 'Tipo' },
    { field: 'inStock', headerName: 'Inventario' },
    { field: 'price', headerName: 'Precio' },
    { field: 'size', headerName: 'Tamaño', width: 250 },

];



const ProductsPage = () => {

    const { data, error } = useSWR<IProduct[]>('/api/admin/products');
console.log(data)
    if ( !data && !error ) return (<></>);
    
    const rows = data!.map( product => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        size: product.size,
        slug: product.slug,
    }));
    const prueba = data?.map( product => {
        console.log( product.images[0])

    });

  return (
    <AdminLayout 
        title={`Productos (${ data?.length })`} 
        subTitle={'Mantenimiento de productos'}
        icon={ <CategoryOutlined /> }
    >
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
                href="/admin/products/new"
            >
                Crear producto
            </Button>
        </Box>

         <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSizeOptions={[10, 25, 50, 100]}
                />

            </Grid>
        </Grid>
        
    </AdminLayout>
  )
}

export default ProductsPage;