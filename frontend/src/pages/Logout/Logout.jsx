<<<<<<< HEAD
import AuthLayout from "../../Components/Authlayout/Authlayout";
=======
import AuthLayout from "../../Components/Authlayout";
>>>>>>> b7303b3509789b5b10b88e70611d3bb3e4c60368
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
