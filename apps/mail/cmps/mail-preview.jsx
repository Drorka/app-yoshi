const { useNavigate } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail }) {
	const navigate = useNavigate()

	const mailDate = utilService.getMailDate(mail.sentAt)

	const read = mail.isRead ? 'read' : 'unread'

	function onOpenMailDetails(mailId) {
		console.log('link me to mail details', mailId)
		navigate(`/mail/${mailId}`)
	}

	return (
		<article
			className={'mail-preview flex align-center ' + read}
			onClick={() => onOpenMailDetails(mail.id)}
		>
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
				<span className="material-symbols-outlined" title="Move to trash">
					delete
				</span>
				<span className="material-symbols-outlined" title="Mark as read">
					drafts
				</span>
			</div>
		</article>
	)
}
