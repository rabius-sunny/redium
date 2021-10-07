import { FaGithubSquare } from "react-icons/fa"
import { GrFacebook } from "react-icons/gr"
import { BsLinkedin } from "react-icons/bs"
import MailIcon from '@mui/icons-material/Mail'

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer__info">
                <h1>Redium</h1>
                <p>Fullstack social blogging application created with <br />
                    <code> React</code>,
                    <code> Redux</code>,
                    <code> Nodejs</code> <br />
                    With the MERN stack and MVC structure.
                </p>
            </div>
            <div className="footer__icon">
                <a href="https://github.com/rabius-sunny" target="_blank" rel="noreferrer"><FaGithubSquare /></a>
                <a href="https://fb.com/rabibinsalam" target="_blank" rel="noreferrer"><GrFacebook /></a>
                <a href="https://rabius-sunny.netlify.app" target="_blank" rel="noreferrer"><BsLinkedin /></a>
                <a href="mailto:rabiussunny10@gmail.com" target="_blank" rel="noreferrer"><MailIcon className="mail" /></a>
            </div>
        </div>
    )
}
