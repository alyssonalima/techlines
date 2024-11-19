import { Flex, Image, Spacer, Text, VStack, Box, Link } from "@chakra-ui/react";
import { useTheme } from 'next-themes';
import { addCartItem, removeCartItem } from "../redux/actions/cartActions";
import { useDispatch, useSelector } from 'react-redux';
import { CloseButton } from '../components/ui/close-button';
import { NativeSelectField, NativeSelectRoot } from "../components/ui/native-select";
import { Link as ReactLink } from "react-router-dom";

const CartItem = ({cartItem}) => {
    const { name, image, price, stock, qty, id, brand } = cartItem;
    const { theme } = useTheme();
    const dispatch = useDispatch();

    return (
        <Flex minWidth='300px' borderWidth='2px' rounded='lg' align='center' px='2.5' py='2'>
            <Image rounded='lg' w='120px' h='120px' fit='cover' src={image} fallbackSrc='https://via.placeholder.com/150' />
            <VStack p='2' w='100%' spacing='4' align='stretch'>
                <Flex alignItems='center' justify='space-between' >
                    <Text as={ReactLink} to={`/product/${id}`} fontWeight='medium' fontSize='lg' color={theme === 'dark' ? 'yellow.300' : 'cyan.900'} px='3'>
                        {brand} {name}
                    </Text>
                    
                    <CloseButton onClick={() => dispatch(removeCartItem(id))} />
                </Flex>
                {/*<Spacer />*/}
                <Flex alignItems='center' justify='space-between' px='3'>
                    <Box alignItems='center' justify='space-between'>
                        <NativeSelectRoot >
                            <Text fontSize='sm' py='2' pr='3'>
                                Qnty:
                            </Text>
                            <NativeSelectField colorPalette={theme === 'dark' ? 'gray.400' : 'gray.600'} value={qty} onChange={(e) => {dispatch(addCartItem(id, e.target.value))}}>
                                {[...Array(stock).keys()].map((item) => (
                                    <option key={item + 1} value={item+1}>
                                        {item + 1}
                                    </option>
                                ))}
                            </NativeSelectField>
                        </NativeSelectRoot> 
                    </Box>
                    <Text fontWeight='bold' fontSize='lg'>${price}</Text>
                </Flex>
            </VStack>
        </Flex>
    )
}

export default CartItem