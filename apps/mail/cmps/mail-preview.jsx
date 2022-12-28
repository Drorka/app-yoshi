import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail }) {
	const mailDate = utilService.getMailDate(mail.sentAt)

	return (
		<article className="mail-preview flex">
			<div className="mail-markers">
				<button className="btn-mail-marker">&#9744;</button>
				<button className="btn-mail-marker">&#9734;</button>
				<button className="btn-mail-marker">&#9750;</button>
			</div>
			<div className="mail-sender">{mail.from}</div>
			<div className="mail-subject">{mail.subject}</div>
			<div className="mail-body">{mail.body}</div>
			<div className="mail-date">{mailDate}</div>
			<div className="mail-quick-crudl"></div>
		</article>
	)
}
