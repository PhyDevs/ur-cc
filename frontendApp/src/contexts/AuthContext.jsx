import React from 'react';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
	let authenticated;
	try {
		const value = localStorage.getItem('token');
		authenticated = !!value;
	} catch {
		authenticated = false;
	}

	const [isAuthenticated, setIsAuthenticated] = React.useState(authenticated);

	const state = React.useMemo(
		() => ({
			isAuthenticated,
			setIsAuthenticated,
		}),
		[isAuthenticated]
	);

	return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
	const context = React.useContext(AuthContext);
	if (context === undefined) throw Error('useAuth must be used inside AuthProvider');

	const { isAuthenticated, setIsAuthenticated } = context;
	const authenticate = React.useCallback(
		token => {
			try {
				localStorage.setItem('token', token);
				setIsAuthenticated(true);
				navigate('/');
			} catch {
				setIsAuthenticated(false);
			}
		},
		[setIsAuthenticated]
	);

	const logout = React.useCallback(() => {
		try {
			localStorage.removeItem('token');
		} finally {
			setIsAuthenticated(false);
			navigate('/');
		}
	}, [setIsAuthenticated]);

	return [isAuthenticated, authenticate, logout];
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuth };
