import React from 'react';
import { Link } from '@reach/router';
import InputField from './InputField';
import Button from './common/Button';
import useRequest from '../hooks/useRequest';
import { useAuth } from '../contexts/AuthContext';

require('../styles/components/Form.scss');

const LoginForm = () => {
	const [, authenticate] = useAuth();
	const [{ loading, errors }, send] = useRequest();

	const submitHandler = async e => {
		e.preventDefault();

		const [email, password] = e.target.elements;
		const { data } = await send('login_check', {
			email: email.value,
			password: password.value,
		});

		if (data && data.token) {
			authenticate(data.token);
		}
	};

	return (
		<div className="form">
			<h1>Sign In</h1>
			<form onSubmit={submitHandler}>
				<InputField label="Email address :" type="email" name="email" placeholder="Enter Your Email" />
				<InputField label="Password :" type="password" name="password" placeholder="Enter Your Password" />

				<Button type="submit" loading={loading}>
					{loading ? 'Signing in...' : 'Sign In'}
				</Button>

				{!!errors && <p className="error-alert">{errors.message}</p>}

				<p className="form__text">
					You are not member <Link to="/signup">Create an account</Link>
				</p>
			</form>
		</div>
	);
};

export default LoginForm;
