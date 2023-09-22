import React, { useState } from 'react';
import { Box, CardActionArea, CardMedia, Grid, Typography } from "@mui/material";
import FeaturedPromo from "./FeaturePromo";
import styles from "./Promociones.module.css";
import Image from 'next/image';
import { disconnect } from '../../database/db';

type PromoProduct = {
  title: string,
  price: string,
  image: string,
  imageLabel: string,
};

const featuredPromos: PromoProduct[] = [
  {
    title: 'Combo Hamburguesa',
    price: '$9900',
    image: '/products/2023-07-03 at 14.25.13.jpeg',
    imageLabel: 'promo hamburguesa',
  },
  {
    title: 'Combo de pepito',
    price: '$9900',
    image: '/products/2023-07-03 at 14.25.14 (5).jpeg',
    imageLabel: 'promo pepito',
  },
  {
    title: 'Combo de cachapa',
    price: '$9900',
    image: '/products/2023-07-03 at 14.25.12.jpeg',
    imageLabel: 'promo cachapa',
  },
];

const Promociones = () => {
  const [selectedPromo, setSelectedPromo] = useState<PromoProduct | null>(null);

  const handleImageClick = (promo: PromoProduct) => {
    setSelectedPromo(promo);
  };

  return (
   
     <Grid container   className={`paddings ${styles.wrapper}`}>
     <Grid item xs={12} sm={6} sx={{  width: 500  , overflowX: 'hidden', overflowY:'scroll',
      "&::-webkit-scrollbar": {
        width: 10
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "black"
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "orange",
        borderRadius: 2
      }}}>
        <Typography variant="h2" component={'h2'} >Home / <span > Promociones </span></Typography>
        {featuredPromos.map((post) => (
          <FeaturedPromo key={post.title} post={post} handleImage={handleImageClick} />
        ))}
      </Grid>
      {selectedPromo && (
      <Grid item xs={ 12 } sm={ 7 } sx={{
         height: '80vh' ,
        padding:'1rem', display:'flex', 
        justifyContent:'center',
         alignItems:'center', 
         flexDirection:'column'}}
      >
   


<div>

            <CardActionArea>
                                        <CardMedia 
                                            image={ `${selectedPromo.image}` }
                                            component='img'
                                            sx={{ borderRadius: '5px', width:'25rem' }}
                                        />
                                    </CardActionArea>
            {/* <Image width={500} height={500} src={selectedPromo.image} alt={selectedPromo.imageLabel} /> */}
            <Typography variant="h2" component="h2">
              {selectedPromo.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {selectedPromo.price}
            </Typography>
           
              
</div>
      </Grid>
        )}
    </Grid>
  )
}

export default Promociones;
