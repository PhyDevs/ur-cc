import React from 'react';
import PropTypes from 'prop-types';

require('../../styles/components/common/Button.scss');

const Button = ({ children, type, loading, color }) => (
	<button type={type} className={`btn btn-${color} ${loading && 'btn-loading'}`}>
		{children}
	</button>
);

Button.propTypes = {
	children: PropTypes.string.isRequired,
	type: PropTypes.string,
	loading: PropTypes.bool,
	color: PropTypes.oneOf(['green', 'blue', 'red']),
};

Button.defaultProps = {
	type: 'button',
	loading: false,
	color: 'blue',
};

export default Button;
