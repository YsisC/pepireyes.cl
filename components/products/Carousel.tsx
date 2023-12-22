import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { IconButton, Slide, Stack, Card } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useProducts } from "@/hooks";
import { ProductCard } from "./ProductCard";
import ProductNewCard from "./ProductNewCard";
import Link from "next/link";

const Carousel = () => {
  const [cards, setCards] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    "right" | "left" | undefined
  >("left");
  const cardsPerPage = 4;
  const duplicateCards: React.ReactElement[] = Array.from(
    { length: 10 },
    (_, i) => <Card key={i} />
  );
  const { products, isLoading } = useProducts("/products");

  const newProducts = products.slice(0, 10);
  const handleNextPage = () => {
    setSlideDirection("left");
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setSlideDirection("right");
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <section className={`paddings `}>
      <div className="flex-beetween">
      <Typography variant="h2" component="h2" color={"GrayText"}>
          NUESTRO <span> NUEVOS PRODUCTOS </span>
        </Typography>
        <Button
          href="/menu"
          variant="outlined"
          color="secondary"
          sx={{ fontSize: "large" }}
        >
          VER TODO
        </Button>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          width: "100vw",
          height: "400px",
        }}
      >
        <IconButton
          onClick={handlePrevPage}
          sx={{
            margin: 5,
          }}
          disabled={currentPage === 0}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            height: "400px",
          }}
        >
          {products &&
            newProducts.map((card, index) => (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: currentPage === index ? "block" : "none",
                }}
              >
                <Slide direction={slideDirection} in={currentPage === index}>
                  <Stack
                    spacing={2}
                    direction={"row"}
                    alignContent={"center"}
                    justifyContent={"center"}
                  >
                    {newProducts
                      .slice(
                        index * cardsPerPage,
                        index * cardsPerPage + cardsPerPage
                      )
                      .map((product, i) => (
                        <Card key={product.slug}>
                          <Link
                            href={`/product/${product.slug}`}
                            prefetch={false}
                          >
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
                                sx={{
                                  height: { xs: "17rem", md: "22rem" },
                                  width: { xs: "17rem", md: "22rem" },
                                }}
                                className="fadeIn imageWrapper"
                                image={product.images[0]}
                                alt={product.title}
                              />
                            </CardActionArea>
                          </Link>

                          <Box sx={{ mt: 1 }} className="fadeIn">
                            <Typography fontWeight={700}>
                              {product.title}
                            </Typography>
                            <Typography
                              fontWeight={500}
                            >{`$${product.price}`}</Typography>
                          </Box>
                        </Card>
                      ))}
                  </Stack>
                </Slide>
              </Box>
            ))}
        </Box>
        <IconButton
          onClick={handleNextPage}
          sx={{
            margin: 5,
          }}
          disabled={
            currentPage >=
            Math.ceil((newProducts.length || 0) / cardsPerPage) - 1
          }
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </section>
  );
};

export default Carousel;
