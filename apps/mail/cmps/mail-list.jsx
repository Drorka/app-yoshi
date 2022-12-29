import { MailPreview } from './mail-preview.jsx'

console.log('hello from mail list')

export function MailList({ mails, onMoveMailToTrash }) {
	return (
		<section className="mail-list">
			{mails.map((mail) => (
				<div key={mail.id}>
					<MailPreview mail={mail} onMoveMailToTrash={onMoveMailToTrash} />
				</div>
			))}
		</section>
	)
}
