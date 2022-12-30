const { useEffect, useState } = React

import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'

export function MailDetailsDynamic({ mails, mailDetailsToOpen, markAsRead }) {
	console.log('hello from details')
	const [mail, setMail] = useState(null)
	const mailId = mailDetailsToOpen
	const mailsInFolder = mails

	useEffect(() => {
		loadMail()
	}, [])

	function loadMail() {
		mailService
			.get(mailId)
			.then((mail) => setMail(mail))
			.catch((err) => {
				console.log('Had issues in mail details', err)
				// showErrorMsg('Cannot load mail')
			})
	}
	if (!mail) return <div>Loading...</div>

	const fullMailDate = utilService.getFullMailDate(mail.sentAt)

	markAsRead(mailId)

	return (
		<section className="mail-details full main-layout ">
			<div className="mail-details-title">
				<h2>{mail.subject}</h2>
			</div>

			<div className="mail-details-body-container flex">
				<div className="mail-details-sender-icon">
					<span className="material-symbols-outlined">account_circle</span>
				</div>
				<div className="mail-details-data-container flex flex-column">
					<div className="mail-details-data flex space-between">
						<div className="mail-details-sender-receiver">
							<div className="mail-details-sender">
								<span className="mail-details-sender-name">{mail.sender}</span>
								<span className="mail-details-sender-mail">
									&#60;{mail.from}&#62;
								</span>
							</div>
							<div className="mail-details-receiver">
								<span className="mail-details-to">To:</span>{' '}
								<span className="mail-details-to-mail">{mail.to}</span>
							</div>
						</div>
						<div className="mail-details-time">{fullMailDate}</div>
					</div>
					<div className="mail-details-body">{mail.body}</div>
				</div>
			</div>
		</section>
	)
}
