import { Box, Image, Text, Badge, Flex, IconButton, Skeleton } from '@chakra-ui/react';
import { HiStar } from "react-icons/hi"
import { BiExpand } from 'react-icons/bi';
import React from 'react';
import { addToFavorites, removeFromFavorites } from '../redux/actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'; 

const ProductCard = ({ product, loading }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.product);

  return (
    <Skeleton loading={loading} _hover={{size: 1.5}} w='250px' h='450px'>
      <Box
        _hover={{transform: 'scale(1.1)', transitionDuration: '0.6s'}}
        borderWidth='1px'
        overflow='hidden'
        p='4'
        shadow='md'>
        <Image src={product.images[0]} fallbackSrc='https://via.placeholder.com/150' alt={product.name} height={'200px'} />
        {product.stock < 5 ? (
          <Badge colorPalette={'yellow'} mt='3' >
            Only {product.stock} left!
          </Badge>
        ) : product.stock < 1 ? (
          <Badge colorPalette={'red'} mt='3' >
            Sold Out
          </Badge>
        ) : (
          <Badge colorPalette={'green'} mt='3' >
            In Stock
          </Badge>
        )}
        {product.productIsNew && (
          <Badge ml='2' colorPalette={'purple'} mt='3' >
            {/*<HiStar />*/}
            New!
          </Badge>
        )}
        <Text lineClamp={1} fontSize='xl' fontWeight='semibold' mt='3'>
          {product.brand} {` `} {product.name}
        </Text>
        <Text lineClamp={1} fontSize='md' color='gray.600'>
          {product.subtitle}
        </Text>
        <Flex justify='space-between' alignItems='center'> 
          <Badge colorPalette={'cyan'}>{product.category}</Badge>
          <Text fontSize='xl' fontWeight='semibold' color='cyan.600'>
            ${product.price}
          </Text>
        </Flex>
        <Flex justify={'space-between'} mt='2'>
          {favorites.includes(product._id) ? (
                <IconButton colorPalette={'cyan'} size='sm' onClick={() => dispatch(removeFromFavorites(product._id))}>
                  <MdOutlineFavorite size='20px' />
                </IconButton>
            ) : (
              <IconButton colorPalette={'cyan'} size='sm' onClick={() => dispatch(addToFavorites(product._id))}>
                <MdOutlineFavoriteBorder size='20px' />
              </IconButton>
            )
          }
          <IconButton colorPalette={'cyan'} size='sm'>
            <BiExpand size='20'/>
          </IconButton>
        </Flex>
      </Box>
    </Skeleton>
  );
};

export default ProductCard;