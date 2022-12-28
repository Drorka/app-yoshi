const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { mailSidebar } from '../cmps/mail-sidebar.jsx'
import { mailFilter } from '../cmps/mail-filter.jsx'
import { mailList } from '../cmps/mail-list.jsx'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function MailIndex() {
	const [isLoading, setIsLoading] = useState(false)
	const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
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
		// bookService
		// 	.remove(bookId)
		// 	.then(() => {
		// 		const updatedBooks = books.filter((book) => book.id !== bookId)
		// 		setBooks(updatedBooks)
		// 		showSuccessMsg('Book removed')
		// 	})
		// 	.catch((err) => {
		// 		console.log('Had issues removing', err)
		// 		showErrorMsg('Could not remove book')
		// 	})
	}

	return (
		<section className="mail-index full main-layout">
			<div>mail app</div>
			<div className="full main-layout">
				<mailFilter onSetFilter={onSetFilter} />

				{/* <Link to="/mail/edit">Add Book</Link> */}

				{!isLoading && <mailList mails={mails} onRemoveMail={onRemoveMail} />}
				{isLoading && <div>Loading..</div>}
				{!mails.length && <div>No mails to show..</div>}
			</div>
		</section>
	)
}
