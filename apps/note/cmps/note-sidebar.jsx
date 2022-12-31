const { useState, useEffect, useRef } = React

import { noteService } from '../services/note.service.js'


export function NoteSidebar( {onSetFilter} ) {

    const [filterBy, setFilterByToEdit] = useState(noteService.getDefaultFilter())


    useEffect(() => {
        onSetFilter(filterBy)
    }, [filterBy])


    function handleChange({ target }) {
        let { value, name: field, type } = target

        setFilterByToEdit((prevFilter) => {
            return {...prevFilter , [field]: value}
        })
    }


    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterBy)
    }

    return <section className="note-sidebar">
        
        <div className="sidebar-btns">

            <button onClick={handleChange} id="note-txt" className="material-symbols-outlined">description</button>

            <button onClick={onSubmitFilter} id="note-pic" className="material-symbols-outlined">priority</button>

            <button onClick={handleChange} id="note-video" className="material-symbols-outlined">image</button>

            <button onClick={handleChange} id="note-todos" className="material-symbols-outlined">videocam</button>

    </div>
 
</section>

}
