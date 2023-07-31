import { useContext, useEffect } from "react";
import {
  Typography,
  Grid,
  CardContent,
  Divider,
  Button,
  Card,
  Box,
} from "@mui/material";

import { CartContext } from "@/context";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { CartList, OrderSummary } from "../../components/cart";
import { useRouter } from "next/router";

const CartPage = () => {
  const { isLoaded, cart } = useContext(CartContext);
  console.log("buscando el cart", cart)
  console.log("buscando el isloaded", isLoaded)
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace("cart/empty");
    }
  }, [isLoaded, cart, router]);

  if ( !isLoaded || cart.length === 0 ) {
    return (<></>);
}

  return (
    <ShopLayout title="Carrito - 3" pageDescription="Carrito de compras">
        <section className="paddings" >
      <Typography variant="h1" component="h1">
        {" "}
        Carrito{" "}
      </Typography>
      <Grid container>
         <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2"> Orden</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth href='/checkout/address'>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid> 
      </Grid>
      </section>
    </ShopLayout>
  );
};

export default CartPage;
