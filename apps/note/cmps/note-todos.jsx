
export function NoteTodos( {info}) {


	function handleChange({target}) { 

    }


    function onSubmitTxt(ev) {

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
				info.todos.map(todo => <li key={info.todos.todoId}>{info.todos.txt}</li>)
				}
			</ul>

	 	</div>
}