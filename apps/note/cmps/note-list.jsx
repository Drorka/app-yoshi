import { noteService } from '../services/note.service.jsx'

import { NotePreview } from './note-preview.jsx'


export function NoteList( { notes } ) {

    return <section className="note-list">

        <h1>Note List</h1>

        <NotePreview />

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