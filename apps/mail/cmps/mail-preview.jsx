const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'

export function MailPreview({
	mail,
	onMoveMailTo,
	onMarkAs,
	setIsMailDetailsActive,
	setMailDetailsToOpen,
}) {
	const navigate = useNavigate()
	// prepare preview data
	const mailDate = utilService.getMailDate(mail.sentAt)
	const read = mail.isRead ? 'read' : 'unread'
	const markAsSymbol = mail.isRead ? 'mail' : 'drafts'

	function onOpenMailDetails(mailId) {
		console.log('link me to mail details', mailId)
		setMailDetailsToOpen(mailId)
		setIsMailDetailsActive(true)
		// navigate(`/mail/${mailId}`)
	}

	return (
		<article className={'mail-preview flex align-center ' + read}>
			<div className="mail-markers flex space-around">
				<span className="material-symbols-outlined">
					check_box_outline_blank
				</span>
				<span className="material-symbols-outlined">star</span>
				<span className="material-symbols-outlined">label_important</span>
			</div>
			<div
				className={'mail-sender ' + read}
				onClick={() => onOpenMailDetails(mail.id)}
			>
				{mail.sender}
			</div>
			<div
				className={'mail-subject ' + read}
				onClick={() => onOpenMailDetails(mail.id)}
			>
				{mail.subject}
			</div>
			<div className="mail-body" onClick={() => onOpenMailDetails(mail.id)}>
				- {mail.body}
			</div>
			<div className={'mail-date ' + read}>{mailDate}</div>
			<div className="mail-quick-crudl">
				<span
					className="material-symbols-outlined move-to-trash-icon"
					onClick={() => onMoveMailTo(mail.id, 'trash')}
					title="Move to trash"
				>
					delete
				</span>
				<span
					className="material-symbols-outlined mark-as-icon"
					onClick={() => onMarkAs(mail.id)}
				>
					{markAsSymbol}
				</span>
			</div>
		</article>
	)
}
