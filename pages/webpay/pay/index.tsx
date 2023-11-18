import React, { useEffect } from "react";
import { ShopLayout } from "@/components/layouts";
import { useRouter } from 'next/router';
const WebpayPayPage = () => {
  const router = useRouter();
  const url = Array.isArray(router.query.url)
  ? router.query.url[0] // Si es una matriz, toma el primer elemento
  : router.query.url; // Si es una cadena, déjalo igual
  const token =  router.query.token;
  // Comprobación antes de acceder a token.length


useEffect(() => {
    
  const formElement = document.getElementById("myForm") as HTMLFormElement | null;
  if (formElement) {
    formElement.submit(); // Utiliza el método submit() en un elemento de formulario
  }
  
  
}, []);

  return (
    <ShopLayout title="Webpay" pageDescription="Carrito de compras">
      <section className="paddings">
        <h1>Webpay de Transbank</h1>
        Pagando.....
        <form id="myForm" action={url || ""} name="form" method="POST">
          <input
            type="hidden"
            name="token_ws"
            value={token}
          />
        
        </form>
      </section>
    </ShopLayout>
  );
};

export default WebpayPayPage;