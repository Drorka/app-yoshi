const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { Loader } from '../../../cmps/loader'
import { noteService } from '../services/note.service.js'

import { NoteAdd } from '../cmps/note-add.jsx'
import { NoteList } from '../cmps/note-list.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'


export function NoteIndex() {

	const [isLoading, setIsLoading] = useState(false)
	const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
	const [notes, setNotes] = useState([])


	useEffect(() => {
		loadNotes()
	}, [filterBy])


	function loadNotes() {
		setIsLoading(true)

		noteService.query(filterBy).then((notes) => {
			setNotes(notes)
			setIsLoading(false)
		})
	}


	function onSetFilter(filterBy) {
		setFilterBy(filterBy)
	}

	function onRemoveNotes(noteId) {
		console.log('remove note', noteId)

		noteService
			.remove(noteId)
			.then(() => {
				const updatedNotes = notes.filter((note) => note.id !== noteId)
				setBooks(updatedNotes)
				showSuccessMsg('Removed')
			})

			.catch((err) => {
				console.log('Had issues removing', err)
				showErrorMsg('Could not remove')
			})
	}

    
    return <section className="note-index">

		<NoteFilter onSetFilter={onSetFilter} />

        <div className="note-index-add">
            <NoteAdd />
        </div>

        <div className="note-index-list">
			{!isLoading && <NoteList notes={notes} />}
			{isLoading && <div><Loader /></div>}
        </div>

  </section>

}
