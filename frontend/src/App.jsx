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

//navbar before login
import NavbarAlogin from './Components/NavbarAlogin'

//navbar after login
import NavbarBlogin from './Components/NavbarBlogin'
import SideBar from './Components/SideBar'


function App() {
  const isLoggedInUser=localStorage.getItem('isLoggedIn')==='true';


  return (
    <Router>

    {/* before login */}
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
  
    ):(
      // after login
      <>
      <NavbarAlogin
        navLinks={[
          { label: 'Home', url: '/' },
          { label: 'About', url: '/about' },
          { label: 'Contact', url: '/contact' },
          { label: 'Dashboard', url: '/dashboard' },
        ]}
        brandName={"College Voting Portal"}
      />


      <Routes>
        {/* Think of it like a map that says: "When URL is X, show Y component" */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/votingEvents' element={<Events />} />
        <Route path='/results' element={<Results />} />
        <Route path='/candidates' element={<Candidate />} />
        <Route path='/winnerpage' element={<WinnerPage />} />


      </Routes>
      <Footer />
      </>

    )}

    </Router>

  )}

export default App
