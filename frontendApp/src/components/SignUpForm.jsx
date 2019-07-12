import React from 'react';
import { Link } from '@reach/router';
import InputField from './InputField';
import Button from './common/Button';
import useRequest from '../hooks/useRequest';
import { useAuth } from '../contexts/AuthContext';

require('../styles/components/Form.scss');

const SignUpForm = () => {
	const [, authenticate] = useAuth();
	const [emailError, setEmailError] = React.useState(null);
	const [passwordError, setPasswordError] = React.useState(null);
	const [{ loading, errors }, send] = useRequest();

	/**
	 * Error response structure
	 * {
	 *    message: "The property is not a valid"
	 *    property_path: "property"
	 * }
	 */
	React.useEffect(() => {
		// Clearing form errors
		setEmailError(null);
		setPasswordError(null);

		if (Array.isArray(errors)) {
			errors.forEach(error => {
				const { property_path: propertyPath, message } = error;
				if (propertyPath === 'email') setEmailError(message);
				if (propertyPath === 'password') setPasswordError(message);
			});
		}
	}, [errors]);

	const submitHandler = async e => {
		e.preventDefault();

		const [email, password] = e.target.elements;
		const { data } = await send('register', {
			email: email.value,
			password: password.value,
		});

		if (data && data.token) {
			authenticate(data.token);
		}
	};

	return (
		<div className="form">
			<h1>Sign Up</h1>
			<form onSubmit={submitHandler}>
				<InputField
					label="Email address :"
					type="email"
					name="email"
					placeholder="Enter Your Email"
					errorMessage={emailError}
				/>
				<InputField
					label="Password :"
					type="password"
					name="password"
					placeholder="Enter Your Password"
					errorMessage={passwordError}
				/>
				<Button type="submit" color="green" loading={loading}>
					{loading ? 'Signing up...' : 'Sign Up'}
				</Button>
				{!!errors && !!errors.message && <p className="error-alert">{errors.message}</p>}

				<p className="form__text">
					You are already member <Link to="/">Sign in</Link>
				</p>
			</form>
		</div>
	);
};

export default SignUpForm;
