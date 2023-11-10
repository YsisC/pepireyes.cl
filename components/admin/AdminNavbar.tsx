import { useContext } from 'react';
import Link from '../../themeMUI/Link'


import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';


import { UiContext } from '../../context';
import SegmentIcon from '@mui/icons-material/Segment';

export const AdminNavbar = () => {

    const { toggleSideMenu } = useContext( UiContext );
    

    return (
        <AppBar>
            <Toolbar>
               
                    <Link href='/' display='flex' alignItems='center'  sx={{ color: 'white'}}>
                        <Typography sx={{ ml: 0.5 , } }variant='h6'>Pepireyes |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Admin</Typography>
                    </Link>  
            

                <Box flex={ 1 } />

                <Button
                color="primary"
                sx={{ bgcolor:'black' , width: '2rem', height: '2rem'} }
                startIcon={<SegmentIcon  />}
    
                
                 onClick={toggleSideMenu}
                 >
                  
                </Button>

            </Toolbar>
        </AppBar>
    )
}
