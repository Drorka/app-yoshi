const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { storageService } from '../../../services/storage.service.js'
import { mailService } from '../services/mail.service.js'

import { MailSidebar } from '../cmps/mail-sidebar.jsx'

export function MailDetails() {
	const [mail, setMail] = useState(null)
	const { mailId } = useParams()
	console.log(mailId)

	useEffect(() => {
		console.log('use effect')
		loadMail()
	}, [])

	function loadMail() {
		console.log('load mail')

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

	return (
		<section className="mail-details full main-layout flex">
			<MailSidebar />
			<div className="mail-main-content">
				<div className="mail-details-title">
					<h2>{mail.subject}</h2>
				</div>
				<div className="mail-details-body">{mail.body}</div>
			</div>
		</section>
	)
}
