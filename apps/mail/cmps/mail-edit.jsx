export function MailEdit() {
	return (
		<section className="mail-edit-container">
			hello from compose
			<div className="mail-edit-title">
				<span className="mail-edit-title-txt">New Message</span>
				<span className="material-symbols-outlined mail-edit-title-icon">
					close
				</span>
			</div>
			<div className="mail-edit-content">
				<div className="mail-edit-receiver">
					<span>To</span>
				</div>
				<div className="mail-edit-subject">
					<span>Subject</span>
				</div>
				<div className="mail-edit-body"></div>
			</div>
			<div className="mail-edit-tools">
				<span>send</span>
				<span>delete</span>
			</div>
		</section>
	)
}
