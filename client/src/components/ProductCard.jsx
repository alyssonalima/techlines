import { Box, Image, Text, Badge, Flex, IconButton, Skeleton } from '@chakra-ui/react';
import { Tooltip } from '../components/ui/tooltip';
import { Toaster, toaster } from '../components/ui/toaster';
import { HiStar } from "react-icons/hi"
import { BiExpand } from 'react-icons/bi';
import React, { useState } from 'react';
import { addToFavorites, removeFromFavorites } from '../redux/actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'; 
import { Link as ReactLink} from 'react-router-dom';
import { useTheme } from 'next-themes';
import { addCartItem } from '../redux/actions/cartActions';
import { useEffect } from 'react';
import { TbShoppingCartPlus } from 'react-icons/tb';

const ProductCard = ({ product, loading }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.product);
  const [isShown, setIsShown] = useState(false);
  const { theme } = useTheme();
  const { cartItems } = useSelector((state) => state.cart);
  const [ cartPlusDisabled, setCartPlusDisabled ] = useState(false);

  useEffect(() => {
    const item = cartItems.find((cartItem) => cartItem.id === product._id);
    if (item && item.qty === product.stock) {
      setCartPlusDisabled(true);
    }
  }, [product, cartItems]);

  const addItem = (id) => {
    if (cartItems.some((cartItem) => cartItem.id === id)){
        const item = cartItems.find((cartItem) => cartItem.id === id);
        dispatch(addCartItem(id, Number(item.qty) + Number(1)));
    } else {
        dispatch(addCartItem(id, 1));
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

  return (
    <Skeleton loading={loading} w='250px' h='450px'>
      <Toaster />
      <Box
        _hover={{transform: 'scale(1.1)', transitionDuration: '0.6s'}}
        borderWidth='1px'
        overflow='hidden'
        p='4'
        shadow='md'>
        <Image 
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          src={product.images[isShown && product.images.length > 1 ? 1 : 0]} 
          fallbackSrc='https://via.placeholder.com/150' 
          alt={product.name} 
          height={'200px'} 
        />
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
        <Text lineClamp={1} fontSize='xl' fontWeight='semibold' mt='3' as={ReactLink} to={`/product/${product._id}`} >
          {product.brand} {` `} {product.name}
        </Text>
        <Text lineClamp={1} fontSize='md' color='gray.600'>
          {product.subtitle}
        </Text>
        <Flex justify='space-between' alignItems='center'> 
          <Badge colorPalette={'blue'}>{product.category}</Badge>
          <Text fontSize='xl' fontWeight='semibold' color={theme === 'dark' ? 'yellow.600' : 'cyan.600'}>
            ${product.price}
          </Text>
        </Flex>
        <Flex justify={'space-between'} mt='2'>
          {favorites.includes(product._id) ? (
                <IconButton colorPalette={theme === 'dark' ? 'yellow' : 'cyan'} size='sm' onClick={() => dispatch(removeFromFavorites(product._id))}>
                  <MdOutlineFavorite size='20px' />
                </IconButton>
            ) : (
              <IconButton colorPalette={theme === 'dark' ? 'yellow' : 'cyan'} size='sm' onClick={() => dispatch(addToFavorites(product._id))}>
                <MdOutlineFavoriteBorder size='20px' />
              </IconButton>
            )
          }
          <IconButton colorPalette={theme === 'dark' ? 'yellow' : 'cyan'} size='sm' as={ReactLink} to={`/product/${product._id}`}>
            <BiExpand size='20'/>
          </IconButton>

          <Tooltip 
              disabled={!cartPlusDisabled} 
              showArrow 
              content={
                !cartPlusDisabled 
                ? 'You reached the maximum quantity of the product. ' 
                : product.stock <= 0 
                ? 'Out of stock' 
                : '' 
            }>
            <IconButton disabled={product.stock <= 0 || cartPlusDisabled} colorPalette={theme === 'dark' ? 'yellow' : 'cyan'} onClick={() => addItem(product._id)}>
              <TbShoppingCartPlus size='20' />
            </IconButton>
          </Tooltip>
        </Flex>
      </Box>
    </Skeleton>
  );
};

export default ProductCard;