import React from 'react'
import { LuMinus, LuPlus } from 'react-icons/lu';
import { Alert, AlertDescription, AlertTitle, Badge, Box, Button, Flex, HStack, Heading, Image, SimpleGrid, Spinner, Stack, Text } from '@chakra-ui/react';
import { BiCheckShield, BiPackage, BiSupport } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../redux/actions/productActions';
import { useEffect, useState } from 'react';
import Star from '../components/Star';

const ProductScreen = () => {
    const [amount, setAmount] = useState(1);
    const {id} = useParams();
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id]);

    const changeAmount = (input) => {
        if (input === 'plus'){
            setAmount(amount + 1);
        }
        if (input === 'minus'){
            setAmount(amount - 1);
        }
    };

    return <HStack wrap='wrap' spacing='30px' justify='center' minHeight='100vh'>
        { loading ? (
            <Stack direction='row' spacing='4'>
                <Spinner mt='20' borderWidth='2px' animationDuration='0.65s' colorPalette='cyan.500' size='xl' />
            </Stack>
        ) : error ? (
            <Alert status='error'>
                <AlertTitle>
                    We are sorry!
                </AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
        ) : (
            product && (
                <Box maxW={{base : '3xl', lg: '5xl'}} mx='auto' px={{base: '4', md: '8', lg: '12'}} py={{base: '6', md: '8', lg: '12'}}>
                    <Stack direction={{base: 'column', lg: 'row'}} align='flex-start'>
                        <Stack pr={{base: '0', md: 'row'}} flex='1.5' mb={{base: '12', md: 'none'}}>
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
                            <Heading fontSize='2xl' fontWeight='extrabold'>
                                {product.brand} {product.name}
                            </Heading>
                            <Stack spacing='5'>
                                <Box>
                                    <Text fontSize='xl'>${product.price}</Text>
                                    <Flex>
                                        <HStack spacing='2px'>
                                            <Star color='cyan.500' />
                                            <Star rating={product.rating} star={2}/>
                                            <Star rating={product.rating} star={3}/>
                                            <Star rating={product.rating} star={4}/>
                                            <Star rating={product.rating} star={5}/>
                                        </HStack>
                                        <Text fontSize='md' fontWeight='bold' ml='4px'>
                                            {product.numberOfReviews} 
                                            {product.numberOfReviews === 1 ? ' Review' : ' Reviews'}
                                        </Text>
                                    </Flex>
                                </Box>
                                <Text>{product.subtitle}</Text>
                                <Text>{product.description}</Text>
                                <Text fontWeight='bold'>Quantity</Text>
                                <Flex w='170px' p='5px' border='1px' borderColor='gray.200' alignItems='center'>
                                    <Button disabled={amount <= 1} onClick={() => changeAmount('minus')}>
                                        <LuMinus />
                                    </Button>
                                    <Text mx='30px'> {amount}</Text>
                                    <Button disabled={amount >= product.stock} onClick={() => changeAmount('plus')}>
                                        <LuPlus />
                                    </Button>
                                </Flex>
                                <Badge fontSize='lg' width='170px' textAlign='center' colorScheme='gray'>
                                    In Stock: {product.stock}
                                </Badge>
                                <Button variant='outline' disabled={product.stock <= 0} colorScheme='cyan' onClick={() => {}}>
                                    Add to cart
                                </Button>
                                <Stack width='270px'>
                                    <Flex alignItems='center'>
                                        <BiPackage size='20px' />
                                        <Text> 
                                            Delivery to any place
                                        </Text>
                                    </Flex>
                                    <Flex alignItems='center'>
                                        <BiCheckShield size='20px' fontWeight='medium' fontSize='sm' ml='2' />
                                        <Text> 
                                            2 years extended warranty
                                        </Text>
                                    </Flex>
                                    <Flex alignItems='center'>
                                        <BiSupport size='20px' />
                                        <Text fontWeight='medium' fontSize='sm' ml='1'>
                                            We're here for you 24/7!
                                        </Text>
                                    </Flex>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Flex direction='column' align='center' flex='1' _dark={{bg: 'gray.900'}}>
                            <Image mb='30px' src={product.images[0]} alt={product.name} fallbackSrc='https://via.placeholder.com/250' />
                            <Image mb='30px' src={product.images[1]} alt={product.name} fallbackSrc='https://via.placeholder.com/250' />
                        </Flex>
                    </Stack>
                    <Stack>
                        <Text fontSize='xl' fontWeight='bold'>
                            Reviews
                        </Text>
                        <SimpleGrid minChildWidth='300px' spacingX='40px' spacingY='20px'>
                            {product.reviews.map((review) => (
                                <Box key={review._id}>
                                    <Flex spacing='2px' alignItems='center'>
                                        <Star color='cyan.500' />
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