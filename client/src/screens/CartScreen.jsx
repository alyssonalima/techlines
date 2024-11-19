import { Box, Flex, Heading, HStack, Link, Stack, Spinner, Alert, Text } from "@chakra-ui/react"
import { useTheme } from 'next-themes';
import { Link as ReactLink } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";


const CartScreen = () => {
    const { loading, error, cartItems } = useSelector((state) => state.cart);
    const getHeadingContent = () => (cartItems.length === 1 ? '(1 Item)' : `(${cartItems.length} Items)`);
    const { theme } = useTheme();
    return (
        <HStack wrap='wrap' spacing='30px' justify='center' /*minHeight='100vh'*/>
            {loading ? (
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
            ) : cartItems.length <= 0 ?(
                <Alert.Root status='info'>
                    <Alert.Indicator />
                    <Alert.Title>
                        Your cart is empty.
                    </Alert.Title>
                    <Alert.Description>
                        <Link as={ReactLink} to='/products'>
                            Click here to see our products.
                        </Link>
                    </Alert.Description>
                </Alert.Root>
            ) : (
                <Box px='4' py='8' w={{base: '95%', med: '70%', lg:'50%'}}>
                    <Stack
                        direction={{ base: 'column', lg: 'row' }}
                        aligin={{ lg: 'flex-start' }}
                        spacing={{ base: '8', md: '16'}}>
                        <Stack spacing={{ base: '8', md: '10' }} flex='2'>
                            <Heading fontSize='2xl' fontWeight='extrabold' py='2'>
                                Shopping Cart 
                            <Text fontWeight='normal' fontSize='md'>
                                {getHeadingContent()}
                            </Text>
                            </Heading>
                            <Stack spacing='6px' py='2'>
                                {cartItems.map((cartItem) => {
                                    return <CartItem key={cartItem.id} cartItem={cartItem} />
                                })}
                            </Stack>
                            <Flex direction='column' align='center' flex='1' py='2'>
                                <OrderSummary />
                                <HStack mt ='6' fontWeight='semibold'>
                                    <p>or</p>
                                    <Link as={ReactLink} to='/products' color={theme === 'dark' ? 'yellow.200' : 'cyan.500'}>Continue Shopping</Link>
                                </HStack>
                            </Flex>
                        </Stack>
                    </Stack>
                </Box>
            )}
        </HStack>
    );
};

export default CartScreen