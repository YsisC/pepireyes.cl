import * as React from "react";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import styles from "./Banner.module.css";

export default function Banner() {
  return (
    <section className={`paddings ${styles.wrapper} `}>
      <div className={styles.container}>
        <img src="/img/tienda.jpeg" alt="Tienda"></img>
        <div className={styles.bannerText}>
          <Typography variant="h2" component="h2" color={"GrayText"}>
            Pepireyes
          </Typography>
          ;
          <Typography variant="h5" component="h5" color={"GrayText"}>
            Fundada en 2020, Pepireyes la mejor comida rapida
          </Typography>
          ;
        </div>
      </div>
    </section>
  );
}
