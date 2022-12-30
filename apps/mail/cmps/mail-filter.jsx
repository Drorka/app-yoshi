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
		</section>
	)
}
