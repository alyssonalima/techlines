import React, { useState } from 'react';
import { IconButton, Box, Flex, HStack, Icon, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Link as ReactLink } from 'react-router-dom'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import NavLink from './NavLink';
import ThemeSwitcher from './ThemeSwitcher';
import { BiUserCheck } from 'react-icons/bi';
import { toggleFavorites } from '../redux/actions/productActions';
import { LuMenu, LuX } from 'react-icons/lu';
import { GiAbstract038 as SiteLogo } from 'react-icons/gi';
import { TbShoppingCart } from 'react-icons/tb';
//import { BsPhoneFlip } from 'react-icons/bs';

const Links = [
    { name: 'Products', route: '/products' },
    { name: 'Hot Deals', route: '/hot-deals' },
    { name: 'Contact', route: '/contact' },
    { name: 'Services', route: '/services' }
]

const Header = () => {
    //const { open, onOpen, onClose } = useDisclosure;
    const [isOpen, setToggle] = useState(false);
    const toggleMenu = () => {
        isOpen ? setToggle(false) : setToggle(true);
    }
    const dispatch = useDispatch();
    const { favoritesToggled } = useSelector((state) => state.product);
    const { cartItems } = useSelector((state) => state.cart);
    const { theme } = useTheme();

    useEffect(() => {}, [favoritesToggled, dispatch]);

    return (
        <Box bg={theme === 'dark' ? 'yellow.300' : 'cyan.900'} px='4'>
            <Flex h='16' alignItems='center' justifyContent='space-between'>
                <Flex display={{base:'flex', md: 'none'}} alignItems='center'>
                    <IconButton side='md' /*onClick={open ? onClose : onOpen}*/ onClick={toggleMenu} bg={theme === 'dark' ? 'yellow.300' : 'cyan.900'} color={theme === 'dark' ? 'black' : 'white'}>
                        {isOpen ? <LuX /> : <LuMenu />}
                    </IconButton>
                    <IconButton ml='12' position='absolute' as={ReactLink} to='/cart' bg={theme === 'dark' ? 'yellow.300' : 'cyan.900'} color={theme === 'dark' ? 'black' : 'white'}>
                        <TbShoppingCart size='20px' />
                    </IconButton>
                    {cartItems.length > 0 && (
                        <Text fontWeight='bold' fontStyle='italic' position='absolute' ml='74px' mt='-6'>
                            {cartItems.length}
                        </Text>
                    )}
                </Flex>
                <HStack spacing='8' alignItems='center'>
                    <Box alignItems='center' display='flex' as={ReactLink} to='/'>
                        <Icon h='6' w='6' color={theme === 'dark' ? 'black' : 'white'}>
                            <SiteLogo />
                        </Icon>
                        <Text as='b' color={theme === 'dark' ? 'black' : 'white'} px='2'>Tech Lines</Text>
                    </Box>
                    <HStack as='nav' spacing='4' display={{ base: 'none', md: 'flex' }}>
                        {Links.map((link) => (
                            <NavLink route={link.route} key={link.route}>
                                <Text fontWeight='medium' color={theme === 'dark' ? 'black' : 'white'} >
                                    {link.name}
                                </Text> {' '}
                            </NavLink>
                        ))}
                        <Box>
                            <IconButton ml='12' as={ReactLink} to='/cart' bg={theme === 'dark' ? 'yellow.300' : 'cyan.900'} color={theme === 'dark' ? 'black' : 'white'}>
                                <TbShoppingCart size='20px' />
                            </IconButton>
                            {cartItems.length > 0 && (
                                <Text fontWeight='bold' fontStyle='italic' position='absolute' ml='74px' mt='-6' color={theme === 'dark' ? 'black' : 'white'}>
                                    {cartItems.length}
                                </Text>
                            )}
                        </Box>
                        <ThemeSwitcher />
                        {
                            favoritesToggled ? (
                                <IconButton variant='ghost' onClick={() => dispatch(toggleFavorites(false))} bg={theme === 'dark' ? 'yellow.300' : 'cyan.900'} color={theme === 'dark' ? 'black' : 'white'}>
                                    <MdOutlineFavorite size='20px' />
                                </IconButton>
                            ) : (
                                <IconButton variant='ghost' onClick={() => dispatch(toggleFavorites(true))} bg={theme === 'dark' ? 'yellow.300' : 'cyan.900'} color={theme === 'dark' ? 'black' : 'white'}>
                                    <MdOutlineFavoriteBorder size='20px' />
                                </IconButton>
                            )
                        }
                    </HStack>
                </HStack>
                
                <Flex alignItems='center'>
                    <IconButton variant='ghost' bg={theme === 'dark' ? 'yellow.300' : 'cyan.900'} color={theme === 'dark' ? 'black' : 'white'}>
                        <BiUserCheck />
                    </IconButton>
                </Flex>
            </Flex>
            <Box display='flex'>
                { isOpen && (
                    <Box pb='4' display={{ md:'none' }}>
                        <Stack as='nav' spacing='4'>
                            {' '}
                            {Links.map((link) => (
                                <NavLink route={link.route} key={link.route}>
                                    <Text fontWeight='medium' color={theme === 'dark' ? 'black' : 'white'} >
                                        {link.name}
                                    </Text> 
                                </NavLink>
                            ))}
                        </Stack>
                        {
                            favoritesToggled ? (
                                <IconButton variant='ghost' onClick={() => dispatch(toggleFavorites(false))} bg={theme === 'dark' ? 'yellow.300' : 'cyan.900'} color={theme === 'dark' ? 'black' : 'white'}>
                                    <MdOutlineFavorite size='20px' />
                                </IconButton>
                            ) : (
                                <IconButton variant='ghost' onClick={() => dispatch(toggleFavorites(true))} bg={theme === 'dark' ? 'yellow.300' : 'cyan.900'} color={theme === 'dark' ? 'black' : 'white'}>
                                    <MdOutlineFavoriteBorder size='20px' />
                                </IconButton>
                            )
                        }
                        <ThemeSwitcher />
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default Header