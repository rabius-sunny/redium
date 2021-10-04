import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#1b2c5b'
        }
    }
});


export default function MUITheme({ children }) {
    return <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
}
