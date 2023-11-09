import { useContext } from 'react';
import NextLink from 'next/link';


import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';


import { UiContext } from '../../context';

export const AdminNavbar = () => {

    const { toggleSideMenu } = useContext( UiContext );
    

    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display='flex' alignItems='center'  sx={{ color: 'white'}}>
                        <Typography sx={{ ml: 0.5 , } }variant='h6'>Pepireyes |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Admin</Typography>
                    </Link>  
                </NextLink>

                <Box flex={ 1 } />

                <Button onClick={ toggleSideMenu }>
                    Menú
                </Button>

            </Toolbar>
        </AppBar>
    )
}
