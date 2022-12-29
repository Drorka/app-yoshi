const { useState, useEffect, useRef } = React

import { mailService } from '../services/mail.service.js'

export function MailFilter({ onSetCriteria }) {
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

	return (
		<section className="mail-filter full main-layout">
			<form onSubmit={onSubmitCriteria}>
				<label htmlFor="subject"></label>
				<input
					type="text"
					id="subject"
					name="txt"
					placeholder="Search email"
					value={criteriaToEdit.txt}
					onChange={handleChange}
					ref={elInputRef}
				/>
				<button>search</button>
			</form>
		</section>
	)
}
