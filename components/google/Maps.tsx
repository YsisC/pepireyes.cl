import {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  FC,
  useContext,
} from "react";
import {
  LoadScript,
  GoogleMap,
  Libraries,
  StandaloneSearchBox,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Cookies from "js-cookie";
import { Distance } from "./Distance";
import { Clusterer } from "@react-google-maps/marker-clusterer";
import { pepireyesApi } from "@/axiosApi";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "@/context";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Location } from '../../context/cart/CartProvider';
type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;

  city: string;
  commune: string;
  phone: string;
};
const defaultLocation = { lat: -33.45, lng: -70.69 };

export const Maps: FC = () => {
  const [office, setOffice] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const { saveLocation } = useContext(CartContext);
  const [center, setCenter] = useState(defaultLocation);
  const [locationCustomer, setLocationCustomer] = useState(center);

  const mapRef = useRef<any>(null);
  const placeRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  const generateLocation = (position: LatLngLiteral) => {
    setLocationCustomer({
      lat: position.lat,
      lng: position.lng,
    });
    return [locationCustomer];
  };

  const onLoadPlaces = (place: google.maps.places.SearchBox) => {
    placeRef.current = place;
  };
  const onPlacesChanged = () => {
    const places = placeRef.current?.getPlaces(); // Use optional chaining here
    console.log(places);
    if (places && places.length > 0) {
      const place = places[0].geometry.location;
      // setCenter({ lat: place.lat(), lng: place.lng() });
      setLocationCustomer({ lat: place.lat(), lng: place.lng() });
    } else {
      console.error("No places found or places array is empty.");
    }
  };

  const onMarkerLoad = (marker: google.maps.Marker) => {
    markerRef.current = marker;
  };

  // };
  console.log("location customer", locationCustomer);
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "3cabc2a4a2b5cedf",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onConfirm = () => {
    const places = placeRef.current?.getPlaces() || [{}];

    saveLocation(locationCustomer, places);

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: defaultLocation,
        destination: locationCustomer,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
    const notify = () => toast("Locacion seleccionada.");
    notify();
  };
  const router = useRouter();

  const { updateAddress, numberOfItems, location } = useContext(CartContext);
console.log("show location",location)
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
      commune: "",
      phone: "",
    },
  });
  const getAddressFromCookies = (): FormData => {
    return {
      firstName: Cookies.get("firstName") || "",
      lastName: Cookies.get("lastName") || "",
      address: Cookies.get("address") || "",
      address2: Cookies.get("address2") || "",
      city: Cookies.get("city") || "",
      commune: Cookies.get("commune") || "",
      phone: Cookies.get("phone") || "",
    };
  };

  useEffect(() => {
    reset(getAddressFromCookies());
  }, [reset]);

  const addresShipping = Cookies.get("address") || "";
  const cityShipping = Cookies.get("city") || "";
  const communeShipping = Cookies.get("commune") || "";

  const onSubmitAddress = (data: FormData) => {
    updateAddress(data);
    router.push("/checkout/summary");
  };
  return (
    <div className="container">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmitAddress)}>
        <Typography variant="h1" component="h1">
          Dirección
        </Typography>
        <Typography variant="h2" component="h2">
          Direccion:
        </Typography>
        <Grid item xs={12} sm={6}>
          <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <>
              <div className="input-field">
                <label htmlFor="address">Direccion</label>
                <input type="text" placeholder="Enter your address" />
              </div>
              <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
                <Button
                  type="button"
                  color="secondary"
                  className="circular-btn"
                  size="large"
                  onClick={() => onConfirm()}
                >
                  Confirmar
                </Button>
              </Box>
            </>
          </StandaloneSearchBox>

          {directions && <Distance leg={directions.routes[0].legs[0]} />}
        </Grid>
        <Typography variant="h2" component="h2">
          Datos personales:
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="filled"
              fullWidth
              {...register("firstName", {
                required: "Este campo es requerido",
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              variant="filled"
              fullWidth
              {...register("lastName", {
                required: "Este campo es requerido",
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Teléfono"
              variant="filled"
              fullWidth
              {...register("phone", {
                required: "Este campo es requerido",
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>

          
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Revisar pedido
          </Button>
        </Box>
      </form>
      <div className="controls"></div>
      <div className="map">
        <GoogleMap
          id="pepires-map"
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          onLoad={onLoad}
          options={options}
          // onIdle={onIdle}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}

          <>
            <MarkerClusterer>
              {(clusterer: Clusterer) => (
                <>
                  <Marker position={locationCustomer} onLoad={onMarkerLoad}></Marker>
                </>
              )}
            </MarkerClusterer>

            <Circle center={locationCustomer} radius={1500} options={closeOptions} />
            <Circle center={locationCustomer} radius={3000} options={middleOptions} />
            <Circle center={locationCustomer} radius={55000} options={farOptions} />
          </>
        </GoogleMap>
      </div>
    </div>
  );
};
const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};
