import React from 'react';
import PropTypes from 'prop-types';

require('../styles/components/InputField.scss');

const InputField = ({ label, type, name, placeholder, errorMessage }) => {
	return (
		<div className="input-field">
			<label htmlFor={name}>
				<span className="input-field__label">{label}</span>
				<input
					type={type}
					name={name}
					id={name}
					placeholder={placeholder}
					required={type === 'email' || type === 'password' ? 'required' : false}
				/>
			</label>
			{!!errorMessage && <p className="error-alert">{errorMessage}</p>}
		</div>
	);
};

InputField.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	errorMessage: PropTypes.string,
};

InputField.defaultProps = {
	type: 'text',
	placeholder: null,
	errorMessage: null,
};

export default InputField;
