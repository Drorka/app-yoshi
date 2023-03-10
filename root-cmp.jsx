const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/app-header.jsx'
import { Loader } from './cmps/loader.jsx'

import { Home } from './views/home.jsx'
import { About } from './views/about.jsx'

import { MailIndex } from './apps/mail/views/mail-index.jsx'
import { MailEdit } from './apps/mail/cmps/mail-edit.jsx'

import { NoteIndex } from './apps/note/views/note-index.jsx'
import { NoteEdit } from './apps/note/views/note-edit.jsx'

export function App() {
	return (
		<Router>
			<section className="app">
				<AppHeader />
				<Routes>
					<Route path="/" element={<Home />} />

					<Route element={<MailIndex />} path="/mail" />
					{/* edit should be nested under list */}
					<Route element={<MailEdit />} path="/mail/edit/:mailId" />

					<Route element={<NoteIndex />} path="/note" />
					{/* edit should be nested under list */}
					<Route element={<NoteEdit />} path="/note/edit/:noteId" />
					{/* <Route element={<About />} path="/about" /> */}
				</Routes>
			</section>
		</Router>
	)
}
