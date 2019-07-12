import React from 'react';
import { Router } from '@reach/router';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import NotFound from './components/NotFound';

const UnauthenticatedApp = () => (
	<Router>
		<LoginPage path="/" />
		<SignUpPage path="/signup" />
		<NotFound default />
	</Router>
);

export default UnauthenticatedApp;
