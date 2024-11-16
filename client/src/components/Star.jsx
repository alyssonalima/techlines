import React from 'react'
import { LuStar } from 'react-icons/lu';
import { useTheme } from 'next-themes';
import { useState } from 'react';

const Star = (rating = 0, star = 0) => {
    const { theme } = useTheme();
    const [setToggle] = useState('black');
    const elementColor = () => {
       theme === 'dark' ? setToggle('black') : setToggle('white');
    }
    
    return (
        
        <LuStar color={ rating >= star || rating === 0 ? elementColor : 'gray.200'}/>
    )
}

export default Star