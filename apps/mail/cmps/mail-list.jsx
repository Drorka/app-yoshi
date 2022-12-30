import { MailPreview } from './mail-preview.jsx'

export function MailList({
	mails,
	onMoveMailTo,
	onMarkAs,
	setIsMailDetailsActive,
	setMailDetailsToOpen,
}) {
	return (
		<section className="mail-list">
			{mails.map((mail) => (
				<div key={mail.id}>
					<MailPreview
						mail={mail}
						onMoveMailTo={onMoveMailTo}
						onMarkAs={onMarkAs}
						setIsMailDetailsActive={setIsMailDetailsActive}
						setMailDetailsToOpen={setMailDetailsToOpen}
					/>
				</div>
			))}
		</section>
	)
}
