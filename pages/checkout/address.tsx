import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LoadScript, useLoadScript, Libraries } from "@react-google-maps/api";

import Cookies from "js-cookie";


import { ShopLayout } from "../../components/layouts";
// import { countries } from "../../utils";
import { CartContext } from "../../context";
import { commune } from "@/utils";
import { Maps } from "../../components/google/Maps";
import { ShippingAddress } from "../../context/cart/CartProvider";



const AddressPage = () => {
  const router = useRouter();
  const [libraries] = useState(["places"]) as Libraries[];
 
  const [googleApiKey, setGoogleApiKey] = useState(
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  );



  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <ShopLayout
      title="Dirección"
      pageDescription="Confirmar dirección del destino"
    >
      <section className="paddings">
       

      
          <Maps />
       


      </section>
    </ShopLayout>
  );
};



export default AddressPage;
