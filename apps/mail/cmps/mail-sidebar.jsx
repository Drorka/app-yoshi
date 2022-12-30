const { useState, useEffect, useRef } = React

import { mailService } from '../services/mail.service.js'

export function MailSidebar({
	onSetCriteria,
	unreadAmount,
	setIsMailDetailsActive,
}) {
	const [criteriaToEdit, setCriteriaToEdit] = useState(
		mailService.getDefaultCriteria()
	)

	useEffect(() => {
		// update father cmp that filters change very type
		onSetCriteria(criteriaToEdit)
	}, [criteriaToEdit])

	function handleChange() {
		let status = event.target.innerText.split(' ')[0].toLowerCase()
		// value = type === 'number' ? +value : value
		setCriteriaToEdit((prevFilter) => ({ ...prevFilter, status: status }))
		// close mail details
		setIsMailDetailsActive(false)
	}

	// function onSubmitCriteria() {
	// 	console.log(event.target)
	// 	// update father cmp that filters change on submit
	// 	onSetCriteria(criteriaToEdit)
	// }

	return (
		<section>
			<div className="compose-mail flex justify-center align-center">
				<span className="material-symbols-outlined">edit</span>
				<span> Compose</span>
			</div>
			<section className="mail-sidebar flex flex-column align-center">
				<div
					className="mail-sidebar-inbox flex align-center"
					onClick={() => handleChange()}
				>
					<div className="mail-sidebar-inbox-icon">
						<span className="material-symbols-outlined">inbox</span>{' '}
					</div>
					<div className="mail-sidebar-inbox-txt flex">
						Inbox {unreadAmount}
					</div>
				</div>
				<div
					className="mail-sidebar-sent flex align-center"
					onClick={() => handleChange()}
				>
					<div className="mail-sidebar-sent-icon">
						<span className="material-symbols-outlined">send</span>{' '}
					</div>
					<div className="mail-sidebar-sent-txt">Sent</div>
				</div>
				<div
					className="mail-sidebar-drafts flex align-center"
					onClick={() => handleChange()}
				>
					<div className="mail-sidebar-drafts-icon">
						<span className="material-symbols-outlined">draft</span>{' '}
					</div>
					<div className="mail-sidebar-drafts-txt">Drafts</div>
				</div>
				<div
					className="mail-sidebar-trash flex align-center"
					onClick={() => handleChange()}
				>
					<div className="mail-sidebar-trash-icon">
						<span className="material-symbols-outlined">delete</span>{' '}
					</div>
					<div className="mail-sidebar-trash-txt">Trash</div>
				</div>
			</section>
		</section>
	)
}
