import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'
import '../styles/App.css'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const NavBar = ({onLoginChange, loginState}) => {

    const [buttons,setButtons] = useState()

    const deleteCookie = () => {
        Cookies.remove('authToken')
        onLoginChange(false)
    }

    useEffect(() => {
        setButtons(loginState ?
            <>
                <NavLink style={{ textDecoration: 'none' }} to='/profile'><li className='nav-items btn-hover'>PROFILE</li></NavLink>
                <NavLink onClick={deleteCookie} style={{ textDecoration: 'none' }} to='/'><li className='nav-items btn-hover'>LOGOUT</li></NavLink>
            </> :
            <>
                <NavLink style={{ textDecoration: 'none' }} to='/login'><li className='nav-items btn-hover'>LOGIN</li></NavLink>
                <NavLink style={{ textDecoration: 'none' }} to='/register'><li className='nav-items btn-hover'>REGISTER</li></NavLink>
                
            </>)
    }, [loginState])


    return (
        <nav className="navbar">
            <img className='logo' src='/public/logo_outlined.png' alt='Logo'/>
            <ul className='nav-list'>
                <NavLink style={{ textDecoration: 'none' }} to='/'><li className='nav-items btn-hover'>HOME</li></NavLink>
                {buttons}
            </ul>
        </nav>
    )
}

export default NavBar