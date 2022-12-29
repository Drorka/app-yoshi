const { Fragment } = React

import { noteService } from '../services/note.service.js'


export function NotePreview( { note, deleteNote, duplicateNote } ) {

	// const isPinned = note.isPinned ? 'is-pinned' : 'is-not-pinned'


	return <Fragment>
	<section className="note-preview">

		<div className="note-content">

			<h1>{note.info.title}</h1>
			<h2>{note.info.label}</h2>
			<p>{note.info.txt}</p>
			<img src={note.info.url} alt="" />

		</div>


		<button className="material-symbols-outlined pin-btn" >push_pin</button>
		{/* <button className={'material-symbols-outlined pin-btn' + isPinned}>push_pin</button> */}

		<div className="note-editor">

			<button className="material-symbols-outlined"
			onClick={() => duplicateNote(note.id)} >file_copy</button>

			<button className="material-symbols-outlined">palette</button>

			<button className="material-symbols-outlined" onClick={() => deleteNote(note.id)} >delete</button>
			
		</div>

	</section>
</Fragment>
}