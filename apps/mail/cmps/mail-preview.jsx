export function MailPreview({ mail }) {
	return (
		<article className="mail-preview">
			<span className="mail-subject">{mail.subject}</span>
			<span className="mail-body">{mail.body}</span>
		</article>
	)
}
