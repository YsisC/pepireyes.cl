import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import FeaturedPromo from "./FeaturePromo";
import styles from "./Promociones.module.css";

import CloseIcon from "@mui/icons-material/Close";

import { CartContext } from "@/context";
import { ICartProduct, IProduct, IType } from "@/interfaces";




type PromoProduct = {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  slug: string;
  size: string;
  title: string;
  type: IType;
};
interface Props {
  products: IProduct[];
}


// Modal style
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyItems: "center",
  flexDirection: "column",
  alignItems: "center",
};

const Promociones = ({products}:Props ) => {

// console.log(typeof products)
// console.log( products[0])
  // const { products, isLoading } = useProducts("/products");
  const promoProduct = (category: string) => {
    return products.filter((product) => product.type === category);
  };
  const featuredPromos: IProduct[] = promoProduct("combo");

  const [selectedPromo, setSelectedPromo] = useState<PromoProduct >(featuredPromos[0]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const { addProductToCart } = useContext(CartContext);
 

  const handleImageModal = (promo: PromoProduct) => {
    setSelectedPromo(promo);
    setOpen(true);
  };
  const handleImage = (promo: PromoProduct) => {
    setSelectedPromo(promo);
  };
  const onAddProduct = async () => {

      const tempCartProduct ={
        _id: selectedPromo!._id,
        image: selectedPromo!.images[0],
        price: selectedPromo!.price,
        size: selectedPromo!.size,
        slug: selectedPromo!.slug,
        title: selectedPromo!.title,
        type: selectedPromo!.type,
        quantity: 1,
      };
      console.log("EL PRODUCTO AGREGADO", tempCartProduct);
      if (!tempCartProduct) {
        return;
      }
     
  
  
    try {
      if (tempCartProduct !== undefined){
        addProductToCart(tempCartProduct);
 
      }
     } catch (error) {
       console.error(error);
     }

  };
  return (
    <Grid container className={`paddings ${styles.wrapper}`}>
      <Grid
        item
        xs={12}
        sm={5.9}
        sx={{
          // width: 500,
          overflowX: "hidden",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: 10,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "black",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "orange",
            borderRadius: 2,
          },
        }}
      >
        <Typography variant="h2" component={"h2"}>
          Inicio / <span> Promociones </span>
        </Typography>
        {featuredPromos.map((post) => (
          <FeaturedPromo
            key={post.title}
            post={post}
            handleImage={handleImage}
            handleImageModal={handleImageModal}
          />
        ))}
      </Grid>
      {selectedPromo && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby={`modal-modal-${selectedPromo.title}`}
          aria-describedby={`modal-modal-${selectedPromo.slug}`}
        >
          <Box sx={style}>
            <IconButton
              sx={{ position: "absolute", top: "1%", right: "3%" }}
              onClick={() => handleClose()}
            >
              <CloseIcon />
            </IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedPromo.title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Descripcion
            </Typography>

            <CardMedia
              image={`${selectedPromo.images[0]}`}
              component="img"
              sx={{ borderRadius: "5px", width: "21rem" }}
            />
            <Typography variant="subtitle1" color="text.secondary">
              {selectedPromo.price}
            </Typography>
          </Box>
        </Modal>
      )}
      <Grid
        item
        sx={{
          display: { xs: "none", sm: "grid" },
          alignItems: "center",
          justifyItems: "center",
          padding: "0.4rem",
        }}
        xs={12}
        sm={6}
      >
        {selectedPromo && (
          <Box>
            <CardActionArea>
              <CardMedia
                image={`${selectedPromo.images[0]}`}
                component="img"
                sx={{ borderRadius: "5px", width: "25rem" , height:'27rem', objectFit:'cover'}}
              />
            </CardActionArea>
            {/* <Image width={500} height={500} src={selectedPromo.image} alt={selectedPromo.imageLabel} /> */}
          <Box sx={{ width: "25rem"}}>
          <Typography variant="h2" component="h2">
              {selectedPromo.title}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {selectedPromo.description}
            </Typography>
            
            </Box> 
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
               
              }}
            >
              <Typography variant="subtitle1" color="text.secondary">
                {selectedPromo.price}
              </Typography>
              <Button onClick={onAddProduct} color="secondary">
                Agregar al carrito
              </Button>{" "}
            </Box>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};



export default Promociones;
