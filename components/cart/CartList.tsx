import { FC, useContext } from 'react'

import { Typography, CardActionArea, Grid, CardMedia, Box, Button } from '@mui/material';
import Link from '../../themeMUI/Link';

import { ItemCounter } from '../ui';
import { CartContext } from '@/context/cart';
import { ICartProduct, IOrderItem } from '@/interfaces';


interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false , products }) => {
  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext)

  const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product)
  }

  return (
    <>
      {
        cart.map(product => (
          <Grid container spacing={2} key={product.slug}>
            <Grid item xs={3}>
              <Link href={`/product/${ product.slug }`} > 
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component='img'
                    sx={{ borderRadius: '5px' }} >

                  </CardMedia>
                </CardActionArea>
              </Link>
            </Grid>
            <Grid item xs={7}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='body1'>{product.title}</Typography>
                <Typography variant='body1'>Tamaño: <strong>{ product.size }</strong></Typography>

                {
                  editable
                    ? (
                      <ItemCounter
                        currentValue={product.quantity}
                        maxValue={10}
                        updatedQuantity={(value) => { onNewCartQuantityValue(product, value) }}
                      />
                    )
                    : (
                      <Typography variant='h5'>{product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}</Typography>
                    )
                }
              </Box>
            </Grid>
            <Grid item xs={2} display='flex' alignItems={'center'} flexDirection={'column'}>
              <Typography variant='subtitle1'>$ {`${product.price}`}</Typography>
              {
                editable && (
                  <Button onClick={() => removeCartProduct(product)} variant='text' color='secondary'> Remover </Button>
                )

              }

            </Grid>
          </Grid>


        ))
      }

    </>
  )
}


