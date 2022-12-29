const { useNavigate } = ReactRouterDOM

export function MailSidebar() {
	const navigate = useNavigate()

	function onGoToFolder() {
		console.log('go to', event.target.innerText)
		const folder =
			event.target.innerText.toLowerCase() === 'inbox'
				? ''
				: event.target.innerText.toLowerCase()
		navigate(`/mail/${folder}`)
	}

	return (
		<section className="mail-sidebar flex flex-column align-center">
			<div
				className="mail-sidebar-inbox flex align-center"
				onClick={() => onGoToFolder()}
			>
				<div className="mail-sidebar-inbox-icon">
					<span className="material-symbols-outlined">inbox</span>{' '}
				</div>
				<div className="mail-sidebar-inbox-txt">Inbox</div>
			</div>
			<div
				className="mail-sidebar-sent flex align-center"
				onClick={() => onGoToFolder()}
			>
				<div className="mail-sidebar-sent-icon">
					<span className="material-symbols-outlined">send</span>{' '}
				</div>
				<div className="mail-sidebar-sent-txt">Sent</div>
			</div>
			<div
				className="mail-sidebar-drafts flex align-center"
				onClick={() => onGoToFolder()}
			>
				<div className="mail-sidebar-drafts-icon">
					<span className="material-symbols-outlined">draft</span>{' '}
				</div>
				<div className="mail-sidebar-drafts-txt">Drafts</div>
			</div>
			<div
				className="mail-sidebar-trash flex align-center"
				onClick={() => onGoToFolder()}
			>
				<div className="mail-sidebar-trash-icon">
					<span className="material-symbols-outlined">delete</span>{' '}
				</div>
				<div className="mail-sidebar-trash-txt">Trash</div>
			</div>
		</section>
	)
}
