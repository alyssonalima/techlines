import { IconButton } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { useTheme } from 'next-themes';

const NavLink = ({ children, route }) => {
    const { theme } = useTheme();
    return (
        <IconButton as={ReactLink} px='2' p='1' rounded='md' variant='ghost' to={route} bg={theme === 'dark' ? 'yellow.300' : 'cyan.900'}>
            {children}
        </IconButton>
    )
}

export default NavLink