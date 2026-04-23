import { useState } from 'react';
import './Register.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Register() {

    const navigate = useNavigate();

    const [state, setState] = useState({
        name: "",
        email: "",
        studentid: "",
        department: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState(""); //for handling errors
    const [success, setSuccess] = useState("");

    function handleChange(e) {
        setError('');
        setSuccess('');
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async(e)=> {
         e.preventDefault();

        try {
            if (!state.name || !state.email || !state.studentid || !state.department) {
                setError("Enter all the required details")
                return;
            }
            if (state.password != state.confirmPassword) {
                setError("Kindly enter same password")
                return;
            }

            setError("");
            
            const res=await axios.post("http://localhost:5000/student/signup",state);

            console.log(res.data);

            console.log(state)
            if(res.data.success){
                
            setState({
                name: "",
                email: "",
                studentid: "",
                department: "",
                password: "",
                confirmPassword: ""
                
            })
            setSuccess("User registered SuccessFully !")

            //wait till 1500 sec then redirect page
            setTimeout(() => {
                navigate("/login");
            }, 1500);
            }
        }
        catch(err){
            console.log("Error occured in handle change",err);
            setError("Registration failed ! Internal Server Error")

        }
        

    }

    return (
        <div className="register-container">      
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register Yourself</h2>

                <input type="text" name="name" value={state.name} placeholder="Enter Your Name" onChange={handleChange}></input>
                <input type="email" name="email" value={state.email} placeholder="Enter your Email" onChange={handleChange}></input>
                <div className="row">
                    <input name="studentid" value={state.studentid} placeholder="studentid" onChange={handleChange} />
                    <input name="department" value={state.department} placeholder="Department" onChange={handleChange} />
                </div>
                <input type="password" name="password" value={state.password} placeholder="Enter your password" onChange={handleChange}></input>
                <input type="password" name="confirmPassword" value={state.confirmPassword} placeholder="Enter your confirm Password" onChange={handleChange}></input>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}

                <button type="submit" className="register-btn">Register</button>

                <p className="login-text">
                    Already have an account <Link to="/Login">Login</Link>
                </p>

            </form>
        </div>
    );
}
export default Register;