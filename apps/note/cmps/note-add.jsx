const {useState , useEffect} = React

import { noteService } from '../services/note.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'


export function NoteAdd() {

    const [noteToSave , setNoteToSave] = useState(noteService.getEmptyNote())

    useEffect(() =>{
      loadBook()
    } , [])


  function loadBook() {
    noteService.get()
      .then((note) => setNoteToSave(note))
  }


    function handleChange( { target } ) {
      let { value, name: field } = target
      console.log(target);
      setNoteToSave((prevNote) => 
        ({ ...prevNote, info: { [field]: value } }))
    } 


    function onSaveNote(ev) {
        ev.preventDefault()

        noteService.save(noteToSave)
          .then((noteToSave) => {
            console.log('note saved', noteToSave)
      })
    }


    return <section className="note-add">

        <form onSubmit={onSaveNote}>

            <input type="text" 
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