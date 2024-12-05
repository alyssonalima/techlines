import React, { useState } from 'react';
import { IconButton, Box, Flex, HStack, Icon, Stack, Text, useDisclosurem, Alert, Separator, Image, MenuRoot, MenuItem, MenuContent, MenuTrigger, MenuSeparator, MenuItemGroup, Button, Spacer, StatValueText } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Toaster, toaster } from '../components/ui/toaster';
import { useTheme } from 'next-themes';
import { Link as ReactLink } from 'react-router-dom'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import NavLink from './NavLink';
import ThemeSwitcher from './ThemeSwitcher';
import { BiUserCheck, BiLogInCircle, BiChevronDown } from 'react-icons/bi';
import { toggleFavorites } from '../redux/actions/productActions';
import { LuMenu, LuX } from 'react-icons/lu';
import { GiAbstract038 as SiteLogo } from 'react-icons/gi';
import { TbShoppingCart } from 'react-icons/tb';
import { logout } from '../redux/actions/userActions';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { CloseButton } from './ui/close-button';
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
    const { userInfo } = useSelector((state) => state.user);
    const [showBanner, setShowBanner] = useState(userInfo ? !userInfo.active : false)

    useEffect(() => {
        if (userInfo && !userInfo.active) {
            setShowBanner(true);
        }
    }, [favoritesToggled, dispatch, userInfo]);

    const logoutHandler = () => {
        dispatch(logout());
        toaster.create({
            title: 'You have been logged out.',
            type: 'success',
            duration: 2000,
            action: {
                label: "Close",
                onClick: () => console.log("Toaster closed"),
            },
        });
    }

    return (
        <>
        <Box bg={theme === 'dark' ? 'yellow.300' : 'cyan.900'} px='4'>
            <Toaster />
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
                    { userInfo ? (
                        <MenuRoot positioning={{ placement: "bottom-end" }} position='absolute'>
                            <MenuTrigger asChild >
                                <Button variant='link' cursor='pointer' minW='0' size='30px' bg={theme === 'dark' ? 'yellow.300' : 'cyan.900'} color={theme === 'dark' ? 'black' : 'white'}>
                                    <HStack>
                                        <BiUserCheck />
                                        <BiChevronDown />
                                    </HStack>
                                </Button>
                            </MenuTrigger>
                            <MenuContent>
                                <MenuItem value='email'>
                                    {userInfo.email}
                                </MenuItem>
                                <Separator py='1'/>
                                <MenuItem as={ReactLink} to='/order-history' value='order-history'>
                                    Order History
                                </MenuItem>
                                <MenuItem as={ReactLink} to='/profile' value='profile'>
                                    Profile
                                </MenuItem>
                                { userInfo.isAdmin && (
                                    <>
                                    <MenuSeparator />
                                    <MenuItem as={ReactLink} to='/admin-console' value='admin-console'>
                                        Admin Console
                                    </MenuItem>
                                    </>
                                )}
                                <Separator />
                                <MenuItem onClick={logoutHandler} value='logout'>
                                    Log Out
                                </MenuItem>
                            </MenuContent>
                        </MenuRoot>
                    ) : (
                        <MenuRoot>
                            <MenuTrigger asChild >
                                <Button as={IconButton} variant='ghost' cursor='pointer' bg={theme === 'dark' ? 'yellow.300' : 'cyan.900'} color={theme === 'dark' ? 'black' : 'white'}>
                                    <BiLogInCircle size='25px' />
                                </Button>
                            </MenuTrigger>
                            <MenuContent>
                                <MenuItem as={ReactLink} to='/login' p='2' fontWeight='400' variant='link' value='signin'>
                                    Log In
                                </MenuItem>
                                <MenuSeparator />
                                <MenuItem as={ReactLink} to='/registration' p='2' fontWeight='400' variant='link' value='signout'>
                                    Sign Up
                                </MenuItem>
                            </MenuContent>
                        </MenuRoot>
                    )} 
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
        {userInfo && !userInfo.active && showBanner && (
            <Box alignItems='center' justify='space-between'>
                <Alert.Root status='warning'> 
                    <Alert.Indicator />
                    <Alert.Title>
                        E-mail is not verified!
                    </Alert.Title>
                    <Alert.Description>
                        You must verify your e-mail address.
                    </Alert.Description>
                    <Spacer />
                    <CloseButton cursor={'pointer'} size='2px' onClick={() => setShowBanner(false)} ></CloseButton>
                </Alert.Root>
            </Box>
        )}
        </>
    )
}

export default Header