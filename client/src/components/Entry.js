import '../styles/Entry.css'
import { useParams, useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'

const Entry = () => {
    const [formData, setFormData] = useState({
        title:'',
        content:'',
        user_id: document.cookie.split('=')[1] //TODO: CHANGE TO GET FROM SESSION INFORMATION
    })

    let params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            let req = await fetch(`https://fast-journey-88485.herokuapp.com/entries/edit/${params.entryid}`)
            let res = await req.json()
            setFormData(res)
        }
        if(params.entryid) {getData()}
    }, [])

    const handleInputChange = (e) =>{
        const key= e.target.name
        const value = e.target.value
        setFormData({...formData, [key]:value})
    }

    const handleDiscard = (e) =>{
        e.preventDefault()
        window.confirm('Discard Changes?') ? navigate('/profile'): console.log('No Discard')
    }

    const handleSave = async (e) =>{
        e.preventDefault()
        let url = params.entryid ? `https://fast-journey-88485.herokuapp.com/entries/edit/${params.entryid}` : `https://fast-journey-88485.herokuapp.com/entries/`
        let method = params.entryid? 'PATCH': 'POST'
        const req = await fetch(url, {
            method: method,
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        })
        const res = await req.json()
        navigate('/profile')
    }

    return (
        <div className="entry">
            <form className="entry-form">
                <input 
                    type='text' 
                    className="entry-title" 
                    placeholder="Title" 
                    onChange={handleInputChange}
                    value={formData.title}
                    name='title' 
                    />
                <textarea 
                    className="entry-main-content" 
                    placeholder="Add an entry..."
                    onChange={handleInputChange} 
                    value={formData.content} 
                    name='content'/>
                <div className="entry-btn-container">
                    <button className="btn-hover" onClick={handleDiscard}>Discard</button>
                    <button className="btn-hover" onClick={handleSave}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default Entry