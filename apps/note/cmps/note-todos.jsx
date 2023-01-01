
export function NoteTodos( {info}) {


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


    return <div className="note-content-todos" >

             <h1
	 			contentEditable={true}
	 			suppressContentEditableWarning={true}
	 			className="note-content-todos-title"
	 			onChange={handleChange}
	 			value={info.title}
	 			onBlur={() => onSubmitTxt}
	 			>{info.title}</h1>

			<ul className="note-content-todos-list">
				{
				info.todos.map(todo => <li key={todo.todoId}
					contentEditable={true}
	 				suppressContentEditableWarning={true}
					onChange={handleChange}
					value={todo.txt}
					onBlur={() => onSubmitTxt}>{todo.txt}</li>)
				}
			</ul>

	 	</div>
}