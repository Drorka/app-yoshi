const { Fragment } = React


export function NotePreview( { note } ) {

	return <Fragment>
	<section className="note-preview">

		<div className="note-content">

			<h1>{note.info.title}</h1>
			<p>{note.info.txt}</p>

		</div>

		<button className="material-symbols-outlined pin-btn">push_pin</button>

		<div className="note-editor">

			<button className="material-symbols-outlined">file_copy</button>

			<button className="material-symbols-outlined">palette</button>

			<button className="material-symbols-outlined">delete</button>
			
		</div>

	</section>
</Fragment>
}