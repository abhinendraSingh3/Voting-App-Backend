import { Link } from "react-router-dom";
import './sideBar.css'
function SideBar() {
    return (
        <div className="sideBar">
            {/* Logo Section */}
            <div className="sideBar-logo">
                <div className="logo-icon">🛡️</div>
                <h2>G.L Bajaj Voting </h2>
            </div>
            {/* Navigation Links Section */}
            <div className="sideBar-links">

                <Link to='/Dashboard' className="sidebar-nav">
                    <span className="icon">📶</span>
                    <span>Dashboard</span>
                </Link>

                <Link to='/votingevents' className="sidebar-nav">
                    <span className="icon">🗳️</span>
                    <span>Voting Events</span>
                </Link>

                <Link to='/results' className="sidebar-nav">
                    <span className="icon">📈</span>
                    <span>Results</span>
                </Link>

                <Link to='/logout' className="sidebar-nav">
                    <span className="icon">🚪</span>
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    )
}
export default SideBar;