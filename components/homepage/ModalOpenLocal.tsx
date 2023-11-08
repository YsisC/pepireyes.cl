import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CardMedia, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { FC } from "react";
import CloseIcon from '@mui/icons-material/Close';

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
interface Props {
    open?: boolean;
    handleOpen?: () => void;
    handleClose: () => void;
  }
const ModalOpenLocal: FC<Props> = ({open ,handleOpen, handleClose}) => {
const openM = open
 
    return (
      <div>
     { typeof open === 'boolean' && (
   <Modal
   open={open}
   onClose={handleClose}
   aria-labelledby="modal-modal-openLocal"
   aria-describedby="modal-modal-horario"
 >
   <Box sx={style}>
   <IconButton  sx={{position: "absolute", top:'1%', right: '3%'}} onClick={() => handleClose()}>
    <CloseIcon />  
     
    </IconButton>
     <Typography id="modal-modal-openLocal" variant="h6" component="h2">
       Local Cerrado
     </Typography>
     <CardMedia 
      component="img"
      sx={{ width: 100,  height:100, padding:'0.5rem', borderRadius:'50%', display:  'block'  }}
      image='/products/logo.jpeg' 
      alt='logo' />
     <Typography id="modal-modal-horario" sx={{ mt: 2 }}>
      Los horarios de atencion para delivery son:
     </Typography>
     <List>
   <ListItem disablePadding>
     <ListItemButton>
       <ListItemText primary="Lunes a viernes: 15:00 a 23:59" />
     </ListItemButton>
   </ListItem>
   <ListItem disablePadding>
     <ListItemButton component="a" href="#simple-list">
       <ListItemText primary="Sabados y Domingos: 15:00 a 23:59" />
     </ListItemButton>
   </ListItem>
 </List>
   </Box>
 </Modal>
     )}
     
      </div>
    );
  }

export default ModalOpenLocal