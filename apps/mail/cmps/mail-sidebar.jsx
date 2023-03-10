const { useState, useEffect, useRef } = React

import { mailService } from '../services/mail.service.js'

export function MailSidebar({
	onSetCriteria,
	unreadAmount,
	setIsMailDetailsActive,
	setIsMailEditActive,
}) {
	const [criteriaToEdit, setCriteriaToEdit] = useState(
		mailService.getDefaultCriteria()
	)

	let inboxActiveStyle =
		criteriaToEdit.status === 'inbox' ? 'active-folder' : ''
	let sentActiveStyle = criteriaToEdit.status === 'sent' ? 'active-folder' : ''
	let draftsActiveStyle =
		criteriaToEdit.status === 'drafts' ? 'active-folder' : ''
	let trashActiveStyle =
		criteriaToEdit.status === 'trash' ? 'active-folder' : ''

	useEffect(() => {
		// update father cmp that filters change very type
		onSetCriteria(criteriaToEdit)
	}, [criteriaToEdit])

	function handleChange() {
		let status = event.target.innerText.split(' ')[0].toLowerCase()
		// handle click in mobile view
		if (status === 'send') status = 'sent'
		if (status === 'delete') status = 'trash'
		if (status === 'draft') status = 'drafts'
		console.log(status)
		// value = type === 'number' ? +value : value
		setCriteriaToEdit((prevCriteria) => ({ ...prevCriteria, status: status }))
		// close mail details
		setIsMailDetailsActive(false)
	}

	function onComposeClick() {
		setIsMailEditActive(true)
	}

	// function onSubmitCriteria() {
	// 	console.log(event.target)
	// 	// update father cmp that filters change on submit
	// 	onSetCriteria(criteriaToEdit)
	// }

	return (
		<section className="mail-sidebar-container">
			<div
				className="compose-mail flex justify-center align-center"
				onClick={() => onComposeClick()}
			>
				<span className="material-symbols-outlined">edit</span>
				<span> Compose</span>
			</div>
			<section className="mail-sidebar flex flex-column align-center">
				<div
					className={'mail-sidebar-inbox flex align-center ' + inboxActiveStyle}
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
					className={'mail-sidebar-sent flex align-center ' + sentActiveStyle}
					onClick={() => handleChange()}
				>
					<div className="mail-sidebar-sent-icon">
						<span className="material-symbols-outlined">send</span>{' '}
					</div>
					<div className="mail-sidebar-sent-txt">Sent</div>
				</div>
				<div
					className={
						'mail-sidebar-drafts flex align-center ' + draftsActiveStyle
					}
					onClick={() => handleChange()}
				>
					<div className="mail-sidebar-drafts-icon">
						<span className="material-symbols-outlined">draft</span>{' '}
					</div>
					<div className="mail-sidebar-drafts-txt">Drafts</div>
				</div>
				<div
					className={'mail-sidebar-trash flex align-center ' + trashActiveStyle}
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
