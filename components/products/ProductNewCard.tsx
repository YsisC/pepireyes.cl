import { FC, useMemo, useState } from 'react';
import Link from '../../themeMUI/Link';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography,  Chip } from '@mui/material'
import { IProduct } from '@/interfaces';

interface Props {
    product: IProduct;
}

const ProductNewCard: FC<Props> = ({product}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const productImage =  `${ product.images[0] }`;
  return (
    <Grid item 
            xs={6} 
            sm={ 4 }
            onMouseEnter={ () => setIsHovered(true) } 
            onMouseLeave={ () => setIsHovered(false) } 
      >
          <Card >

                <Link href={`/product/${ product.slug }`} prefetch={ false }>

                    <CardActionArea>

                        {
                            (product.inStock === 0 ) && (
                                <Chip 
                                    color="primary"
                                    label="No hay disponibles"
                                    sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                                />
                            )
                        }

                        <CardMedia 
                            component='img'
                            sx={{ height: {xs:'17rem', md: '22rem'}, width: {xs:'17rem', md: '22rem'}  }}
                            className='fadeIn imageWrapper'
                            image={ productImage }
                            alt={ product.title }
                            onLoad={ () => setIsImageLoaded(true) }
                        />

                    </CardActionArea>
                </Link>
             
          <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
              <Typography fontWeight={700}>{ product.title }</Typography>
              <Typography fontWeight={500}>{ `$${product.price}` }</Typography>
          </Box>
              
          </Card>

      </Grid>
  )
}

export default ProductNewCard