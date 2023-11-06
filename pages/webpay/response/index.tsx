import { pepireyesApi } from "@/axiosApi";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ResponsePage = () => {
  const router = useRouter();
  const token_ws = Array.isArray(router.query.token_ws)
  ? router.query.token_ws[0] // Si es una matriz, toma el primer elemento
  : router.query.token_ws; // Si es una cadena, déjalo igual

  const orderResponse = async () => {
    try {
        if (typeof token_ws === 'string') {
        const { data } = await pepireyesApi.put(`/webpay/pay/${token_ws}`);
        console.log("data put front", data)
        return data
        }
        
    } catch (error) {
        console.log("error", error)
    }
  };
  useEffect(() => {
 orderResponse()
  }, [])
  
  return (
    <div>
      <h1>TOKEN_WS = {token_ws}</h1>
      respuesta

    </div>
  );
};


export default ResponsePage;
