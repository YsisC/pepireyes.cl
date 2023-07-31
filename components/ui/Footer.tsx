import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import icon from "../../public/icon.svg";
import Image from "next/image";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import styles from './Footer.module.css';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Pepireyes.cl
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

interface FooterProps {
  description: string;
  title: string;
}

export default function Footer<FooterProps>() {
  return (
    <Box component="footer" width='max' sx={{ bgcolor: "black", py: 6 }}>
    <Container maxWidth="lg">
    <Grid container spacing={5}>

   

    <Grid item xs={12} sm={4}>
            <figure>
              <a href="#">
                <Image src={icon} width={210} alt="Pepireyes follow us" />
              </a>
            </figure>
            </Grid>


            <Grid item xs={12} sm={4}>
            <Typography variant="h2" sx={{marginBottom:'20px' }}>
              Sobre Nosotros
            </Typography>
           <p>
              Tienda de comida rapida
            </p>
            <p>
              Lorems indfsksfd akjfknkgn dsmfisej
            </p>
            </Grid>
          <Grid item xs={12} sm={4}>

         
            <Typography variant="h2"  sx={{marginBottom:'20px' }}>
              SIGUENOS
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
             <FacebookIcon color="primary"  className={styles.svg}/>
             </Link>
             <Link href="https://www.facebook.com/" color="inherit" marginLeft={1}>
              <InstagramIcon color="primary"/>
              </Link>
              <Link href="https://www.twitter.com/" color="inherit" marginLeft={1}>
                <TwitterIcon color="primary"/>  
                 </Link>
             
             
              </Grid>
          </Grid>
          <Box mt={5}>
              <Copyright />
            </Box>
      
       </Container>
    </Box>
  );
}
