import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail }) {
	const mailDate = utilService.getMailDate(mail.sentAt)

	return (
		<article className="mail-preview flex">
			<div className="mail-markers">
				<button className="btn-mail-marker">
					<span className="material-symbols-outlined">
						check_box_outline_blank
					</span>
				</button>
				<button className="btn-mail-marker">
					<span className="material-symbols-outlined">star</span>
				</button>
				<button className="btn-mail-marker">
					<span className="material-symbols-outlined">label_important</span>
				</button>
			</div>
			<div className="mail-sender">{mail.from}</div>
			<div className="mail-subject">{mail.subject}</div>
			<div className="mail-body">- {mail.body}</div>
			<div className="mail-date">{mailDate}</div>
			<div className="mail-quick-crudl"></div>
		</article>
	)
}
