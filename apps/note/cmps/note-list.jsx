import { noteService } from '../services/note.service.js'

import { NotePreview } from './note-preview.jsx'


export function NoteList( { notes, deleteNote } ) {

    return <section className="note-list">

            {
            notes.map((note) => (
				<div key={note.id}>
					<NotePreview note={note} deleteNote={deleteNote} />
				</div>
			))
            }

    </section>
}