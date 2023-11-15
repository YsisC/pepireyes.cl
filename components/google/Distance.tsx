import { FC, useEffect, useState, useContext } from 'react';
import { currency } from "@/utils";
import Cookies from "js-cookie";
import { Card, CardContent, Chip, Divider, Typography } from "@mui/material";
import { CartContext } from "@/context";
import { Box } from "@mui/system";



type Props = {
  leg: google.maps.DirectionsLeg;
};

export const Distance:FC<Props> =({ leg }) => {
  const [costShipping, setCostShipping] = useState<number | null>(null);
  const {  numberOfItems,  } = useContext(CartContext);
  if (!leg.distance || !leg.duration) return null;

  const addresShipping = Cookies.get("address") || "";
  const cityShipping = Cookies.get("city") || "";
  const communeShipping = Cookies.get("commune") || "";
  const calculateDelivery = leg.distance.value*1
  const deliveryFormat = currency.redond(calculateDelivery)
console.log("addres", addresShipping)
  const sendCostToCookies = (cost: number) => {
    Cookies.set("cost", cost.toString() );
  };

  useEffect(() => {
    try {
   
      setCostShipping(Number(calculateDelivery));
      sendCostToCookies(Number(calculateDelivery));
    } catch (error) {
      // Handle calculation errors, e.g., log the error or provide a fallback value
      console.error("Error calculating cost:", error);
    }
  }, []);


  return (
    <div>
<Chip
color="success"
variant="outlined"
label={"Envio: "+ deliveryFormat}
sx={{  mb: 2 }}
 />
 <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({numberOfItems}{" "}
                {numberOfItems === 1 ? "producto" : "productos"})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
              </Box>

              <Typography>{addresShipping} </Typography>

              <Typography>
                  {cityShipping}
                </Typography>
                <Typography>{communeShipping}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end"></Box>

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column"></Box>
            </CardContent>
          </Card>
    </div>
  );
}