import { useTheme } from 'next-themes';
import { IconButton } from '@chakra-ui/react';
import { LuSun, LuMoon } from 'react-icons/lu';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <IconButton onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} color={theme === 'dark' ? 'black' : 'white'} variant={'plain'}>
      {theme === 'dark' ? <LuSun /> : <LuMoon />}
    </IconButton>
  );
};

export default ThemeSwitcher;