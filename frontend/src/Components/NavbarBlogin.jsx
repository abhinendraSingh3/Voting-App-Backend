import "./NavbarBlogin.css"
import { Link } from "react-router-dom";
function NavbarBlogin(props){
    return(
        <nav className="navbar">
            {/* right side */}
            <div className="navbar-heading">{props.brandName}</div>

            {/* center side */}
            <div className="navbar-links">
            { props.navLinks.map((links,index)=>(
                <Link key={index} to={links.url}>{links.label}</Link>

            ))}
            </div>

            {/* right side */}
            <div className="navbar-btn">
            <Link to="/login" className="navbar-btn-login">Login</Link>
            <Link to="/register" className="navbar-btn-signup">Signup</Link>
            </div>
        </nav>
    );
}

export default NavbarBlogin;