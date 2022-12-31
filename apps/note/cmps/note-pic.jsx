
export function NotePic( {info} ) {


	function handleChange({target}) { 

    }


    function onSubmitTxt(ev) {

    }

    return <div className="note-content-pic" >


            <h1
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="note-content-pic-title"
				onChange={handleChange}
				value={info.title}
				onBlur={() => onSubmitTxt(noteToEdit.id)}
				> {info.title}</h1>

			<img src={info.url} alt="" />

		</div>
}