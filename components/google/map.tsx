
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  LoadScript,
  GoogleMap,

  StandaloneSearchBox,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./Places";
import Distance from "./Distance";
import { Clusterer } from "@react-google-maps/marker-clusterer";
import {  Libraries } from "@react-google-maps/api";

import { pepireyesApi } from "@/axiosApi";
import { Button } from "@mui/material";
import { toast } from 'react-toastify';

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
const libs = ['places'] ;
const defaultLocation = { lat: -33.45, lng: -70.69 };

export  function Map() {

  const [googleApiKey, setGoogleApiKey] = useState(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  const [office, setOffice] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  // const mapRef = useRef<GoogleMap>();
  // const [center, setCenter] = useState(defaultLocation);

  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  const generateLocation = (position: LatLngLiteral) => {
   

    setLocation({
      lat: position.lat,
      lng: position.lng,
    });
    return [location];
  };
  const onIdle = useMemo(() =>  generateLocation(center),[center]);
      

  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };
  const onPlacesChanged = () => {
 const places = placeRef.current.getPlaces();
console.log(places)
  if (places && places.length > 0) {
    const place = places[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  } else {
    console.error('No places found or places array is empty.');
  }
};

  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };
  
  // };
console.log("ofece",office)


const onConfirm = () => {
  const places = placeRef.current.getPlaces() || [{}];
  console.log(  location.lat)
  console.log(  center.lat)
  console.log(  places[0])
   console.log("addres",  places[0].formatted_address)
  console.log("name",    places[0].name,)
  console.log("googleAddresInd",     places[0].id)
  console.log("vicinity",    places[0].vicinity)
  console.log("location", location)
  console.log("default center", defaultLocation)
  const service = new google.maps.DirectionsService();
  service.route(
    {
      origin: defaultLocation,
      destination: location,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === "OK" && result) {
        setDirections(result);
      }
    }
  );

  toast.success('location selected successfully.');

};

  return (
    <div className="container">
       <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>

   
      <div className="controls">
        <h1>Commute?</h1>
        {/* <Places
          setOffice={(position) => {
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        
        /> */}
    <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <div >
              <input type="text" placeholder="Enter your address"></input>
              <Button  onClick={onConfirm}>
                Confirm
              </Button>
            </div>
          </StandaloneSearchBox>
        {/* <button onClick={() => fetchDirections(office)}>Confirmar</button> */}
        {!office && <p>Enter the address of your office.</p>}
        {directions && <Distance leg={directions.routes[0].legs[0]} />}
      </div>
      <div className="map">
        <GoogleMap
        id="pepires-map"
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          onLoad={onLoad}
          onIdle={onIdle}
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
                {(clusterer: Clusterer) =>
                <>
             <Marker position={location} onLoad={onMarkerLoad}></Marker>
                  {/* {houses?.map((house) => (
                    <Marker
                      key={house.lat}
                      position={house}
                      clusterer={clusterer}
                      onClick={() => {
                        fetchDirections(house);
                      }}
                    />
                  ))} */}
                  </>
                }
              </MarkerClusterer>

              <Circle center={office} radius={15000} options={closeOptions} />
              <Circle center={office} radius={30000} options={middleOptions} />
              <Circle center={office} radius={45000} options={farOptions} />
            </>
         
        </GoogleMap>
      </div>
      </LoadScript>
    </div>
  );
}
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

