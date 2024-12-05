import { Button, Group, Container, Separator, IconButton, Input, Stack, Text, Box, Flex, Icon } from "@chakra-ui/react"
import { useTheme } from 'next-themes';
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { GiAbstract038 as SiteLogo } from 'react-icons/gi';
//import { BsPhoneFlip } from 'react-icons/bs';

const Footer = () => {
    const { theme } = useTheme();
    
    return (
        <Box w='100%' bg={theme === 'dark' ? 'yellow.300' : 'cyan.900'} px='4'>
            <Container as='footer' maxW='7xl'>
                <Stack spacing='8' direction={{base: 'column', md: 'row'}} justify='space-between' py={{base: '12', md: '16'}}>
                    <Stack spacing={{base: '6', md: '8'}} align='start'>
                        <Flex alignItems='center'>
                            <Icon h='10' w='10' color={theme === 'dark' ? 'black' : 'white'}>
                                <SiteLogo />
                            </Icon>
                            <Text fontSize='3xl' fontWeight='extrabold' px='2' color={theme === 'dark' ? 'black' : 'white'}>
                                Tech Lines
                            </Text>
                        </Flex>
                        <Text color={theme === 'dark' ? 'black' : 'white'} >We love technology</Text>
                    </Stack>
                    <Stack direction={{base: 'column-reverse', md: 'column', lg: 'row'}} spacing={{base: '12', md: '8'}}>
                        <Stack direction='row' spacing='8'>
                            <Stack spacing='4' minW='36' flex='1' color={theme === 'dark' ? 'black' : 'white'}>
                                <Text fontSize='sm' fontWeight='semibold' color={theme === 'dark' ? 'black' : 'white'}>
                                    Product
                                </Text>
                                <Stack spacing='3' shouldWrapChildren>
                                    <Box>
                                        <Button variant='link' size='xs'>
                                            How it works
                                        </Button>
                                    </Box>
                                    <Box>
                                        <Button variant='link' size='xs'>
                                            Pricing
                                        </Button>
                                    </Box>
                                </Stack>
                            </Stack>
                            <Stack spacing='4' minW='36' flex='1' color={theme === 'dark' ? 'black' : 'white'}>
                                <Text fontSize='sm' fontWeight='semibold' color={theme === 'dark' ? 'black' : 'white'}>
                                    Legal
                                </Text>
                                <Stack spacing='3' shouldWrapChildren >
                                    <Box>
                                        <Button variant='link' size='xs'>
                                            Privacy
                                        </Button>
                                    </Box>
                                    <Box>
                                        <Button variant='link' size='xs'>
                                            Terms
                                        </Button>
                                    </Box>
                                    <Box>
                                        <Button variant='link' size='xs'>
                                            License
                                        </Button>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack spacing='4'>
                            <Text fontSize='sm' fontWeight='semibold' color={theme === 'dark' ? 'black' : 'white'} paddingTop='2'>
                                Stay up to date
                            </Text>
                            <Stack spacing='4' direction={{base: 'column', sm: 'row'}} maxW={{lg: '460px'}} py='2'>
                                <Input placeholder='Enter your email' type='email' color={theme === 'dark' ? 'black' : 'white'} colorPalette={theme === 'dark' ? 'orange' : 'cyan'} required />
                                <Button variant='privacy' fontWeight='bold' type='submit' flexShrink='0' color={theme === 'dark' ? 'black' : 'white'}>
                                    Subscribe
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Separator />
                <Stack pt='8' pb='12' justify='space-between' direction={{base: 'column-reverse', md: 'row'}} align='center'>
                    <Text fontSize='sm' color={theme === 'dark' ? 'black' : 'white'}>
                        &copy; {new Date().getFullYear()} Tech Lines, Inc. All rights reserved.
                    </Text>
                    <Group >
                        <IconButton as='a' href='https://www.linkedin.com/in/alysson-a-lima/' variant='solid' bg={theme === 'dark' ? 'yellow.300' : 'cyan.900'} color={theme === 'dark' ? 'black' : 'white'}>
                            <FaLinkedin fontSize='1.25rem'/>
                        </IconButton>
                        <IconButton as='a' href='https://github.com/alyssonalima/' variant='solid' bg={theme === 'dark' ? 'yellow.300' : 'cyan.900'} color={theme === 'dark' ? 'black' : 'white'}>
                            <FaGithub fontSize='1.25rem'/>
                        </IconButton>
                        <IconButton as='a' href='#' variant='solid' bg={theme === 'dark' ? 'yellow.300' : 'cyan.900'} color={theme === 'dark' ? 'black' : 'white'}>
                            <FaTwitter fontSize='1.25rem'/>
                        </IconButton>
                    </Group>
                </Stack>
            </Container>
        </Box>   
    )
}

export default Footer