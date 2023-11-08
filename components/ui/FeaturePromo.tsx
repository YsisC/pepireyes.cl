"use client";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, TabScrollButton } from '@mui/material';
import handler from '../../pages/api/hello';
interface FeaturedPostProps {
  post: {
    price: string;
    image: string;
    imageLabel: string;
    title: string;
  };
  

  handleImage: (product: any) => void;
  handleImageModal: (product: any) => void;
}

export default function FeaturedPromo(props: FeaturedPostProps) {
  const { post, handleImage,  handleImageModal} = props;

  return (
    <>
   {/* Destock */}
    <Grid
     sx={{width:'100%', 
     marginBottom: '1rem', marginRight: '1rem',
      display: { xs: "none", sm: "grid" }
    }}
    onClick={() => handleImage(post)} item  >
     
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 , paddingLeft:{xs:'0rem', md:'16px'}}}>
            <Typography component="h2" variant="h2">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.price}
            </Typography>
         
         
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, height:200, display:  'block'  }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
{/* Mobile */}
    <Grid
     sx={{width:'100%', 
     marginBottom: '1rem', marginRight: '1rem',
      display: { xs: "grid", sm: "none" }
    }}
    onClick={() => handleImageModal(post)} item  >
     
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 , paddingLeft:{xs:'0rem', md:'16px'}}}>
            <Typography component="h2" variant="h2">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.price}
            </Typography>
         
         
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, height:200, display:  'block'  }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
    </>
  );
}
