import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails, onMoveMailTo, onMarkAs }) {
	return (
		<section className="mail-list">
			{mails.map((mail) => (
				<div key={mail.id}>
					<MailPreview
						mail={mail}
						onMoveMailTo={onMoveMailTo}
						onMarkAs={onMarkAs}
					/>
				</div>
			))}
		</section>
	)
}
