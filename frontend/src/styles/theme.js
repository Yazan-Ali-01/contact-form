import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: import.meta.env.VITE_PRIMARY_COLOR || '#fff',
    },
    secondary: {
      main: import.meta.env.VITE_SECONDARY_COLOR || '#f50057',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1480,
      xl: 1920,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthXs: {
          maxWidth: '100%', // Set to 100% for full-width
        },
        maxWidthSm: {
          maxWidth: '100%',
        },
        maxWidthMd: {
          maxWidth: '100%',
        },
        maxWidthLg: {
          maxWidth: '100%',
        },
        maxWidthXl: {
          maxWidth: '100%',
        },
      },
    },

  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
    h1: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700, // Customize the weight as needed
    },
    h2: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
    },
    body1: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 400, // Normal weight for body text
    },
    body2: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 400,
    },
    button: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 600, // Slightly bolder for buttons
      textTransform: 'none', // Optional: remove uppercase transformation
    },
  },

});

export default theme;