import { noteService } from '../services/note.service.js'

import { NotePreview } from './note-preview.jsx'


export function NoteList( { notes } ) {
    console.log(notes);

    return <section className="note-list">

        <h1>Note List</h1>

        <NotePreview notes={notes} />

        {/* {
            notes.map(note => <li key={note.id}>
                <NotePreview car={note} />
                <div>
                    <button onClick={() => onRemoveCar(note.id)}>Remove</button>
                    <Link to={`/car/${note.id}`}>Details</Link> | 
                    <Link to={`/car/edit/${note.id}`}> Edit</Link>
                </div>
        } */}


  </section>
}