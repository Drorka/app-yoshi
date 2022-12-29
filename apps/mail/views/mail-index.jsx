const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

import { MailSidebar } from '../cmps/mail-sidebar.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailList } from '../cmps/mail-list.jsx'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function MailIndex() {
	const [isLoading, setIsLoading] = useState(false)
	const [filterBy, setFilterBy] = useState(mailService.getDefaultCriteria())
	const [mails, setMails] = useState([])

	useEffect(() => {
		loadMails()
	}, [filterBy])

	function loadMails() {
		setIsLoading(true)
		mailService.query(filterBy).then((mails) => {
			setMails(mails)
			setIsLoading(false)
		})
	}

	function onSetFilter(filterBy) {
		setFilterBy(filterBy)
	}

	function onRemoveMail(mailId) {
		console.log('remove this mail', mailId)
		mailService
			.remove(mailId)
			.then(() => {
				const updatedMails = mails.filter((mail) => mail.id !== mailId)
				setMails(updatedMails)
				// showSuccessMsg('Mail removed')
			})
			.catch((err) => {
				console.log('Had issues removing', err)
				// showErrorMsg('Could not remove mail')
			})
	}

	function onMoveMailToTrash(mailId) {
		console.log('move this mail to trash', mailId)
		mailService
			.remove(mailId)
			.then(() => {
				const updatedMails = mails.filter((mail) => mail.id !== mailId)
				setMails(updatedMails)
				// showSuccessMsg('Mail removed')
			})
			.catch((err) => {
				console.log('Had issues removing', err)
				// showErrorMsg('Could not remove mail')
			})
	}

	return (
		<section className="mail-index full main-layout flex">
			<MailSidebar />
			<div className="mail-main-content">
				<MailFilter onSetFilter={onSetFilter} />

				{/* <Link to="/mail/edit">Add Book</Link> */}

				{!isLoading && (
					<MailList mails={mails} onMoveMailToTrash={onMoveMailToTrash} />
				)}
				{isLoading && <div>Loading..</div>}
				{!mails.length && <div>No mails to show..</div>}
			</div>
		</section>
	)
}
