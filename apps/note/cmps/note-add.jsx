const {useState} = React

import { noteService } from '../services/note.service.js'


export function NoteAdd( {saveNote}) {

    const [noteToSave , setNoteToSave] = useState(noteService.getEmptyNote())


    function handleChange( { target } ) {
      let { value, name: field } = target

      setNoteToSave((prevNote) => 
        ({ ...prevNote, info: { [field]: value } }))
    } 


    function onSaveNote(ev) {
        ev.preventDefault()
        saveNote(noteToSave)
    }


    return <section className="note-add">

        <form onSubmit={onSaveNote}>

            <input type="note-txt" 
            name="txt"
            placeholder="Write something..."
            value={noteToSave.info.txt}
            onChange={handleChange} />

            <div className="input-btns">

              <button onClick={onSaveNote} className="material-symbols-outlined">priority</button>

              <button onClick={onSaveNote} className="material-symbols-outlined">image</button>

              <button onClick={onSaveNote} className="material-symbols-outlined">videocam</button>

            </div>
        </form>

  </section>

}