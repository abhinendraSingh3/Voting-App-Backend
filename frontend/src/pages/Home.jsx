import './Home.css'
import { Link } from 'react-router-dom';
function Home() {

  const isLoggedInUser = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <div className="home-main">

      <div className="home-content">
        <h1>Secure Digital Voting</h1>
        <h1>System for our College</h1>

        <p className="sub-heading">
          Vote easily. Vote securely. Make your vote count.
        </p>
        {!isLoggedInUser ? (
          <div className="home-buttons">
            <Link to="/register" className="btn-register">Register</Link>
            <Link to="/login" className="btn-login">Login</Link>
          </div>) : (
            <>
            </>
          )}

      </div>

    </div>
  );
}

export default Home;