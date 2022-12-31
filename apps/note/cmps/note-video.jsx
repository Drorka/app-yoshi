
export function NoteVideo( {info} ) {


	function handleChange({target}) { 

    }


    function onSubmitTxt(ev) {

    }

    return <div className="note-content-video" >

            <h1
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="note-content-video-title"
				onChange={handleChange}
				value={info.title}
				onBlur={() => onSubmitTxt(noteToEdit.id)}
				> {info.title}</h1>

			<iframe width="100%"
				src={`https://www.youtube.com/embed/${info.url}`}>
			</iframe>

		</div>
}