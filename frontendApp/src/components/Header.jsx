import React from 'react';
import { Link } from '@reach/router';
import { useAuth } from '../contexts/AuthContext';

require('../styles/components/Header.scss');

const Header = () => {
	const [, , logout] = useAuth();

	return (
		<nav className="main-nav">
			<Link to="/" className="logo">
				Shop
			</Link>
			<ul>
				<li>
					<Link to="/">NearBy Shops</Link>
				</li>
				<li>
					<Link to="/preferred">My Preferred Shops</Link>
				</li>
				<li>
					<button
						type="button"
						onClick={() => {
							logout();
						}}
					>
						Log Out
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Header;
