import React from 'react';
import { Box, Flex, Heading, HStack, Icon, Image, Link, Skeleton, Stack, Text } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { FaArrowRight } from 'react-icons/fa';
import { Link as ReactLink } from 'react-router-dom';
import { GiAbstract038 as SiteLogo } from 'react-icons/gi';
//import { BsPhoneFlip } from 'react-icons/bs';

const LandingScreen = () => {
    const { theme } = useTheme();

    return (
        
        <Box maxW='8x1' mx='auto' p={{base: '0', lg: '12'}} minH='6x1'>
            <Stack direction={{base: 'column-reverse', lg: 'row'}} spacing={{base: '0', lg: '20'}}>
                <Box 
                    width={{ lg: 'sm' }} 
                    transform={{ base: 'translateY(-50%)', lg: 'none' }} 
                    bg={{ base: theme === 'dark' ? 'black' : 'white', lg: 'transparent' }} 
                    mx={{ base: '6', md: '8', lg: '0' }}
                    px={{ base: '6', md: '8', lg: '0' }}
                    py={{ base: '6', md: '8', lg: '12' }}>
                    <Stack spacing={{ base: '8', lg: '10' }}>
                        <Stack spacing={{ base: '2', lg: '4' }}>
                            {/* <Flex alignItems='center'>
                                <ThemeSwitcher />
                            </Flex> */}
                            <Flex alignItems='center'>
                                <Icon h='12' w='12' color={theme === 'dark' ? 'yellow.200' : 'cyan.500'}>
                                    <SiteLogo />
                                </Icon>
                                <Text fontSize='4xl' fontWeight='bold' px='4'>
                                    Tech Lines
                                </Text>
                            </Flex>
                            <Heading size='xl' fontWeight='normal'>
                                Refresh your equipment
                            </Heading>
                            <HStack spacing='3'>
                                <Link as={ReactLink} to='/products' color={theme === 'dark' ? 'yellow.200' : 'cyan.500'}>
                                    Discover now
                                </Link>
                                <Icon color={theme === 'dark' ? 'yellow.200' : 'cyan.500'}>
                                    <FaArrowRight />
                                </Icon>
                            </HStack>
                        </Stack>
                    </Stack>
                </Box>
                <Flex flex='1' overflow='hidden'>
                    <Image src={theme === 'dark' ? 'images/landing-dark.jpg' : 'images/landing-light.jpg'} fallBack={<Skeleton />} maxH='550px' minH='300px' objectFit='cover' flex='1'/>
                </Flex>
            </Stack>
        </Box>
    );
}

export default LandingScreen