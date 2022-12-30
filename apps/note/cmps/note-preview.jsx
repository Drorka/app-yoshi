const { useState, Fragment } = React

import { noteService } from '../services/note.service.js'


export function NotePreview( { note, deleteNote, duplicateNote, pinNote, editText } ) {

	const pinnedClass = note.isPinned ? 'pinned' : 'not-pinned'
	const [noteText, setNoteText] = useState(note.txt)


	function onPinNote(noteId) {
		pinNote(noteId)
	}


	function changeHandle({ target }) {
	  const { value } = target
	  setNoteText(value)
	}


	return <Fragment>
	<section className="note-preview">

		<div className="note-content">

			<h1>{note.info.title}</h1>

			<h2>{note.info.label}</h2>

			<textarea
				className="note-text"
				onChange={changeHandle}
				onBlur={() => editText(note, noteText)}
				>
				{noteText}
			</textarea>

			<p>{note.info.txt}</p>

			<img src={note.info.url} alt="" />

		</div>


		<button className={'material-symbols-outlined pin-btn ' + pinnedClass}
		onClick={() => onPinNote(note.id)} >push_pin</button>

		<div className="note-editor">

			<button className="material-symbols-outlined"
			onClick={() => duplicateNote(note.id)} >file_copy</button>

			<button className="material-symbols-outlined">palette</button>

			<button className="material-symbols-outlined" onClick={() => deleteNote(note.id)} >delete</button>
			
		</div>

	</section>
</Fragment>
}