import { pepireyesApi } from "@/axiosApi";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShopLayout } from "@/components/layouts";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";

const ResponsePage = () => {
  const [responseData, setResponseData] = useState(null);
  const router = useRouter();
  const token_ws = Array.isArray(router.query.token_ws)
    ? router.query.token_ws[0] // Si es una matriz, toma el primer elemento
    : router.query.token_ws; // Si es una cadena, déjalo igual
 
  const actualizarTransaccion = async () => {
    // Cuerpo de la solicitud (si es necesario)
    const body = { token_ws }; // Puedes definir el cuerpo de la solicitud aquí
    try {
      // Realizar la solicitud PUT
      const response = await pepireyesApi.put("/webpay/pay", body);
     

      // Devolver la respuesta
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError; 
        if (axiosError.response) {
          const responseData = axiosError.response.data;// Hacemos un type cast a AxiosError
        
        // Asegúrate de que responseData es un objeto antes de acceder a la propiedad 'message'
      if (responseData && typeof responseData === 'object'&& 'message' in responseData) {
        const messageData = responseData.message as string;
          const notify = () => toast.error(messageData) ;
          notify();
          router.push("/orders/history");
          console.error(
            "Error en la solicitud PUT axios:",
            error.response?.data?.message
          );
        }
      }
      
      // Manejar errores, por ejemplo:
      console.error("Error en la solicitud PUT sin axios:", error);
      throw error;
    }
  }}

  useEffect(() => {
    if (token_ws) {
      // Llamar a la función para actualizar la transacción
      actualizarTransaccion()
        .then((data) => {
          // Manejar la respuesta exitosa de la solicitud PUT
          setResponseData(data);
          const urlOrder = data.buy_order.substring(1);
        
          router.push(`/orders/${urlOrder}`);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al actualizar la transacción:", error);
        });
    }
  }, [token_ws, router]);

  return (
    <ShopLayout title="Webpay" pageDescription={"Esperando respuesta"}>
      <ToastContainer />
      <Box
        height={"75vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CircularProgress />
      </Box>
    </ShopLayout>
  );
};

export default ResponsePage;
