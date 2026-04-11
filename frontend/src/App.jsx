import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './Components/Footer'
import Home from './pages/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard'
import Events from './pages/Events'
import Results from './pages/Results'
import Candidate from './pages/Candidate'
import WinnerPage from './Components/WinnerSeperatePage/WinnerPage'
import Logout from './pages/Logout/Logout'

//navbar after login
import NavbarAlogin from './Components/NavbarAlogin'
import { useState, useEffect } from 'react';
//navbar before login
import NavbarBlogin from './Components/NavbarBlogin'
import SideBar from './Components/SideBar'

function App() {

  // const isLoggedInUser=localStorage.getItem('isLoggedIn');

  //this is for if the value is updated then it should dynamically been set like it should not ask for reload
  // With this:
  const [isLoggedInUser, setIsLoggedInUser] = useState(localStorage.getItem('isLoggedIn'));

  // Add this so other components can trigger a re-render:
  useEffect(() => {
    const handleStorage = () => setIsLoggedInUser(localStorage.getItem('isLoggedIn'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);


  return (
    <Router>
      {!isLoggedInUser ? (
        <>
          <NavbarBlogin
            //props
            navLinks={[
              { label: 'Home', url: '/' },
              { label: 'About', url: '/about' },
              { label: 'Contact', url: '/contact' },
            ]}
            brandName={"College Voting Portal"}
          />

          <Routes>
            {/* Think of it like a map that says: "When URL is X, show Y component" */}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* <Route path="*" element={<Home />} /> */}
          </Routes>
          <Footer />
        </>

      ) : (
        // after login
        <>
          <NavbarAlogin
            navLinks={[
              { label: 'Home', url: '/' },
              { label: 'About', url: '/about' },
              { label: 'Contact', url: '/contact' },
            ]}
            brandName={"College Voting Portal"}
          />
          <Routes>
            {/* Think of it like a map that says: "When URL is X, show Y component" */}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/votingevents' element={<Events />} />
            <Route path='/results' element={<Results />} />
            <Route path='/candidates' element={<Candidate />} />
            <Route path='/winnerpage' element={<WinnerPage />} />
            <Route path='/logout' element={<Logout/>} />
          </Routes>
          <Footer />
        </>
      )}

    </Router>

  )
}

export default App;
