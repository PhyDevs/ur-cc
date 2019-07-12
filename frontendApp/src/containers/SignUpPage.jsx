import React from 'react';
import SignUpForm from '../components/SignUpForm';
import CenterdBox from '../components/common/CenterdBox';

const SignUpPage = () => {
	React.useEffect(() => {
		document.title = 'Sign Up';
	}, []);

	return (
		<CenterdBox>
			<SignUpForm />
		</CenterdBox>
	);
};

export default SignUpPage;
