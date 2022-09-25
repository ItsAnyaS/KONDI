import '../styles/Home.css'
import '../styles/App.css'
import {NavLink} from 'react-router-dom'
const Home = () => {
    return (
        <div className="home">
            <div className='hero'>
                <div className='hero-container'>
                <h3>Guard your dairy</h3>
                <p>Fully confidental, fully encrypted, fully protected.</p>
                <div className='button-container'>
                <NavLink style={{ textDecoration: 'none' }} to='/register'><button>Join now for Free</button></NavLink>
               
                </div>
                </div>
                <div className='hero-img-div'>
                    <img src="safe.svg"/>
                </div>
            </div>

        </div>
    )
}

export default Home