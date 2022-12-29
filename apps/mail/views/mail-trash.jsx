import { MailList } from '../cmps/mail-list.jsx'
import { MailSidebar } from '../cmps/mail-sidebar.jsx'
import { MailFilter } from './mail-filter.jsx'
import { MailPreview } from './mail-preview.jsx'

export function MailTrash() {
	return (
		<section>hello from trash</section>
		// <section className="mail-trash">
		// 	<MailSidebar />
		// 	{/* {mails.map((mail) => (
		// 		<div key={mail.id}>
		// 			<MailPreview mail={mail} onMoveMailToTrash={onMoveMailToTrash} />
		// 		</div>
		// 	))} */}
		// </section>

		// <section className="mail-trash full main-layout flex">
		// 	<MailSidebar />
		// 	<div className="mail-main-content">
		// 		{/* <MailFilter onSetFilter={onSetFilter} /> */}

		// 		{!isLoading && (
		// 			<MailList mails={mails} onMoveMailToTrash={onMoveMailToTrash} />
		// 		)}
		// 		{isLoading && <div>Loading..</div>}
		// 		{!mails.length && <div>No mails to show..</div>}
		// 	</div>
		// </section>
	)
}
