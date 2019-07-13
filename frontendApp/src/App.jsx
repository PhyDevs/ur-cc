import React from 'react';
import { useAuth } from './contexts/AuthContext';

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

const App = () => {
	const [isAuthenticated] = useAuth();

	return (
		<React.Suspense fallback={<div className="loader" />}>
			{isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
		</React.Suspense>
	);
};

export default App;
