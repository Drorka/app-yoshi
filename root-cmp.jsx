const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/app-header.jsx'

import { Home } from './views/home.jsx'
import { About } from './views/about.jsx'
import { MailIndex } from './apps/mail/views/mail-index.jsx'
import { NoteIndex } from './apps/note/views/note-index.jsx'
import { MailDetails } from './apps/mail/views/mail-details.jsx'
import { NoteDetails } from './apps/note/views/note-details.jsx'
import { MailEdit } from './apps/mail/views/mail-edit.jsx'
import { NoteEdit } from './apps/note/views/note-edit.jsx'

export function App() {
	return (
		<Router>
			<section className="app">
				<AppHeader />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/mail" element={<MailIndex />} />
					<Route path="/mail/:mailId" element={<MailDetails />} />
					<Route path="/mail/edit/:mailId" element={<MailEdit />} />
					<Route path="/note" element={<NoteIndex />} />
					<Route path="/note/:noteId" element={<NoteDetails />} />
					<Route path="/note/edit/:noteId" element={<NoteEdit />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</section>
		</Router>
	)
}
