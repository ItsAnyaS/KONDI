import NavBar from './components/Navbar';
import './styles/App.css';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Entry from './components/Entry'
import Footer from './components/Footer';
import About from './components/About';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import { useState } from 'react';

function App() {

  const [loggedIn, setLoggedIn] = useState((document.cookie=='hash=' || document.cookie =='') ? false : true)

  const handleLoginChange = (bool) => {
    setLoggedIn(bool)
  }

  return (
    <div className="App">
      <Router>
        <NavBar onLoginChange={handleLoginChange} loginState={loggedIn} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login onLoginChange={handleLoginChange} />} />
          <Route path='/register'  element={<Register onLoginChange={handleLoginChange}/>} />
          <Route path='/signup' element={<Register onLoginChange={handleLoginChange}/>} />
          <Route path='/profile' element={<Profile loginState={loggedIn}/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/entry' element={<Entry />}>
          <Route path=':entryid' />
          </Route>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
