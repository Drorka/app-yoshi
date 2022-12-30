const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

import { MailSidebar } from '../cmps/mail-sidebar.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailList } from '../cmps/mail-list.jsx'
import { MailDetailsDynamic } from '../cmps/mail-details-dynamic.jsx'
import { MailEdit } from '../cmps/mail-edit.jsx'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function MailIndex() {
	const [isLoading, setIsLoading] = useState(false)
	const [criteria, setCriteria] = useState(mailService.getDefaultCriteria())
	const [mails, setMails] = useState([])
	const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())

	const [isMailDetailsActive, setIsMailDetailsActive] = useState(false)
	const [mailDetailsToOpen, setMailDetailsToOpen] = useState(null)

	useEffect(() => {
		loadMails()
	}, [criteria])

	function loadMails() {
		setIsLoading(true)
		mailService.query(criteria).then((mails) => {
			setMails(mails)
			setIsLoading(false)
		})
	}

	function onSetCriteria(criteria) {
		setCriteria(criteria)
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

	// preview btns
	function onMoveMailTo(mailId, folder) {
		console.log(mailId, folder)
		mailService.changeFolder(mailId, folder).then(() => loadMails())
	}

	function onMarkAs(mailId) {
		mailService.toggleMarkAs(mailId).then(() => loadMails())
	}

	// handle mail details
	function markAsRead(mailId) {
		mailService.changeIsRead(mailId).then()
	}

	const unreadAmount = mailService.getInboxUnreadAmount()

	return (
		<section className="mail-index full main-layout flex">
			<MailSidebar
				onSetCriteria={onSetCriteria}
				unreadAmount={unreadAmount}
				setIsMailDetailsActive={setIsMailDetailsActive}
			/>
			<div className="mail-main-content">
				{!isMailDetailsActive && <MailFilter onSetCriteria={onSetCriteria} />}

				{/* <Link to="/mail/edit">Add Book</Link> */}

				{!isLoading && !isMailDetailsActive && (
					<MailList
						mails={mails}
						onMoveMailTo={onMoveMailTo}
						onMarkAs={onMarkAs}
						setIsMailDetailsActive={setIsMailDetailsActive}
						setMailDetailsToOpen={setMailDetailsToOpen}
					/>
				)}
				{isLoading && <div>Loading..</div>}
				{!mails.length && <div>No mails to show..</div>}

				{isMailDetailsActive && (
					<MailDetailsDynamic
						mails={mails}
						mailDetailsToOpen={mailDetailsToOpen}
						markAsRead={markAsRead}
					/>
				)}

				<MailEdit />
			</div>
		</section>
	)
}
