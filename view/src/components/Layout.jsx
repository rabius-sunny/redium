import Navbar from './navbar'
import Footer from './footer'


export default function Layout({ children }) {
    return <>
        <header><Navbar /></header>
        <div className="container">
            <main>
                {children}
            </main>
        </div>
        <footer><Footer /></footer>
    </>
}
