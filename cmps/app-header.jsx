const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
	return (
		<header className="app-header">
			<Link to="/">
				<img src="assets/img/mario-yoshi-ani.gif" alt="yoshi logo" />
			</Link>
			<nav>
				<NavLink to="/">
					<img src="assets/img/icons/home_logo.png" alt="home" />
				</NavLink>

				<NavLink to="/mail">
					<img src="assets/img/icons/mail_logo.png" alt="mail" />
				</NavLink>

				<NavLink to="/note">
					<img src="assets/img/icons/keep_logo.png" alt="note" />
				</NavLink>


				{/* <NavLink to="/about">
					<img src="../assets/img/icons/contacs_logo.png" alt="about" />
				</NavLink> */}
			</nav>
		</header>
	)
}
