import React from 'react';
import PropTypes from 'prop-types';

require('../../styles/components/common/CenterdBox.scss');

const CenterdBox = ({ children }) => (
	<div className="box-container">
		<div className="box">{children}</div>
	</div>
);

CenterdBox.propTypes = {
	children: PropTypes.node.isRequired,
};

export default CenterdBox;
