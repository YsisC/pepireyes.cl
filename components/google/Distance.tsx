import React, { FC, useEffect, useState, useContext } from "react";
import { currency } from "@/utils";
import Cookies from "js-cookie";
import { Card, CardContent, Chip, Divider, Typography } from "@mui/material";
import { CartContext } from "@/context";
import { Box } from "@mui/system";
import { FullScreenLoading } from "../ui";

type Props = {
  leg: google.maps.DirectionsLeg;
};

export const Distance: FC<Props> = ({ leg }) => {

  const { numberOfItems, delivery } = useContext(CartContext);

  const addressShipping = Cookies.get("address") || "";
  const cityShipping = Cookies.get("city") || "";
  const communeShipping = Cookies.get("commune") || "";

  if (!leg.distance || !leg.duration) {
    return <FullScreenLoading />;
  }



console.log("delivery", delivery)

  return (
    <div>
      <Chip
        color="success"
        variant="outlined"
        label={"Envío: " + delivery}
        sx={{ mb: 2 }}
      />
      <Card className="summary-card">
        <CardContent>
          <Typography variant="h2">
            Resumen ({numberOfItems}{" "}
            {numberOfItems === 1 ? "producto" : "productos"})
          </Typography>
          <Divider sx={{ my: 1 }} />

          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Dirección de entrega</Typography>
          </Box>

          <Typography>{addressShipping} </Typography>

          <Typography>{cityShipping}</Typography>
          <Typography>{communeShipping}</Typography>

          <Divider sx={{ my: 1 }} />

          {/* Additional components, if needed */}
        </CardContent>
      </Card>
    </div>
  );
};
