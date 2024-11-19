import React from 'react'
import { LuMinus, LuPlus } from 'react-icons/lu';
import { Alert, Icon, Badge, Box, Button, Flex, HStack, Heading, Image, SimpleGrid, Spinner, Stack, Text } from '@chakra-ui/react';
import { BiCheckShield, BiPackage, BiSupport } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../redux/actions/productActions';
import { useEffect, useState } from 'react';
import Star from '../components/Star';
import { useTheme } from 'next-themes';
import { Toaster, toaster } from '../components/ui/toaster';
import { addCartItem } from '../redux/actions/cartActions';

const ProductScreen = () => {
    const [amount, setAmount] = useState(1);
    const [alreadyInCart, isAlreadyInCart] = useState('Add to cart');
    const {id} = useParams();
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector((state) => state.product);
    const { theme } = useTheme();
    const { cartItems } = useSelector((state) => state.cart);

    const checkQuantity = (id) => {
        if (cartItems.some((cartItem) => cartItem.id === id)){
            const item = cartItems.find((cartItem) => cartItem.id === id);
            setAmount(Number(item.qty));
            isAlreadyInCart('Update cart');
        }
    }
    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        checkQuantity(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeAmount = (input) => {
        if (input === 'plus'){
            setAmount(amount + 1);
        }
        if (input === 'minus'){
            setAmount(amount - 1);
        }
    };

    const addItem = (id) => {
        if (cartItems.some((cartItem) => cartItem.id === id)){
            cartItems.find((cartItem) => cartItem.id === id);
            dispatch(addCartItem(id, amount));
        } else {
            dispatch(addCartItem(id, amount));
        }
        toaster.create({
            title: 'Cart has been updated.',
            type: 'success',
            duration: 2000,
            action: {
              label: "Close",
              onClick: () => console.log("Toaster closed"),
            },
        });
    };

    return <HStack wrap='wrap' spacing='30px' justify='center' minHeight='100vh'>
        <Toaster />
        { loading ? (
            <Stack direction='row' spacing='4'>
                <Spinner mt='20' borderWidth='2px' animationDuration='0.65s' colorPalette='cyan.500' size='xl' />
            </Stack>
        ) : error ? (
            <Alert status='error'>
                <Alert.Indicator />
                <Alert.Title>
                    We are sorry!
                </Alert.Title>
                <Alert.Description>
                    {error}
                </Alert.Description>
            </Alert>
        ) : (
            product && (
                <Box maxW={{base : '3xl', lg: '5xl'}} mx='auto' px={{base: '4', md: '8', lg: '12'}} py={{base: '6', md: '8', lg: '12'}}>
                    <Stack direction={{base: 'column', lg: 'row'}} align='flex-start'>
                        <Stack pr={{base: '0', md: 'row'}} flex='1.5' mb={{base: '4', md: 'none'}}>
                            {product.productIsNew && (
                                <Badge p='2' rounded='md' w='50px' fontSize='0.8em' colorScheme='green'>
                                    New
                                </Badge>
                            )}
                            {product.stock === 0 && (
                                <Badge rounded='full' w='70px' fontSize='0.8em' colorScheme='red'>
                                    Sold Out
                                </Badge>
                            )}
                            <Heading fontSize='3xl' px='3' fontWeight='extrabold' color={theme === 'dark' ? 'yellow.300' : 'cyan.900'}>
                                {product.brand} {product.name}
                            </Heading>
                            <Stack spacing='5'>
                                <Box px='3'>
                                    <Text fontSize='3xl'py='2'>${product.price}</Text>
                                    <Flex>
                                        <HStack spacing='2px'>
                                            <Star rating={product.rating} star={1}/>
                                            <Star rating={product.rating} star={2}/>
                                            <Star rating={product.rating} star={3}/>
                                            <Star rating={product.rating} star={4}/>
                                            <Star rating={product.rating} star={5}/>
                                        </HStack>
                                        <Text fontSize='md' fontWeight='bold' ml='8px'>
                                            {product.numberOfReviews} 
                                            {product.numberOfReviews === 1 ? ' Review' : ' Reviews'}
                                        </Text>
                                    </Flex>
                                </Box>
                                <Box>
                                    <Box px='3' py='2'>
                                        <Text>{product.subtitle}</Text>
                                    </Box>
                                    <Box _dark={{bg: 'gray.900'}} px='3' py='2'>
                                        <Text textAlign='justify' _dark={{bg: 'gray.900'}}>{product.description}</Text>
                                    </Box>
                                </Box>
                                <Flex py='2'>
                                    <Text fontWeight='bold'></Text>
                                    <Badge fontSize='lg' textAlign='center' colorScheme='gray'>
                                        Quantity {'('}{product.stock} avaliable{')'}:
                                    </Badge>
                                </Flex>
                                <Flex w='170px' p='5px' border='1px' borderColor='gray.200' alignItems='center' px={{md: '12', lg: '12'}} >
                                    <Button disabled={amount <= 1} onClick={() => changeAmount('minus')} colorPalette={theme === 'dark' ? 'yellow' : 'cyan'}>
                                        <LuMinus />
                                    </Button>
                                    <Text mx='30px'> {amount}</Text>
                                    <Button disabled={amount >= product.stock} onClick={() => changeAmount('plus') } colorPalette={theme === 'dark' ? 'yellow' : 'cyan'}>
                                        <LuPlus />
                                    </Button>
                                    
                                    <Button w='220px' mx='50px' variant='outline' align='center' disabled={product.stock <= 0} alignItems='center' onClick={() => addItem(product._id)}>
                                        {alreadyInCart}
                                    </Button>
                                </Flex>
                                
                                <Stack width='270px' py='2'>
                                    <Flex alignItems='center'>
                                        <Icon size='25px'>
                                            <BiPackage />
                                        </Icon>
                                        <Text fontWeight='medium' fontSize='sm' ml='2' > 
                                            Shipping in 2 to 3 days
                                        </Text>
                                    </Flex>
                                    <Flex alignItems='center'>
                                        <Icon size='25px'>
                                            <BiCheckShield />
                                        </Icon>
                                        <Text fontWeight='medium' fontSize='sm' ml='2' > 
                                            2 years extended warranty
                                        </Text>
                                    </Flex>
                                    <Flex alignItems='center'>
                                        <Icon size='25px'>
                                            <BiSupport  />
                                        </Icon>
                                        <Text fontWeight='medium' fontSize='sm' ml='2'>
                                            We're here for you 24/7!
                                        </Text>
                                    </Flex>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Flex direction='column' align='center' flex='1' px='2'>
                            <Image mb='30px' src={product.images[0]} alt={product.name} fallbackSrc='https://via.placeholder.com/250' />
                            <Image mb='30px' src={product.images[1]} alt={product.name} fallbackSrc='https://via.placeholder.com/250' />
                        </Flex>
                    </Stack>
                    <Stack>
                        <Text fontSize='xl' fontWeight='bold'>
                            Reviews
                        </Text>
                        <SimpleGrid minChildWidth='300px' spacingX='40px' spacingY='20px' _dark={{bg: 'gray.900'}} px='3' py='2'>
                            {product.reviews.map((review) => (
                                <Box key={review._id}>
                                    <Flex spacing='2px' alignItems='center'>
                                        <Star rating={product.rating} star={1}/>
                                        <Star rating={product.rating} star={2}/>
                                        <Star rating={product.rating} star={3}/>
                                        <Star rating={product.rating} star={4}/>
                                        <Star rating={product.rating} star={5}/>
                                        <Text fontWeight='semibold' ml='4px'>
                                            {review.title && review.title}
                                        </Text>
                                    </Flex>
                                    <Box py='12px'>
                                        {review.comment}
                                    </Box>
                                    <Text fontSize='sm' color='gray.400'>
                                        by {review.name}, {new Date(review.createdAt).toDateString()}
                                    </Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Stack>
                </Box>
            )
        )
    }
    </HStack>
}

export default ProductScreen