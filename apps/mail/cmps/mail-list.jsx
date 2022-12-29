import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails, onMoveMailTo }) {
	return (
		<section className="mail-list">
			{mails.map((mail) => (
				<div key={mail.id}>
					<MailPreview mail={mail} onMoveMailTo={onMoveMailTo} />
				</div>
			))}
		</section>
	)
}
