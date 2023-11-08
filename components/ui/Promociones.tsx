import React, { useState } from "react";
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
import Image from "next/image";
import { disconnect } from "../../database/db";
import CloseIcon from '@mui/icons-material/Close';
type PromoProduct = {
  title: string;
  price: string;
  image: string;
  imageLabel: string;
};

const featuredPromos: PromoProduct[] = [
  {
    title: "Combo Hamburguesa",
    price: "$9900",
    image: "/products/2023-07-03 at 14.25.13.jpeg",
    imageLabel: "promo hamburguesa",
  },
  {
    title: "Combo de pepito",
    price: "$9900",
    image: "/products/2023-07-03 at 14.25.14 (5).jpeg",
    imageLabel: "promo pepito",
  },
  {
    title: "Combo de cachapa",
    price: "$9900",
    image: "/products/2023-07-03 at 14.25.12.jpeg",
    imageLabel: "promo cachapa",
  },
];
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyItems: 'center',
  flexDirection:'column',
  alignItems: 'center'
};

const Promociones = () => {
  const [selectedPromo, setSelectedPromo] = useState<PromoProduct | null>(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleImageModal = (promo: PromoProduct) => {
    setSelectedPromo(promo);
    setOpen(true);
  };
  const handleImage = (promo: PromoProduct) => {
    setSelectedPromo(promo);
   
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
          Home / <span> Promociones </span>
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
          aria-describedby={`modal-modal-${selectedPromo.imageLabel}`}
        >
          
          <Box sx={style}>
          <IconButton  sx={{position: "absolute", top:'1%', right: '3%'}} onClick={() => handleClose()}>
           <CloseIcon />  
            
           </IconButton>
           <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedPromo.title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Descripcion
            </Typography>
           
            <CardMedia
                image={`${selectedPromo.image}`}
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
                image={`${selectedPromo.image}`}
                component="img"
                sx={{ borderRadius: "5px", width: "25rem" }}
              />
            </CardActionArea>
            {/* <Image width={500} height={500} src={selectedPromo.image} alt={selectedPromo.imageLabel} /> */}
            <Typography variant="h2" component="h2">
              {selectedPromo.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {selectedPromo.price}
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Promociones;
