import { useMediaQuery } from 'react-responsive';

// config from tailwind:
// screens: {
//   sm: '640px',
//   // => @media (min-width: 640px) { ... }

//   md: '768px',
//   // => @media (min-width: 768px) { ... }

//   lg: '1024px',
//   // => @media (min-width: 1024px) { ... }

//   xl: '1280px',
//   // => @media (min-width: 1280px) { ... }

//   '2xl': '1400px',
//   // => @media (min-width: 1400px) { ... }
// },

const useResponsive = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return { isMobile, isTablet, isDesktop };
};

export default useResponsive;
