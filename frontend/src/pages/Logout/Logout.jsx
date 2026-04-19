import Login from "../Login/Login";
import Home from "../Home";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate=useNavigate();
    try {
        console.log("reached here")
        useEffect(() => {
            localStorage.clear();
            window.dispatchEvent(new Event('localStorageChange'));
            setTimeout(() => {
                navigate('/Login')
            }, 1000)

        }, [//only when the components renders
        ])
    }
    catch(error){
        console.log("error Occured in logout-->",error)
    }

    return (
        <>
            <h2>Logging You out...</h2>
        </>
    )
}

export default Logout;
