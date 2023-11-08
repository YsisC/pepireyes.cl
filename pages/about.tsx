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
    "Disdruta con nosotros de los mejores pepitos, hamburguesas, patacones, y mas con el estilo venezonalo. Te esperamos",
  image: '/products/2023-07-03 at 14.25.14 (17).jpeg',
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


const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  events: [
    { title: 'Dia de la madre 2023', url: '#' },
    { title: 'Dia del niño 2023', url: '#' },
    { title: 'Dia del padre 2023', url: '#' },

  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};



export default function About() {
  return (
 
    <ShopLayout
      title={"Pepireyes - Home"}
      pageDescription={"Encuentra los mejores productos de pepireyes aquí"}
    >

   
        
        <section className='paddings'>
        <Typography variant="h2" component="h2" sx={{marginBottom: '1rem'}}>
       Home / <span>Sobre Nosotros </span> 
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