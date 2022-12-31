const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
	return (
		<header className="app-header">
			<Link to="/">
				{/* <img src="../assets/img/mario-yoshi-ani.gif" alt="yoshi logo" /> */}

				<img src="https://phoneky.co.uk/thumbs/screensavers/down/games/supermario_h4f5jmkx.gif" />
			</Link>
			<nav>
				{/* <NavLink to="/">
					<img src="../assets/img/icons/home_logo.png" alt="home" />
				</NavLink>

				<NavLink to="/mail">
					<img src="../assets/img/icons/mail_logo.png" alt="mail" />
				</NavLink>

				<NavLink to="/note">
					<img src="../assets/img/icons/keep_logo.png" alt="note" />
				</NavLink> */}

				<NavLink to="/">
					<img src="https://lh3.googleusercontent.com/YrIhuXYEyEmRr2Pi07r9T-ZVIcdS_XPYdxDTkgPeNuPKYo1-a45D91UjIZzo7hcdmx1dzHvxc0YP-7UQ5U_N9QFnWiguR4FLLbcjcg" alt="home" />
				</NavLink>

				<NavLink to="/mail">
					<img src="https://lh3.googleusercontent.com/0rpHlrX8IG77awQMuUZpQ0zGWT7HRYtpncsuRnFo6V3c8Lh2hPjXnEuhDDd-OsLz1vua4ld2rlUYFAaBYk-rZCODmi2eJlwUEVsZgg" alt="mail" />
				</NavLink>

				<NavLink to="/note">
					<img src="https://lh3.googleusercontent.com/V6C9KmBzAK48_si_jPMSgUrBhdCGL8-z8QMg-WvDqSdVdPXN-FZHrpCHaZaYAYuXCGK-G85sYRIy3PdqfXAS4QlXwQJTyNUPYCpz" alt="note" />
				</NavLink>

				{/* <NavLink to="/about">
					<img src="../assets/img/icons/contacs_logo.png" alt="about" />
				</NavLink> */}
			</nav>
		</header>
	)
}
