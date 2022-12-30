const { useState, Fragment } = React

import { noteService } from '../services/note.service.js'

import { NoteColor } from './note-color.jsx'


export function NotePreview( { note, deleteNote, duplicateNote, pinNote, editText, onChangeColor } ) {

	const pinnedClass = note.isPinned ? 'pinned' : 'not-pinned'
	const [noteText, setNoteText] = useState(note.txt)


	const [toggleColors, setToggleColors] = useState(false)


	function onPinNote(noteId) {
		pinNote(noteId)
	}


	function changeHandle({ target }) {
	  const { value } = target
	  setNoteText(value)
	}


	function colorsClose() {
        setToggleColors(false)
    }

	function onColorsOpen(noteId) {
		console.log(onColorsOpen, noteId);
	}


	return <Fragment>
	<section className="note-preview" style={{ backgroundColor: note.style.backgroundColor }} >

		<div className="note-content" >

			<h1>{note.info.title}</h1>

			<h2>{note.info.label}</h2>

			<div
				contentEditable="true"
				className="note-text"
				onChange={changeHandle}
				value={noteText}
				onBlur={() => editText(note, noteText)}
				> 
				{note.info.txt}
			</div>

			<img src={note.info.url} alt="" />

		</div>


		<button className={'material-symbols-outlined pin-btn ' + pinnedClass}
		onClick={() => onPinNote(note.id)} >push_pin</button>

		<div className="note-editor">

			<button className="material-symbols-outlined"
			onClick={() => duplicateNote(note.id)} >file_copy</button>

			{/* <button className="material-symbols-outlined"
			onClick={() => onColorsOpen(note.id)}>palette</button> */}

			<button className="material-symbols-outlined"
			onClick={() => setToggleColors(!toggleColors)}>palette</button>
				{toggleColors && <NoteColor note={note}  onChangeColor={onChangeColor} colorsClose={colorsClose}/>}

			<button className="material-symbols-outlined" onClick={() => deleteNote(note.id)} >delete</button>
			
		</div>

	</section>
</Fragment>
}