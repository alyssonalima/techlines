import React from 'react'
import { FaStar } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { Icon } from '@chakra-ui/react';

const Star = ({rating = 0, star = 0}) => {
    const { theme } = useTheme();
    
    return (
        <Icon 
            color={ rating >= star || rating === 0 ? 
                theme === 'dark' ? 'yellow.500' : 'cyan.500' 
                : 'gray.400'}>
            <FaStar/>
        </Icon>
    )
}

export default Star