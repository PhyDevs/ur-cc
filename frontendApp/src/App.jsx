import React from 'react';
import { useAuth } from './contexts/AuthContext';

const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

const App = () => {
	const [isAuthenticated] = useAuth();

	return (
		<React.Suspense fallback={<div className="loader" />}>
			{isAuthenticated ? <h1>Welcome</h1> : <UnauthenticatedApp />}
		</React.Suspense>
	);
};

export default App;
