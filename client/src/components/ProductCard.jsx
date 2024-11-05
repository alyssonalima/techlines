import { Box, Image, Text, Badge, Flex, IconButton, Skeleton } from '@chakra-ui/react';
import { HiStar } from "react-icons/hi"
import { BiExpand } from 'react-icons/bi';
import React from 'react';

const ProductCard = ({ product, loading }) => {
  return <Skeleton loading={loading} _hover={{size: 1.5}}>
    <Box
      _hover={{transform: 'scale(1.1)', transitionDuration: '0.5s'}}
      borderWidth='1px'
      overflow='hidden'
      p='4'
      shadow='md'>
      <Image />
      {product.stock < 5 ? (
        <Badge colorPalette={'yellow'}>
          Only {product.stock} left!
        </Badge>
      ) : product.stock < 1 ? (
        <Badge colorPalette={'red'}>
          Sold Out
        </Badge>
      ) : (
        <Badge colorPalette={'green'}>
          In Stock
        </Badge>
      )}
      {product.productIsNew && (
        <Badge ml='2' colorPalette={'purple'}>
          <HiStar />
          New!
        </Badge>
      )}
    </Box>
  </Skeleton>;
};

export default ProductCard;