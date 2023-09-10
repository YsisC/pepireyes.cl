"use client";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { TabScrollButton } from '@mui/material';
import handler from '../../pages/api/hello';
interface FeaturedPostProps {
  post: {
    price: string;
    image: string;
    imageLabel: string;
    title: string;
  };
  

  handleImage: (product: any) => void
}

export default function FeaturedPromo(props: FeaturedPostProps) {
  const { post, handleImage } = props;

  return (
    <Grid onClick={() => handleImage(post)} item sx={{width:'100%', 
    marginBottom: '1rem', marginRight: '1rem'
    }} >
      <CardActionArea  component="a" href="#">
        <Card sx={{ display: 'flex', border: '1px solid #ec9b3d;' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2"  sx={{ fontSize:'18px' }} variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.price}
            </Typography>
           
         
          </CardContent>
          <CardMedia
            component="img"
            // sx={{ width: 160, height:200, display: { xs: 'none', sm: 'block' } }}
            sx={{ width: 160, height:200, display:  'block'  }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
