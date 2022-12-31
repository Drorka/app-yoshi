import { noteService } from './../services/note.service.js'

const { useState } = React

export function NoteTxt( {info, editText} ) {
    console.log('txt note', info);

	const [noteToEdit, setNoteToEdit] = useState()


	function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value

        setFilterByToEdit((prevFilter) => {
            return {...prevFilter , [field]: value}
        })
    }

	// const [filterBy, setFilterByToEdit] = useState(noteService.getDefaultFilter())

	// useEffect(() => {
    //     onSetFilter(filterBy)
    // }, [filterBy])


	// function handleChange({ target }) {
    //     let { value, name: field, type } = target
    //     value = (type === 'number') ? +value : value

    //     setFilterByToEdit((prevFilter) => {
    //         return {...prevFilter , [field]: value}
    //     })
    // }


	// function onSubmitFilter(ev) {
    //     ev.preventDefault()
    //     onSetFilter(filterBy)
    // }


    return <div className="note-content-txt" >


            <h1
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="note-content-txt-title"
				onChange={handleChange}
				value={info.title}
				onBlur={() => editText(note, noteTitle)}
				> {info.title}</h1>


			<p
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="note-content-txt-text"
				onChange={handleChange}
				value={info.txt}
				onBlur={() => editText(note, noteTxt)}
				> 
				{info.txt}
			</p>

		</div>
}
