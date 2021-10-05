import Navbar from '../navbar'
import Footer from '../footer'
import { ScrollTop } from './ScrollToTop'
import { Fab } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import MUITheme from '../../utils/MUITheme'


export default function Layout(props) {
    return <MUITheme>
        <header><Navbar /></header>
        <div className="container">
            <main>
                {props.children}
            </main>
        </div>
        <ScrollTop {...props}>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
            </Fab>
        </ScrollTop>
        <footer><Footer /></footer>
    </MUITheme>
}
