
export function NotePreview( { note } ) {

	return <section className="note-preview">

	<div>

		<h1>{note.info.title}</h1>
		<p>{note.info.txt}</p>

	</div>

	</section>
}