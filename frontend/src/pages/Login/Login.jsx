import { Link } from "react-router-dom";
import { useState, useTimeOut } from 'react';
import './Login.css'
import { useNavigate } from "react-router-dom";
import api from './../../utils/axiosInterceptor'


function Login() {
    const navigate = useNavigate();

    const [stateErr, setStateErr] = useState("");
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {

        setStateErr("")
        setData({
            ...data,
            [e.target.name]: e.target.value
        })

    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (!data.email) {
            setStateErr("Please fill email field")
            return;
        }
        if (!data.password) {
            setStateErr("Please fill password field")
            return;
        }

        setStateErr("");
        try {
            const response = await api.post('http://localhost:5000/student/login',data);

            if (response.data.success) {
                const result = response.data;

                //save to localStorage
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('userData', JSON.stringify(result.userData));

                setData({
                    email: "",
                    password: ""
                });
                console.log(localStorage.getItem('userData'))

                setTimeout(() => {
                    navigate('/dashboard');
                },1000);
            }
            
        }
        catch (error) {
            setStateErr("Invalid Credentials");
            console.log("error occured", error);

        }

        //testing credentials
        // if (data.email === "test@gmail.com" && data.password === "1234") {
        //     navigate("/dashboard");
        //     localStorage.setItem('isLoggedIn',true);

        // } else {
        //     setStateErr("Invalid credentials");
        // }
    }
    return (
        <div className="login-main">
            <div className="login-heading">
                <h1>Login</h1>
            </div>

            <form className="form-container" onSubmit={handleSubmit}>
                <div className="email">
                    <h3>Email</h3>
                    <input type="email" name="email" value={data.email} placeholder="College Email" onChange={handleChange}></input>
                </div>

                <div className="password">
                    <h3>Password</h3>
                    <input type="password" name="password" value={data.password} placeholder="Password" onChange={handleChange}></input>
                </div>

                <button type="submit" className="form-btn" >Login</button>


                <p className="account-conf">
                    Don't have an account ? <Link to="/register">Register</Link>
                </p>

                {stateErr && <p className="error">{stateErr}</p>}

            </form>

        </div>
    );
}
export default Login;