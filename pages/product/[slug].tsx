import { useState, useContext, useEffect } from "react";
import {
  NextPage,
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
} from "next";
import { useRouter } from "next/router";

import { Box, Button, Chip, Grid, Typography } from "@mui/material";

import { CartContext } from "../../context/cart/CartContext";

import { ShopLayout } from "../../components/layouts";
import { ProductSlideshow, SizeSelector } from "../../components/products";

import { ItemCounter } from "../../components/ui/ItemCounter";

import { dbProducts } from "../../database";
import { ICartProduct, IProduct, ISize } from "../../interfaces";
import { useOpenLocal } from "@/hooks/useOpenLocal";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { addProductToCart } = useContext(CartContext);
  const { openLocal, verificarEstadoDeTienda } = useOpenLocal();
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: product.size,
    slug: product.slug,
    title: product.title,
    type: product.type,
    quantity: 1,
  });

  useEffect(() => {
    console.log("images", product.images)
    const updatedState = () => {
      const isOpen = verificarEstadoDeTienda();
      console.log(isOpen);
    };
    updatedState();

    console.log("local abierto", openLocal);
  }, [openLocal, verificarEstadoDeTienda]);

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };

  const onAddProduct = () => {
    console.log("EL PRODUCTO AGREGADO", tempCartProduct);
    if (!tempCartProduct.size) {
      return;
    }

    addProductToCart(tempCartProduct);
    router.push('/cart')
  };

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }));
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <section className="paddings">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7}>
            <ProductSlideshow images={product.images} />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Box display="flex" flexDirection="column">
              {/* titulos */}
              <Typography variant="h1" component="h1">
                {product.title}
              </Typography>
              <Typography
                variant="subtitle1"
                component="h2"
              >{`$${product.price}`}</Typography>

              {/* Cantidad */}
              <Box sx={{ my: 2 }}>
                <Typography variant="subtitle2">Cantidad</Typography>
                <ItemCounter
                  currentValue={tempCartProduct.quantity}
                  updatedQuantity={onUpdateQuantity}
                  maxValue={product.inStock > 10 ? 10 : product.inStock}
                />
                <SizeSelector
                  size={product.size}
                  // selectedSize={tempCartProduct.size}
                  onSelectedSize={onSelectedSize}
                />
              </Box>

              {/* Agregar al carrito */}

              {openLocal ? (
                product.inStock > 0 ? (
                  <Button
                    color="secondary"
                    className="circular-btn"
                    onClick={onAddProduct}
                  >
                    Agregar al carrito
                  </Button>
                ) : (
                  <Chip
                    label="No hay disponibles"
                    color="error"
                    variant="outlined"
                  />
                )
              ) : (
                <Chip label="Tienda cerrada" color="error" className="fadeIn" />
              )}
              {/* Descripción */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2">Descripción</Typography>
                <Typography variant="body2">{product.description}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </section>
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
