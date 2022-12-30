import { mailService } from '../services/mail.service.js'

export function MailEdit({ setIsMailEditActive }) {
	function onCloseMailEdit() {
		setIsMailEditActive(false)
	}

	function onSendMail() {
		event.preventDefault()
		const mailTo = event.target.form[0].value
		const mailSubject = event.target.form[1].value
		const mailBody = event.target.form[2].value
		mailService
			.sendMail(mailSubject, mailBody, mailTo)
			.then(() => onCloseMailEdit())
	}

	return (
		<section className="mail-edit-container">
			<div className="mail-edit-title flex space-between align-center">
				<span className="mail-edit-title-txt">New Message</span>
				<span
					className="material-symbols-outlined mail-edit-title-close"
					onClick={() => onCloseMailEdit()}
				>
					close
				</span>
			</div>
			<form className="mail-edit-content">
				<div className="mail-edit-receiver">
					<textarea name="to" maxLength="55" placeholder="To"></textarea>
				</div>
				<div className="mail-edit-subject">
					<textarea
						name="subject"
						maxLength="55"
						placeholder="Subject"
					></textarea>
				</div>
				<div className="mail-edit-body">
					<textarea name="body"></textarea>
				</div>

				<div className="mail-edit-tools flex space-between align-center">
					<button className="mail-edit-send-btn" onClick={() => onSendMail()}>
						send
					</button>
					{/* <span className="material-symbols-outlined mail-edit-delete-btn">
						delete
					</span> */}
				</div>
			</form>
		</section>
	)
}
