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

            <div className="input-btns">

              <button onClick={onSubmitNote} className="material-symbols-outlined">priority</button>

              <button onClick={onSubmitNote} className="material-symbols-outlined">image</button>

              <button onClick={onSubmitNote} className="material-symbols-outlined">videocam</button>

            </div>
        </form>

  </section>

}