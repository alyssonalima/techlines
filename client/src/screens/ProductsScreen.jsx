import { Box } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ProductsScreen = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('api/products').then(response => {
            setData(response.data.products);
        }).catch(error =>{
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <> 
            {data.length > 1 && (
                <Box>
                    <ProductCard product={data[3]} loading={false}/>
                </Box>
            )}
        </>
    );
};

export default ProductsScreen;