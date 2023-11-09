import { pepireyesApi } from "@/axiosApi";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShopLayout } from "@/components/layouts";
import Box from '@mui/material/Box';
import { CircularProgress } from "@mui/material";

const ResponsePage = () => {
    const [responseData, setResponseData] = useState(null);
  const router = useRouter();
  const token_ws = Array.isArray(router.query.token_ws)
    ? router.query.token_ws[0] // Si es una matriz, toma el primer elemento
    : router.query.token_ws; // Si es una cadena, déjalo igual

  const actualizarTransaccion = async (token: string) => {
  
  
    // Cuerpo de la solicitud (si es necesario)
    const body = {token_ws}; // Puedes definir el cuerpo de la solicitud aquí
    try {
     
      // Realizar la solicitud PUT
      const response = await pepireyesApi.put("/webpay/pay", body);

      // Devolver la respuesta
      return response.data;
    } catch (error) {
      // Manejar errores, por ejemplo:
      console.error("Error en la solicitud PUT:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (token_ws) {
        // Llamar a la función para actualizar la transacción
        actualizarTransaccion(token_ws)
        .then((data) => {
            // Manejar la respuesta exitosa de la solicitud PUT
            setResponseData(data);
            const urlOrder = data.buy_order.substring(1)
            console.log("url", urlOrder)
            router.push(`/orders/${urlOrder}`)
          })
          .catch((error) => {
            // Manejar errores
            console.error("Error al actualizar la transacción:", error);
          });
      }
  }, [ token_ws]);

  return (
    <ShopLayout
    title="Webpay"
    pageDescription={"Esperando respuesta"}
  >
     <Box height={'75vh'} 
     display={"flex"}
      justifyContent={'center'}
    alignItems={'center'}>
     <CircularProgress  />
     </Box>
      
      </ShopLayout>
  );
};

export default ResponsePage;
