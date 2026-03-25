import SideBar from "./SideBar"
import './AuthLayout.css'
function AuthLayout({ children }) {
    return (
        <div className="auth-layout">
            <SideBar />

            <div className="auth-main-content">
            {children}
            </div>
        </div>

    )
}

export default AuthLayout