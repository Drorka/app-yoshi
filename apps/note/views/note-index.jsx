const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { Loader } from '../../../cmps/loader'
import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'

import { NoteAdd } from '../cmps/note-add.jsx'
import { NoteList } from '../cmps/note-list.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'
import { NoteSidebar } from '../cmps/note-sidebar.jsx'


export function NoteIndex() {

	const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
	const [notes, setNotes] = useState([])


	useEffect(() => {
		loadNotes()
	}, [filterBy])


	function loadNotes() {

		noteService.query(filterBy).then((notes) => {
			setNotes(notes)
		})
	}


	function onSetFilter(filterBy) {
		setFilterBy(filterBy)
	}


	function saveNote(noteToSave) {
		noteService.save(noteToSave)
			.then((noteToSave) => {
				const newNotes = notes.map(note => note.id === noteToSave.id ? noteToSave : note)
				newNotes.push(noteToSave)
				setNotes(newNotes)
			})
			.catch((err) => {
				console.log('err', err)
			})
    }


	function deleteNote(noteId) {
		noteService.remove(noteId)
			.then(() => {
				const updatedNotes = notes.filter(note => note.id !== noteId)
				setNotes(updatedNotes)
			})
            .catch((err) => {
                console.log('err:', err)
            })
    }


	function duplicateNote(noteId) {
		const noteIdx = notes.findIndex(note => note.id === noteId)

		const duplicateNote = { ...notes[noteIdx], id: '' }

		saveNote(duplicateNote)
	}


	function pinNote(noteId) {
		noteService.togglePinnedNote(noteId)
		loadNotes()
	}


	function onChangeColor(note, color) {
        noteService.changeColorNote(note.id, color)
		loadNotes()
    }

    
	return <section className="note-index">

		<NoteSidebar onSetFilter={onSetFilter} />

		<NoteFilter onSetFilter={onSetFilter} />

		<div className="note-index-add">
			<NoteAdd saveNote={saveNote} />
		</div>

		<div className="note-index-list">
			<NoteList 
				notes={notes} 
				deleteNote={deleteNote} 
				duplicateNote={duplicateNote} 
				pinNote={pinNote}
				onChangeColor={onChangeColor}
				/>
		</div>

	</section>

}
