import React from 'react';
import LoginForm from '../components/LoginForm';
import CenterdBox from '../components/common/CenterdBox';

const LoginPage = () => {
	React.useEffect(() => {
		document.title = 'Login';
	}, []);

	return (
		<CenterdBox>
			<LoginForm />
		</CenterdBox>
	);
};

export default LoginPage;
