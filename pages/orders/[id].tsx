import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
  DataArrayRounded,
} from "@mui/icons-material";

import { ShopLayout } from "../../components/layouts/ShopLayout";
import { CartList, OrderSummary } from "../../components/cart";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";
import { pepireyesApi } from "@/axiosApi";
import { useState } from "react";
import { IWebPayOrder } from "@/interfaces/webpay";
import { useRouter } from "next/router";
import axios from "axios";

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const router = useRouter();
  const { shippingAddress } = order;
  const [isPaying, setIsPaying] = useState(false);
  const [webpay_peticion, setWebpayPeticion] = useState({
    url: "",
    token: "",
  });

  const onOrderCompleted = async () => {
    let buy_order = "O" + order._id;
    let session_id = "S-" + Math.floor(Math.random() * 10000) + 1;
    let amount = order.total;
    let return_url = "http://localhost:3000/webpay/response";
    let web;
    //  console.log(amount)
    const body: IWebPayOrder = {
      buy_order,
      session_id,
      amount,
      return_url,
    };
    setIsPaying(true);
    try {
      const { data } = await pepireyesApi.post("/webpay/pay", body);
      console.log("datafron", data);
      setWebpayPeticion(data);
      if (
        webpay_peticion 
     
      ) {
        const redirectUrl = `/webpay/pay?url=${data.url}&token=${data.token}`;

        router.push(redirectUrl)
  
      }

    } catch (error) {
      setIsPaying(false);
      console.log("error desde el front ", error);
    }
  };
  return (
    <ShopLayout
      title="Resumen de la orden"
      pageDescription={"Resumen de la orden"}
    >
      <section className="paddings">
        <Typography variant="h1" component="h1">
          Orden: {order._id}
        </Typography>

        {order.isPaid ? (
          <Chip
            sx={{ my: 2 }}
            label="Orden ya fue pagada"
            variant="outlined"
            color="success"
            icon={<CreditScoreOutlined />}
          />
        ) : (
          <Chip
            sx={{ my: 2 }}
            label="Pendiente de pago"
            variant="outlined"
            color="error"
            icon={<CreditCardOffOutlined />}
          />
        )}

        <Grid container className="fadeIn">
          <Grid item xs={12} sm={7}>
            <CartList products={order.orderItems} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h2">
                  Resumen ({order.numberOfItems}{" "}
                  {order.numberOfItems > 1 ? "productos" : "producto"})
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1">
                    Dirección de entrega
                  </Typography>
                </Box>

                <Typography>
                  {shippingAddress.firstName} {shippingAddress.lastName}
                </Typography>
                <Typography>
                  {shippingAddress.address}{" "}
                  {shippingAddress.address2
                    ? `, ${shippingAddress.address2}`
                    : ""}
                </Typography>
                <Typography>
                  {shippingAddress.city}, {shippingAddress.zip}
                </Typography>
                <Typography>{shippingAddress.commune}</Typography>
                <Typography>{shippingAddress.phone}</Typography>

                <Divider sx={{ my: 1 }} />

                <OrderSummary
                  orderValues={{
                    numberOfItems: order.numberOfItems,
                    subTotal: order.subTotal,
                    total: order.total,
                    tax: order.tax,
                  }}
                />

                <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                  {/* TODO */}

                  <Box display="flex"
                                justifyContent="center"
                                className='fadeIn'
                                sx={{ display: isPaying ? 'flex': 'none' }}>
                                <CircularProgress />
                            </Box>
                            <Box flexDirection='column' sx={{ display: isPaying ? 'none': 'flex', flex: 1 }} >
                  
                  {order.isPaid ? (
                    <Chip
                      sx={{ my: 2 }}
                      label="Orden ya fue pagada"
                      variant="outlined"
                      color="success"
                      icon={<CreditScoreOutlined />}
                    />
                  ) : (
                    <>
                          <Button color="secondary" sx={{ fontSize:'1.4rem' }} className="circular-btn" onClick={onOrderCompleted}>Pagar</Button>
      
                    </>
                  )}
                                              </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
