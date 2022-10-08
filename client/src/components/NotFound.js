import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
const NotFound = () => {
    const navigate = useNavigate()

    useEffect(()=> {

        navigate('/')
    })
    return (
        <div> 404 not found</div>
    )
}

export default NotFound