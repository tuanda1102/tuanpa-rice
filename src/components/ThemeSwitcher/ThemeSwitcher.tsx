import { Button } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdLightMode, MdNightlight } from 'react-icons/md';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      onClick={handleToggleTheme}
      isIconOnly
      variant='ghost'
      className='border-0 bg-transparent'
    >
      {theme === 'light' ? (
        <MdNightlight size={24} />
      ) : (
        <MdLightMode size={24} />
      )}
    </Button>
  );
}
