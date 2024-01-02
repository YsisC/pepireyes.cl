import React, { useState, useEffect, useRef } from "react";

import Slider from "@ant-design/react-slick";
import Image from "next/image";
import { useProducts } from "@/hooks";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Card,
  Box,
  Button,
  Typography,
  CardActionArea,
  Chip,
  CardMedia,
} from "@mui/material";

import style from "./Carrousel.module.css";
import Link from "next/link";

const Carrousel = () => {
  const { products, isLoading } = useProducts("/products");

  const newProducts = products.slice(0, 10);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

  return (
<>

    <div className={` ${style.wrapper}`}>
   <div className={`${style.menu_header}`}>
        <Typography  variant="h2" component="h2" color={"GrayText"}>
          NUESTRO <span> NUEVOS PRODUCTOS </span>
        </Typography>
        <Button href="/menu" variant='outlined' color="secondary" sx={{ fontSize: 'large'}}>
          VER TODO
        </Button>
      </div>
      <div className={`${style.carousel}`}>
        <Slider {...settings}>
          {products &&
            newProducts.map((product, index) => (
              <Card key={index} className={`${style.card}`}>
                <Link href={`/product/${product.slug}`} prefetch={false}>
                  <CardActionArea>
                    {product.inStock === 0 && (
                      <Chip
                        color="primary"
                        label="No hay disponibles"
                        sx={{
                          position: "absolute",
                          zIndex: 99,
                          top: "10px",
                          left: "10px",
                        }}
                      />
                    )}

                    <CardMedia
                      component="img"
                      sx={{ height: { xs: "9rem", md: "14rem" } }}
                     
                      src={product.images[0]}
                      alt={product.title}
                    />
                  </CardActionArea>

                    </Link>
                  <Box sx={{ m: 1, background: "inherit", color: "white" }} className="fadeIn">
                    <Typography fontWeight={700}>{product.title}</Typography>
                    <Typography
                      fontWeight={500}
                    >{`$${product.price}`}</Typography>
                  </Box>
              </Card>
            ))}
        </Slider>
      </div>
    
    </div>
</>
  );
};

export default Carrousel;
