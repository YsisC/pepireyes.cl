import React from "react";
import styles from "./FeatureProducts.module.css";
import { Button, CardMedia, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import { useRouter } from "next/router";
import { FC } from "react";
import Link from "next/link";

const FeatureProducts: FC = () => {
  const router = useRouter();
  return (
    <section className={`paddings ${styles.wrapper}`}>
      <div className={styles.menu_header}>
        <Typography variant="h2" component="h2" color={"GrayText"}>
          NUESTRO <span> MENU </span>
        </Typography>
        <Button href="/menu" color="secondary" className="circular-btn-second">
          VER TODO
        </Button>
      </div>
      <div className={styles.item_container}>
        {/* item 1  */}
        <motion.div
         variants={fadeIn("right", "tween", (1 + 1) * 0.2, 1)}
          initial="initial"
          animate="show"
          className={`${styles.item} group`}
        >
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
        </motion.div>
        {/* item 2  */}
        <motion.div
          variants={fadeIn("right", "tween", (2 + 1) * 0.2, 1)}
          className={`${styles.item} group`}
        >
          {/* <!-- image --> */}
          <Link href={"/category/parrillas"} passHref>
         
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
          </Link>
        </motion.div>
        {/* item 3  */}
        <motion.div
          variants={fadeIn("up", "tween", 0.7, 0.6)}
          className={`${styles.item} group`}
        >
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
        </motion.div>
        {/* item 3  */}
        <motion.div
          variants={fadeIn("up", "tween", 0.8, 0.7)}
          className={`${styles.item} group`}
        >
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
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureProducts;
