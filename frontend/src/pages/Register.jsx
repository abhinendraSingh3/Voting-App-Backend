import { useState } from 'react';
import './Register.css'
import { Link } from 'react-router-dom';

function Register() {

    const [state, setState] = useState({
        name: "",
        email: "",
        studentId: "",
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
    function handleSubmit(e) {
        e.preventDefault();

        if (!state.name || !state.email || !state.studentId || !state.department) {
            setError("Enter all the required details")
            return;
        }
        if (state.password != state.confirmPassword) {
            setError("Kindly enter same password")
            return;
        }

        setError("");
        console.log(state);
        setSuccess("User registered SuccessFully !")
        setState({
            name: "",
            email: "",
            studentId: "",
            department: "",
            password: "",
            confirmPassword: ""
        })

    }

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>

                <input type="text" name="name" value={state.name} placeholder="Enter Your Name" onChange={handleChange}></input>
                <input type="email" name="email" value={state.email} placeholder="Enter your Email" onChange={handleChange}></input>
                <div className="row">
                    <input name="studentId" value={state.studentId} placeholder="StudentId" onChange={handleChange} />
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