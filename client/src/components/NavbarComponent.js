import { Link } from "react-router-dom"
//import { getUser, logout } from "../services/authorize"
const NavbarComponent=()=>{
    return(
        <nav>
            <ul className="nav nav-tabs">
                <li className="nav-item pr-3 pt-3 pb-3">
                    <Link to="/" className="nav-link">หน้าแรก</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavbarComponent