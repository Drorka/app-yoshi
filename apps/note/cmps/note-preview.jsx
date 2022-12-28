
export function NotePreview( { notes } ) {
	console.log(notes);

	return <section className="note-preview">

	<div 
	className={`${note.type}`}>

		<h1>{note.info.title}</h1>
		<p>{note.info.txt}</p>

	</div>

</section>
}