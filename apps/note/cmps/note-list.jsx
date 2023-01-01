import { noteService } from '../services/note.service.js'

import { NotePreview } from './note-preview.jsx'


export function NoteList( { notes, deleteNote, duplicateNote, pinNote, onChangeColor} ) {

    return <section className="note-list">

            {
            notes.map((note) => (
				<div key={note.id}>
					<NotePreview 
                    note={note} 
                    deleteNote={deleteNote} 
                    duplicateNote={duplicateNote}
                    pinNote={pinNote}
                    onChangeColor={onChangeColor}
                    />
				</div>
			))
            }

    </section>
}