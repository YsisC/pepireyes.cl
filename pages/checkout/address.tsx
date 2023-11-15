import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LoadScript, useLoadScript, Libraries } from "@react-google-maps/api";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

import { ShopLayout } from "../../components/layouts";
// import { countries } from "../../utils";
import { CartContext } from "../../context";
import { commune } from "@/utils";
import { Maps } from "../../components/google/Maps";
import { ShippingAddress } from "../../context/cart/CartProvider";
type LocationData = {
  lat: string | number;
  lng: string | number;
  address?: string;
  name?: string;
  vicinity?: string;
  googleAddressId?: string;

};
type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  location: LocationData; // Include location property
  city: string;
  commune: string;
  phone: string;
};

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get("firstName") || "",
    lastName: Cookies.get("lastName") || "",
    address: Cookies.get("address") || "",
    address2: Cookies.get("address2") || "",
    location: {
      lat: Cookies.get("lat") || 0,
      lng: Cookies.get("lng") || 0,
      // Add other properties as needed
    },
    city: Cookies.get("city") || "",
    commune: Cookies.get("country") || "",
    phone: Cookies.get("phone") || "",
  };
};

const AddressPage = () => {
  const router = useRouter();
  const [libraries] = useState(["places"]) as Libraries[];
  const { updateAddress } = useContext(CartContext);
  const [googleApiKey, setGoogleApiKey] = useState(
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      address2: "",
      city: "",
      commune: commune[0].code,
      phone: "",
    },
  });

  useEffect(() => {
    reset(getAddressFromCookies());
  }, [reset]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries,
  });
  const onSubmitAddress = (data: FormData) => {
    updateAddress(data);
    router.push("/checkout/summary");
  };
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
