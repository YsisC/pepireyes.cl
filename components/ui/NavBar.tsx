"use client"
import {  useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import icon from "../../public/icon.svg";

import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Toolbar } from '@mui/material';
import { ClearAllOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import SegmentIcon from '@mui/icons-material/Segment';

// import Typography from '@mui/material/Typography';
import {CartContext, UiContext,  } from '../../context'

import Link from '../../src/Link'


export const Navbar = ({...rest}) => {
    const { numberOfItems } = useContext(CartContext)
    const { asPath, push } = useRouter();
    const { toggleSideMenu } = useContext(UiContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);


    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        push(`/search/${searchTerm}`);
    }
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearchTerm();
        }
    } 
    const handleSearchIconClick = () => {
        setIsSearchVisible(true);
      };

      const handleClearSearchClick = () => {
        setIsSearchVisible(false);
      };

    return (

        <AppBar >
            <Toolbar>

                <Link href='/' display='flex' alignItems='center'>
         <Image
      priority
      className="rounded-circle"
      src={icon}
      width={55}
      alt="Pepireyes follow us"
    />
                </Link>

                <Box flex={1} />

                <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                    className="fadeIn">

                    <Link href='/menu'>
                        <Button sx={{bgcolor:'black'}} color='primary' className={asPath === '/category/menu' ? 'linkActive' : 'primary'}>Menu</Button>
                    </Link>


                    <Link href='/promociones'>
                        <Button sx={{bgcolor:'black'}} color='primary' className={asPath === '/cupon' ? 'linkActive' : 'primary'}>Promociones</Button>
                    </Link>


                    <Link href='/about'>
                        <Button sx={{bgcolor:'black'}} color='primary' className={asPath === '/about' ? 'linkActive' : 'primary'}>Sobre nosotros</Button>
                    </Link>


                </Box>


                <Box flex={1} />
                {/* Pantalla grande */}

                {
                    isSearchVisible
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={handleKeyPress}
                                autoFocus
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClearSearchClick}
                                        >
                                            <ClearAllOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                        :
                        (
                            <IconButton
                                onClick={handleSearchIconClick}
                                className='fadeIn'
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                            >
                                <SearchOutlined />
                            </IconButton>
                        )
                }

                {/* Pantalla pequeña */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' },  } }
                    onClick={toggleSideMenu}
                    >
                    <SearchOutlined />
                </IconButton>


                <Link href="/cart">
                    <IconButton>
                    <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color="secondary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>


                <Button
                color="primary"
                sx={{ bgcolor:'black'}}
                 onClick={toggleSideMenu}
                 >
                  <SegmentIcon/>
                </Button>
            </Toolbar>
        </AppBar>
      
    )
}
