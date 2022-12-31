const { useState, useEffect, useRef } = React

import { mailService } from '../services/mail.service.js'

export function MailFilter({ onSetCriteria, loadMails }) {
	const [criteriaToEdit, setCriteriaToEdit] = useState(
		mailService.getDefaultCriteria()
	)
	const elInputRef = useRef(null)

	useEffect(() => {
		elInputRef.current.focus()
	}, [])

	useEffect(() => {
		// update father cmp that filters change very type
		onSetCriteria(criteriaToEdit)
	}, [criteriaToEdit])

	function handleChange({ target }) {
		let { value, name: field, type } = target
		value = type === 'number' ? +value : value
		setCriteriaToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
	}

	function onSubmitCriteria(ev) {
		// update father cmp that filters change on submit
		ev.preventDefault()
		onSetCriteria(criteriaToEdit)
	}

	function onSortMailsBy(val) {
		console.log('sort by me', val)
		console.log('1669916846000')
		mailService.sortMailsBy(val).then(() => loadMails())
	}

	return (
		<section className="mail-filter full main-layout flex align-center">
			<div className="mail-filter-searchbox flex align-center">
				<form className="flex align-center" onSubmit={onSubmitCriteria}>
					<label htmlFor="txt"></label>
					<button>
						<span className="material-symbols-outlined">search</span>
					</button>
					<input
						type="text"
						id="txt"
						name="txt"
						placeholder="Search emails"
						value={criteriaToEdit.txt}
						onChange={handleChange}
						ref={elInputRef}
					/>
				</form>
			</div>
			<div className="mail-filter-sort flex align-center">
				{/* <span className="material-symbols-outlined">mark_as_unread</span> */}
				<span className="material-symbols-outlined mail-filter-sort-icon">
					tune
				</span>
				<span>Sort by </span>
				<select onChange={(ev) => onSortMailsBy(ev.target.value)} name="" id="">
					<option value="sentAt">Date</option>
					<option value="subject">Subject</option>
				</select>
			</div>
		</section>
	)
}
