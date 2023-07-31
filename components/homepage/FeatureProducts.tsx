import React from "react";
import styles from "./FeatureProducts.module.css";
import { Button, CardMedia, Typography } from "@mui/material";

const FeatureProducts = () => {
  return (
    <section className={`paddings ${styles.wrapper}`}>
      <div className={styles.menu_header}>
        <Typography variant="h2" component="h2" color={"GrayText"}>
          NUESTRO MENU
        </Typography>
        <Button color="secondary" className="circular-btn-second">
          Ver todo
        </Button>
      </div>
      <div className={styles.item_container}>
        {/* item 1  */}
        <div className={`${styles.item} group`}>
          {/* <!-- image --> */}
          <CardMedia
            component="img"
            image="/products/2023-07-03 at 14.25.13.jpeg"
            className="feature_img"
            alt="Hamburguesa"
          />

          {/* <!-- Item gradient --> */}
          <div className={styles.item_gradient}></div>
          {/* <!-- Item text --> */}
          <h5>Hamburguesa</h5>
        </div>
         {/* item 2  */}
        <div className={`${styles.item} group`}>
          {/* <!-- image --> */}
          <CardMedia
            component="img"
            image="/products/2023-07-03 at 14.25.14 (2).jpeg"
            className="feature_img"
            alt="Parrillas"
          />

          {/* <!-- Item gradient --> */}
          <div className={styles.item_gradient}></div>
          {/* <!-- Item text --> */}
          <h5>Parrillas</h5>
        </div>
         {/* item 3  */}
        <div className={`${styles.item} group`}>
          {/* <!-- image --> */}
          <CardMedia
            component="img"
            image="/products/2023-07-03 at 14.25.14 (6).jpeg"
            className="feature_img"
            alt="Pepitos"
          />

          {/* <!-- Item gradient --> */}
          <div className={styles.item_gradient}></div>
          {/* <!-- Item text --> */}
          <h5>Pepitos</h5>
        </div>
        <div className={`${styles.item} group`}>
          {/* <!-- image --> */}
          <CardMedia
            component="img"
            image="/products/2023-07-03 at 14.25.14 (8).jpeg"
            className="feature_img"
            alt="bebidas"
          />

          {/* <!-- Item gradient --> */}
          <div className={styles.item_gradient}></div>
          {/* <!-- Item text --> */}
          <h5>bebidas</h5>
        </div>
      </div>
    </section>
  );
};

export default FeatureProducts;
