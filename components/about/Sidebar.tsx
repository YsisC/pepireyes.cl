import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

interface SidebarProps {
  events: ReadonlyArray<{
    url: string;
    title: string;
  }>;
  description: string;

  title: string;
}

export default function Sidebar(props: SidebarProps) {
  const { events, description,  title } = props;

  return (
    <Grid item xs={12} md={4}>
      
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Eventos
      </Typography>
      {events.map((event) => (
        <Link display="block" sx={{color: 'inherit'}} href={event.url} key={event.title}>
          {event.title}
        </Link>
      ))}
     
     

    </Grid>
  );
}
