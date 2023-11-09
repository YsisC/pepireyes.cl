// import { useState, useMemo, useCallback, useRef } from "react";
// import {
//   GoogleMap,
//   Marker,
//   DirectionsRenderer,
//   Circle,
//   MarkerClusterer,
// } from "@react-google-maps/api";
// import Places from "./places";
// import Distance from "./distance";

// type LatLngLiteral = google.maps.LatLngLiteral;
// type DirectionsResult = google.maps.DirectionsResult;
// type MapOptions = google.maps.MapOptions;

export default function Map() {
//   const [office, setOffice] = useState<LatLngLiteral>();
//   const [directions, setDirections] = useState<DirectionsResult>();
//   const mapRef = useRef<GoogleMap>();
//   const center = useMemo<LatLngLiteral>(
//     () => ({ lat: 43.45, lng: -80.49 }),
//     []
//   );
//   const options = useMemo<MapOptions>(
//     () => ({
//       mapId: "b181cac70f27f5e6",
//       disableDefaultUI: true,
//       clickableIcons: false,
//     }),
//     []
//   );
//   const onLoad = useCallback((map) => (mapRef.current = map), []);
//   const houses = useMemo(() => generateHouses(center), [center]);

//   const fetchDirections = (house: LatLngLiteral) => {
//     if (!office) return;

//     const service = new google.maps.DirectionsService();
//     service.route(
//       {
//         origin: house,
//         destination: office,
//         travelMode: google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === "OK" && result) {
//           setDirections(result);
//         }
//       }
//     );
//   };

  return (
    <div className="container">

    </div>)
    }