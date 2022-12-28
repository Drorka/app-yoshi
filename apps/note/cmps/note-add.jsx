const {useState , useEffect} = React

import { noteService } from '../services/note.service.js'


export function NoteAdd() {

  const [noteToAdd , setNoteToAdd] = useState(noteService.createNote())


  function handleChange( { target } ) {
    let { value, name: field } = target

    setNoteToAdd((prevNote) => ({ ...prevNote, [field]: value }))
    } 


    function onSubmitNote(ev) {
        ev.preventDefault()
        noteService.save(noteToAdd)
    }


    return <section className="note-add">

        <form onSubmit={onSubmitNote}>

            <input type="text" 
            name="txt"
            placeholder="Write something..."
            value={noteToAdd.txt}
            onChange={handleChange} />

            <button onClick={onSubmitImg}></button>
            <button onClick={onSubmitVideo}></button>
            <button onClick={onSubmitTodos}></button>
        </form>

  </section>

}