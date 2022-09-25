import '../styles/Auth.css'
import '../styles/App.css'
import { useNavigate } from 'react-router-dom'

import {useState, useEffect} from 'react'
const Register = ({onLoginChange}) => {
    const navigate = useNavigate()

    const [formChange, setFormChange] = useState({})
    const handleChange = (key, value) => {
        setFormChange({
            ...formChange,
            [key]: value
        })
    }

        const postUser = async () => {
            let req = await fetch('https://fast-journey-88485.herokuapp.com/auth/signup', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formChange)
            })
            let res = await req.json()
            console.log(res)
            let tommorow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
            document.cookie = `hash=${res.hashed_user}; expires=` + tommorow.toUTCString()
        }
        //Change cookie
        
        const handleSubmit = (e) => {
            e.preventDefault()
            postUser()
            onLoginChange(true)
            navigate('/profile')
        }
    return (
        <div className="auth reg">
            <div className='auth-container reg-con'>
                <div>
                    <img src='auth-pic.svg'/>
                </div>
                <form onSubmit={handleSubmit}>
                <h3>Register</h3>
                    <input type='username'required name='username' placeholder='username' onChange={(e)=> {handleChange(e.target.name, e.target.value)}}/>
                    <input type='email' name='email' required placeholder='email'onChange={(e)=> {handleChange(e.target.name, e.target.value)}}/>
                    <input type='password' name='password' required placeholder='password'onChange={(e)=> {handleChange(e.target.name, e.target.value)}}/>
                    <button>Register</button>
                <h4>Already have an account? <span>LOGIN</span></h4>
                </form>
            </div>
        </div>
    )
    }
    
    export default Register