export function MailSidebar() {
	return (
		<section className="mail-sidebar flex flex-column align-center">
			<div className="mail-sidebar-inbox flex">
				<div className="mail-sidebar-inbox-icon">
					<span class="material-symbols-outlined">inbox</span>{' '}
				</div>
				<div className="mail-sidebar-inbox-txt">Inbox</div>
			</div>
			<div className="mail-sidebar-sent flex">
				<div className="mail-sidebar-sent-icon">
					<span class="material-symbols-outlined">send</span>{' '}
				</div>
				<div className="mail-sidebar-sent-txt">Sent</div>
			</div>
			<div className="mail-sidebar-drafts flex">
				<span class="material-symbols-outlined">draft</span>{' '}
				<div className="mail-sidebar-drafts-txt">Drafts</div>
			</div>
			<div className="mail-sidebar-trash flex">
				<span class="material-symbols-outlined">delete</span>{' '}
				<div className="mail-sidebar-trash-txt">Trash</div>
			</div>
		</section>
	)
}
