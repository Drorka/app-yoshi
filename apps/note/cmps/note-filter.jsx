const { useState, useEffect, useRef } = React

import { noteService } from '../services/note.service.js'


export function NoteFilter( {onSetFilter} ) {

	const [filterBy, setFilterByToEdit] = useState(noteService.getDefaultFilter())
	const elInputRef = useRef(null)


	useEffect(() => {
		elInputRef.current.focus()
	}, [])


	useEffect(() => {
        onSetFilter(filterBy)
    }, [filterBy])


	function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value

        setFilterByToEdit((prevFilter) => {
            return {...prevFilter , [field]: value}
        })
    }


	function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterBy)
    }

	
	return <section className="note-filter">

			<form onSubmit={onSubmitFilter}>

				<i className="material-symbols-outlined">search</i>

				<input
					type="text"
					name="txt"
					placeholder="Search note"
					value={filterBy.txt}
					onChange={handleChange}
					ref={elInputRef}
				/>
			</form>

		</section>
}