import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail }) {
	const mailDate = utilService.getMailDate(mail.sentAt)

	const read = mail.isRead ? 'read' : 'unread'

	return (
		<article className={'mail-preview flex align-center ' + read}>
			<div className="mail-markers flex space-around">
				<span className="material-symbols-outlined">
					check_box_outline_blank
				</span>
				<span className="material-symbols-outlined">star</span>
				<span className="material-symbols-outlined">label_important</span>
			</div>
			<div className={'mail-sender ' + read}>{mail.from}</div>
			<div className={'mail-subject ' + read}>{mail.subject}</div>
			<div className="mail-body">- {mail.body}</div>
			<div className={'mail-date ' + read}>{mailDate}</div>
			<div className="mail-quick-crudl">
				<span class="material-symbols-outlined">delete</span>
				<span class="material-symbols-outlined">drafts</span>
			</div>
		</article>
	)
}
