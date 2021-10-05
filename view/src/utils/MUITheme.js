import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#1b2c5b'
        },
        secondary: {
            main: '#1cd6b1'
        }
    }
});


export default function MUITheme({ children }) {
    return <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
}
