const { useState, useEffect, useRef } = React

import { mailService } from '../services/mail.service.js'

export function MailFilter({ onSetFilter }) {
	const [filterByToEdit, setFilterByToEdit] = useState(
		mailService.getDefaultCriteria()
	)
	const elInputRef = useRef(null)

	useEffect(() => {
		elInputRef.current.focus()
	}, [])

	useEffect(() => {
		// update father cmp that filters change very type
		onSetFilter(filterByToEdit)
	}, [filterByToEdit])

	function handleChange({ target }) {
		let { value, name: field, type } = target
		value = type === 'number' ? +value : value
		setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
	}

	function onSubmitFilter(ev) {
		// update father cmp that filters change on submit
		ev.preventDefault()
		onSetFilter(filterByToEdit)
	}

	return (
		<section className="mail-filter full main-layout">
			<form onSubmit={onSubmitFilter}>
				<label htmlFor="subject"></label>
				<input
					type="text"
					id="subject"
					name="txt"
					placeholder="Search email"
					value={filterByToEdit.txt}
					onChange={handleChange}
					ref={elInputRef}
				/>
				<button>search</button>
			</form>
		</section>
	)
}
