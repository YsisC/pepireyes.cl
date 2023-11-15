import { useContext, useEffect, useState, useLayoutEffect } from "react";
import Link from "../../themeMUI/Link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
} from "@mui/material";

import { CartContext } from "../../context";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { CartList, OrderSummary } from "../../components/cart";
import { FullScreenLoading } from "@/components/ui";
// import { countries } from '../../utils';

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { User } from "@/models";

const SummaryPage = () => {
  const router = useRouter();
  const { shippingAddress, numberOfItems, createOrder, cart } =
    useContext(CartContext);

  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!Cookies.get("firstName")) {
      router.push("/checkout/address");
    }
  }, [router]);

  const onCreateOrder = async () => {
    setIsPosting(true);

    const { hasError, message } = await createOrder();

    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }

    router.replace(`/orders/${message}`);
    cart.length = 0;
  };

  if (!shippingAddress) {
    return <FullScreenLoading />;
  }

  const {
    firstName,
    lastName,
    address,
    address2 = "",
    city,
    commune,
    phone,
  } = shippingAddress;

  return (
    <ShopLayout
      title="Resumen de orden"
      pageDescription={"Resumen de la orden"}
    >
      <section className="paddings">
        <Typography variant="h1" component="h1">
          Resumen de la orden
        </Typography>

        <Grid container>
          <Grid item xs={12} sm={7}>
            <CartList />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h2">
                  Resumen ({numberOfItems}{" "}
                  {numberOfItems === 1 ? "producto" : "productos"})
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="end">
                  <Link
                    href="/checkout/address"
                    underline="always"
                    sx={{ color: "gray", fontSize: "1.1rem" }}
                  >
                    Editar
                  </Link>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1">
                    Dirección de entrega
                  </Typography>

                  <Link href="/checkout/address" underline="always">
                    Editar
                  </Link>
                </Box>

                <Typography>
                  {firstName} {lastName}
                </Typography>
                <Typography>
                  {address}
                  {address2 ? `, ${address2}` : ""}{" "}
                </Typography>
                <Typography>{commune}</Typography>
                <Typography>{city}, </Typography>

                <Typography>{phone}</Typography>
             
                <Divider sx={{ my: 1 }} />

                <Box display="flex" justifyContent="end">
                  <Link
                    href="/cart"
                    underline="always"
                    sx={{ color: "gray", fontSize: "1.1rem" }}
                  >
                    Editar
                  </Link>
                </Box>

                <OrderSummary />

                <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                  <Button
                    color="secondary"
                    className="circular-btn"
                    fullWidth
                    onClick={onCreateOrder}
                    disabled={isPosting}
                  >
                    Confirmar Orden
                  </Button>

                  <Chip
                    color="error"
                    label={errorMessage}
                    sx={{ display: errorMessage ? "flex" : "none", mt: 2 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getToken({ req: context.req });
  if (session) {
    console.log("sumary", session);

    const getUserName = session.name;

    if (getUserName) {
      return {
        props: { user: { email: session.email, name: getUserName } },
      };
    } else {
      return { redirect: { destination: "/auth/login", permanent: false } };
    }
  } else {
    return { redirect: { destination: "/auth/login", permanent: false } };
  }
};

export default SummaryPage;
