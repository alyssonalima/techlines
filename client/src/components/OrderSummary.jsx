import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import { useTheme } from 'next-themes';
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";

const OrderSummary = () => {
    const { theme } = useTheme();
    const { subtotal, shipping } = useSelector((state) => state.cart);
    return (
        <Stack minWidth='300px' spacing='8' borderWidth='1px' borderColor={theme === 'dark' ? 'yellow.200' : 'cyan.500'} rounded='lg' padding='8' w='full'>
            <Heading size='md'>Order Summary</Heading>
            <Stack spacing='6'>
                <Flex justify='space-between'>
                    <Text fontWeight='medium' color={theme === 'dark' ? 'gray.400' : 'gray.600'}>
                        Subtotal
                    </Text>
                    <Text fontWeight='medium'>
                        ${subtotal}
                    </Text>
                </Flex>
                <Flex justify='space-between'>
                    <Text fontWeight='medium' color={theme === 'dark' ? 'gray.400' : 'gray.600'}>
                        Shipping
                    </Text>
                    <Text fontWeight='medium'>
                        ${shipping}
                    </Text>
                </Flex>
                <Flex justify='space-between'>
                    <Text fontWeight='medium' fontSize='xl'>
                        Total
                    </Text>
                    <Text fontWeight='medium'>
                        ${Number(subtotal) + Number(shipping)}
                    </Text>
                </Flex>
            </Stack>
            <Button as={ReactLink} to='/checkout' colorPalette={theme === 'dark' ? 'gray.400' : 'gray.600'} size='lg' variant='solid'>
                Checkout<FaArrowRight />
            </Button>
        </Stack>
    )
}

export default OrderSummary