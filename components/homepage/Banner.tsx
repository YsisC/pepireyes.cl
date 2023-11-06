import * as React from "react";
import Box from "@mui/material/Box";
import { CardMedia, Container, Typography } from "@mui/material";
import styles from "./Banner.module.css";
import Image from "next/image";

export default function Banner() {
  return (
    <section className={`paddings ${styles.wrapper} `}>
      <Typography variant="h2" component="h2" color={"GrayText"}>
          NUESTRA <span>  TRAYECTORIA </span>
        </Typography>
      <div className={`innerWidth  ${styles.container}`}>
        <CardMedia component={'img'} src="/img/tienda.jpeg"  className={styles.img_banner} alt="Tienda"></CardMedia>
        <div className={styles.bannerText}>
          <Typography variant="h3" component="h3" color={"GrayText"}>
            Pepireyes
          </Typography>
          ;
          <Typography variant="h5" component="h5" color={"GrayText"}>
          En Pepireyes, trabajamos desde hace 3 años para fusionar la riqueza de sabores de Venezuela con la calidez de Chile. Cada sabor que ofrecemos es una muestra de nuestro cariño por la tradición culinaria y el aprecio inmenso por nuestros comensales, quienes se convierten en amigos y comparten nuestra misma pasión por la gastronomía venezolana.
          </Typography>
          ;
        </div>
      </div>
    </section>
  );
}
