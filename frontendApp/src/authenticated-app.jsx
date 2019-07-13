import React from 'react';
import { Router } from '@reach/router';
import NearbyShopsPage from './containers/NearbyShopsPage';
import PreferredShopsPage from './containers/PreferredShopsPage';
import Header from './components/Header';
import NotFound from './components/NotFound';

const AuthenticatedApp = () => (
	<>
		<Header />
		<Router>
			<NearbyShopsPage path="/" />
			<PreferredShopsPage path="/preferred" />
			<NotFound default />
		</Router>
	</>
);

export default AuthenticatedApp;
