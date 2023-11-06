import React, { useEffect } from "react";
import { ShopLayout } from "@/components/layouts";
import { useRouter } from 'next/router';
const WebpayPayPage = () => {
  const router = useRouter();
  const url =  router.query.url;
  const token =  router.query.token;
  // Comprobación antes de acceder a token.length

console.log("url", {url})
console.log("token", {token})
  useEffect(() => {
    
    const formElement = document.getElementById("myForm");
    if (formElement ) {
      formElement.submit();
    }
  }, []);

  return (
    <ShopLayout title="Webpay" pageDescription="Carrito de compras">
      <section className="paddings">
        <h1>Webpay de Transbank</h1>
        Pagando.....
        <form id="myForm" action={url} name="form" method="POST">
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