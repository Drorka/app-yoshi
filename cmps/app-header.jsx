const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <img src="assets/img/mario-yoshi-ani.gif" alt="yoshi logo" />
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
    </header>
}
