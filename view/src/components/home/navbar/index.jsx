import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <ul>
                <li><Link to="/sign-up">Signup</Link></li>
                <li><Link to="/sign-in">Signin</Link></li>
                <div className="row">
                    <div className="col-6">
                        <p>lorem</p>
                    </div>
                    <div className="col-6">
                        <p>lorem</p>
                    </div>
                </div>
            </ul>
        </div>
    )
}
