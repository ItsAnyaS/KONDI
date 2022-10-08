import '../styles/Auth.css'
import '../styles/App.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = ({ onLoginChange }) => {
    const [data, setData] = useState({})
    let navigate = useNavigate()
    const getData = async () => {
        let req = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        let res = await req.json()
        if (req.ok){
            Cookies.set('authToken', res.auth_token)
            onLoginChange(true)
            navigate('/profile')
        }else {
            window.Error("Invalid username or password")
        }
    }

    const handleChange = (key, value) => {
        setData({
            ...data,
            [key]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getData()
      
    }


    return (
        <div className="auth">
            <div className='auth-container login'>
                <h3>LOGIN</h3>
                <hr />
                <form onSubmit={handleSubmit}>
                    <input type='text' name='username' placeholder='username' onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    <input type='password' placeholder='password' name='password' onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    <button>LOGIN</button>
                </form>
                <h4>Don't have an account? <span>REGISTER</span></h4>
            </div>
        </div>
    )
}

export default Login