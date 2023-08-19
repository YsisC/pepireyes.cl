import { Container, Grid, Typography } from "@mui/material"
import FeaturedPost from "../about/FeaturedPost";
import FeaturedPromo from "./FeaturePromo";
import styles from "./Promociones.module.css";

const featuredPromos = [
    {
      title: 'Combo Hamburguesa',
      price: '$9900',
      image: '/img/tienda.jpeg',
      imageLabel: 'promo hamburguesa',
    },
    {
      title: 'Combo de pepito',
      price: '$9900',
      image: '/products/2023-07-03 at 14.25.14 (17).jpeg',
      imageLabel: 'promo pepito',
    },
  ];
  
const Promociones = () => {
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
        <Typography variant="h2" component={'h2'}>Home / <span > Promociones </span></Typography>
        {featuredPromos.map((post) => (
              <FeaturedPromo key={post.title} post={post} />
            ))}
        </Grid>
        <Grid item xs={12}  sm={6} >

        </Grid>
     </Grid>
   


  )
}

export default Promociones