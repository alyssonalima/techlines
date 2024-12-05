import { Box, Button, Flex, Center, HStack, Alert } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { useTheme } from 'next-themes';
import { LuTerminal } from 'react-icons/lu';

const ProductsScreen = () => {
    {/*const [data, setData] = useState([]);

    useEffect(() => {
        axios
        .get('api/products')
        .then(response => {
            setData(response.data.products);
        }).catch(error =>{
            console.error('Error fetching data:', error);
        });
    }, []);*/}
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const {loading, error, products, pagination, favoritesToggled} = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProducts(1));
    }, [dispatch]);

    const paginationButtonClick = (page) => {
        dispatch(getProducts(page));
    }
    
    return (
        <> 
            {products.length >= 1 && (
                <Box py='6'>
                    <HStack wrap='wrap' spacing='30px' justify='center' minHeight='80vh' mx={{base: '12', md: '20', lg: '32'}} direction={{ base: "column", md: "row" }} gap="10">
                        {error ? (
                            <Alert.Root status='error'>
                                <Alert.Indicator>
                                    <LuTerminal />
                                </Alert.Indicator>
                                <Alert.Title>
                                    We are sorry!
                                </Alert.Title>
                                <Alert.Description>
                                    {error}
                                </Alert.Description>
                            </Alert.Root>
                        ) : (
                            products.map((product) => (
                                <Flex justify='flex-start' key={product._id}>
                                    <Center w='250px' h='450px'>
                                        <ProductCard product={product} loading={loading} />
                                    </Center>
                                </Flex>
                            ))
                        )}
                    </HStack>
                    {!favoritesToggled && (
                        <HStack wrap='wrap' spacing='10px' justify='center' p='5'>
                            <Button colorPalette={theme === 'dark' ? 'yellow' : 'cyan'} onClick={() => paginationButtonClick(1)}>
                                <HiArrowLeft />
                            </Button>
                            {Array.from(Array(pagination.totalPages), (e, i) => {
                                return (
                                    <Button colorPalette={pagination.currentPage === i + 1? theme === 'dark' ? 'yellow' : 'cyan' : 'gray'} key={i} onClick={() => paginationButtonClick(i + 1)}>
                                        {i + 1}
                                    </Button>
                                )
                            })}
                            <Button colorPalette={theme === 'dark' ? 'yellow' : 'cyan'} onClick={() => paginationButtonClick(pagination.totalPages)}>
                                <HiArrowRight />
                            </Button>
                        </HStack>
                    )}
                </Box>
            )}
        </>
    );
};

export default ProductsScreen;