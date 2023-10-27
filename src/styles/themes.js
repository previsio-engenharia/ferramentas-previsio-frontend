import { ThemeOptions, createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            //main: '#44b44a',
            main: '#43a047',
        },
        secondary: {
            //main: '#f69648',
            main: '#ef6c00',
        },
        //divider: '#09253c',
        warning: {
            main: '#fff176',
        },
        success: {
            main: '#0288d1',
        },
        info: {
            main: '#e0e0e0',
        },
        previsio_blue: {
            light: '#09253C',
            main: '#061018'
        }
    },
    typography: {
        fontSize: 14,
        htmlFontSize: 18,
        h1: {
            fontSize: '3rem',
            fontWeight: 600,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.8rem',
            fontWeight: 500,
        },
        h4: {
            fontSize: '1.5rem',
        },
        button: {
            fontWeight: 600,
        },
    },
});