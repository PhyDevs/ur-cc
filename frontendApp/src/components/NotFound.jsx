import React from 'react';

require('../styles/components/NotFound.scss');

const NotFound = () => {
	React.useEffect(() => {
		document.title = 'Not Found 404';
	}, []);

	return (
		<div className="not-found-con">
			<h1>Oops!! Not found 404</h1>
		</div>
	);
};

export default NotFound;
