const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'

import { MailSidebar } from '../cmps/mail-sidebar.jsx'

export function MailDetails() {
	const [mail, setMail] = useState(null)
	const { mailId } = useParams()

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
				// navigate('/book')
			})
	}

	if (!mail) return <div>Loading...</div>

	const fullMailDate = utilService.getFullMailDate(mail.sentAt)

	return (
		<section className="mail-details full main-layout flex">
			<MailSidebar />
			<div className="mail-main-content">
				<div className="mail-details-title">
					<h2>{mail.subject}</h2>
				</div>

				<div className="mail-details-body-container flex">
					<div className="mail-details-sender-icon">
						<span className="material-symbols-outlined">account_circle</span>
					</div>
					<div className="mail-details-data-container flex flex-column">
						<div className="mail-details-data flex space-between">
							<div className="mail-details-sender">
								<span className="mail-details-sender-name">{mail.sender}</span>
								<span className="mail-details-sender-mail">
									&#60;{mail.from}&#62;
								</span>
							</div>
							<div className="mail-details-time">{fullMailDate}</div>
						</div>
						<div className="mail-details-body">{mail.body}</div>
					</div>
				</div>
			</div>
		</section>
	)
}
