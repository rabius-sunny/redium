import Navbar from '../navbar'
import Footer from '../footer'
import { ScrollTop } from './ScrollToTop'
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
            <div className="avatar top">
                <KeyboardArrowUpIcon className="avatarText fs-28" />
            </div>
        </ScrollTop>
        <footer><Footer /></footer>
    </MUITheme>
}
