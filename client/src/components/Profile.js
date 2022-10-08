import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/Profile.css'
import '../styles/App.css'
import Cookies from 'js-cookie'

const Profile = ({ loginState }) => {
    const [entries, setEntries] = useState([])
    const [selectedEntry, setSelectedEntry] = useState({
        title:"Select an entry"
    })
    const [refresh, setRefresh] = useState(false)

    let navigate = useNavigate()

    const getEntries = async () => {
        let authToken = Cookies.get('authToken')
        try {
            const req = await fetch(`/entries/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: authToken })
            })
            const res = await req.json()
            setEntries(res)
        }
        catch {
            if (!loginState) navigate('/login')
        }
    }


    useEffect(() => {
        getEntries()
    }, [refresh])

    const handleEntryLiClick = (e) => {
        setSelectedEntry(entries[e.target.id])
    }

    const handleDeleteClick = async () => {
        window.confirm('Delete Entry?') ? await fetch(`/entries/delete/${selectedEntry.id}`, { method: "DELETE" }) : 
        getEntries()
        setSelectedEntry({ title: "Select an entry" })
        setRefresh(prev => !prev)
    }

    const formatCreatedAt = (entry) => {
        try {
            let created_atDateSplit = entry.created_at.split('T')[0].split('-')
            return (created_atDateSplit[1] + "/" + created_atDateSplit[2] + "/" + created_atDateSplit[0])
        }
        catch {
        }
    }

    const entries_lis = (entries) => {
        return entries.length !== 0 ?
            entries.map((entry, index) => <li key={entry.id} className='profile-entry'>
                <span className='profile-entry-date'>{formatCreatedAt(entry)}</span> | <span className='profile-entry-title' onClick={handleEntryLiClick}><b id={index}>{entry.title}</b></span>
            </li>) :
            <li id='no-entries'>You have no entries</li>
    }
    const buttonStyles = {
        alignItems: "center",
        backgroundColor: "#73A9AD",
        border: "3px solid #A1E6EB",
        borderRadius: "2px",
        color: "white",
        display: "inline-block",
        fontSize: "large",
        justifyContent: "center",
        textAlign: "center",
        textDecoration: 'none',
        width: "30%"
    }
    return (
        <>
            <div className='profile-container'>
                <div id="profile-entries-list-container">
                    <h3 id='profile-entries-label'>Entries</h3>
                    <ul className='entries-list'>
                        {entries_lis(entries)}
                    </ul>
                    <NavLink
                        className="profile-navlink-new-entry"
                        style={buttonStyles}
                        to='/entry'>
                        New Entry
                    </NavLink>
                </div>
                <div id='profile-selected-entry-container'>
                    <h3 className='profile-selected-entry-title'>{selectedEntry.title}</h3>
                    <small>{formatCreatedAt(selectedEntry)}</small>
                    <p id='selected-entry-content'>{selectedEntry.content}</p>
                    {selectedEntry.id ?
                        (
                            <>
                                <button id="profile-entry-delete-button" onClick={handleDeleteClick}>Delete Entry</button>
                                <NavLink style={buttonStyles} to={`/entry/${selectedEntry.id}`}>Edit Entry</NavLink>
                            </>
                        ) :
                        null
                    }
                </div>

            </div>

        </>
    )
}

export default Profile