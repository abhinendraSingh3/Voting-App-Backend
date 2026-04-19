import "./NavbarAlogin.css"
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function NavbarAlogin(props) {

    const navigate=useNavigate();

    const [open, setOpen] = useState(false);

    const myRef = useRef();

    useEffect(() => {

        function handleclick(e) {

            // If ref exists AND the click is OUTSIDE the element target
            if (myRef.current && !myRef.current.contains(e.target)) {
                setOpen(false)
            }

        };
        //add eventListener
        document.addEventListener('click', handleclick)

        //return removeEventListener for cleanup
        return () => { document.removeEventListener('click', handleclick); }


    }, [])


    return (
        <nav className="navbar">
            {/* right side */}
            <div className="navbar-heading">{props.brandName}</div>

            {/* center side */}
            <div className="navbar-links">
                {props.navLinks.map((links, index) => (
                    <Link key={index} to={links.url}>{links.label}</Link>

                ))}
            </div>

            {/* right side */}
            <div className="navProfile-container">
                <div className="profile" onClick={() => setOpen(!open)}>
                    <img src="" alt="" className="profilePic" ref={myRef}>
                    </img>
                </div>
                {/* true && <div>Dropdown</div>
                "If open is true → show this" */}
                {open && (
                    <div className="dropdown">
                        <div className="dropdown-item">My Profile</div>
                        <div className="dropdown-item">Change Password</div>
                        <div className="dropdown-item">Settings & Privacy</div>
                        <div className="dropdown-item">Help & Support</div>
                        <div className="dropdown-item logout" onClick={()=>{navigate('/logout')}}>Logout</div>
                    </div>
                )}
            </div>
        </nav >
    );
}

export default NavbarAlogin;