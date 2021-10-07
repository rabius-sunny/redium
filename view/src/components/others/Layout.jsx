import Navbar from '../navbar'
import Footer from '../footer'
import { ScrollTop } from './ScrollToTop'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import MUITheme from '../../utils/MUITheme'
import { Fab } from '@mui/material'


export default function Layout(props) {
    return <MUITheme>
        <header><Navbar /></header>
        <div className="container">
            <main>
                {props.children}
            </main>
        </div>
        <ScrollTop {...props}>
            <Fab className="topFav">
                <div className="avatar top">
                    <KeyboardArrowUpIcon className="avatarText fs-28" />
                </div>
            </Fab>
        </ScrollTop>
        <footer>
            <div className="container__nav__footer"><Footer /></div>
            <div className="copyright">
                <div className="container__nav__footer copyright__text">
                    Develo<span className="love">v</span>ed by | <a href="https://rabius-sunny.netlify.app" target="_blank" rel="noreferrer">Rabius Sunny</a>
                </div>
            </div>
        </footer>
    </MUITheme>
}
