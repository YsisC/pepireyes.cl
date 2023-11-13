import * as React from 'react';
import Grid from '@mui/material/Grid';
import { ShopLayout } from "../components/layouts";
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import MainFeaturedPost from '../components/about/MainFeaturedPost';
import FeaturedPost from '../components/about/FeaturedPost';
import { Typography } from '@mui/material';

const mainFeaturedPost = {
  title: 'Los mejores pepitos de santiago',
  description:
    "Disfruta con nosotros de los mejores pepitos, hamburguesas, patacones, y mas al estilo venezonalo. Te esperamos",
  image: '/products/2023-07-03 at 14.25.13.jpeg',
  imageText: 'main image description',
 
};
const featuredPosts = [
  {
    title: 'Ubicacion',
    date: 'Pepireyes Estacion Central',
    description:
      'Estamos ubicados en Ecuador 4404, Estacion Central.',
    image: '/products/logo.jpeg',
    imageLabel: 'Ubicados',
  },
  {
    title: 'Tipo de Comida',
    date: 'Comida rapida',
    description:
      'Nuestra comida tiene un autentico sabor chile-venezolano.',
    image: '/products/2023-07-03 at 14.25.14 (17).jpeg',
    imageLabel: 'Comida rapida',
  },
];





export default function About() {
  return (
 
    <ShopLayout
      title={"Pepireyes - Home"}
      pageDescription={"Encuentra los mejores productos de pepireyes aquí"}
    >

   
        
        <section className='paddings'>
        <Typography variant="h2" component="h2" sx={{marginBottom: '1rem'}}>
       Inicio / <span>Sobre Nosotros </span> 
      </Typography>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
       
        </section>
   
     
    </ShopLayout>
  );
}