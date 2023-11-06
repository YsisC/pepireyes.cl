import React from "react";
import { ShopLayout } from "../../components/layouts";

const WebpayPage = () => {
  return (
    <ShopLayout title="Webpay" pageDescription="Carrito de compras">
      <section className="paddings">
        <h1>Webpay</h1>
        <ul>
          <li>Producto: Hamburguesa</li>
          <li>Valor: $10.000</li>
          <li>Cantidad: 1</li>
          <li>Orden de compra: 325451</li>
        </ul>
        <a href="/webpay/pay">Pagar</a>
      </section>
    </ShopLayout>
  );
};

export default WebpayPage;
