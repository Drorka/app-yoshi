const {useState , useEffect} = React

import { noteService } from '../services/note.service.js'


export function NoteAdd() {

  const [noteToSave , setNoteToSave] = useState(noteService.createNote())


  function handleChange( { target } ) {
    let { value, name: field } = target

    setNoteToSave((prevNote) => ({ ...prevNote, [field]: value }))
    } 


    function onSaveNote(ev) {
        ev.preventDefault()

        noteService.save(noteToSave)
          .then((note) => {
            console.log('note saved')
      })
    }


    return <section className="note-add">

        <form onSubmit={onSaveNote}>

            <input type="text" 
            name="txt"
            placeholder="Write something..."
            value={noteToSave.txt}
            onChange={handleChange} />

            <div className="input-btns">

              <button onClick={onSaveNote} className="material-symbols-outlined">priority</button>

              <button onClick={onSaveNote} className="material-symbols-outlined">image</button>

              <button onClick={onSaveNote} className="material-symbols-outlined">videocam</button>

            </div>
        </form>

  </section>

}