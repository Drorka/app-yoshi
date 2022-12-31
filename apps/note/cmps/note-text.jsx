const { useState, useEffect } = React

import { noteService } from './../services/note.service.js'


export function NoteTxt( {info, editText} ) {

	const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())


    useEffect(() =>{
		console.log('useEffect');
        loadBook()
    } , [])


    function loadBook() {
		console.log('loadBook');
        noteService.get(noteId)
        .then((note) => setNoteToEdit(note))
        .catch((err) =>{
            console.log('err' ,err)
        })
    }


    function handleChange({target}) { 
		console.log('handleChange');  
        let {value , type , name:field} = target
        value = type ==='number' ? +value : value
        setNoteToEdit((prevNote) => ({...prevNote , [field] : value}))
    }


    function onSubmitTxt(ev) {
		console.log('onSubmitTxt');
        ev.preventDefault()
        noteService.save(noteToEdit).then((note)=>{
            console.log('note', note)
        })
    }



    return <div className="note-content-txt" >


            <h1
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="note-content-txt-title"
				onChange={handleChange}
				value={info.title}
				onBlur={() => onSubmitTxt(noteToEdit.id)}
				> {info.title}</h1>


			<p
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="note-content-txt-text"
				onChange={handleChange}
				value={info.txt}
				onBlur={() => onSubmitTxt(noteToEdit.id)}
				> 
				{info.txt}
			</p>

		</div>
}
