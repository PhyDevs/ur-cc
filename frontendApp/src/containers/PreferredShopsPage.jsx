import React from 'react';
import PreferredShopsList from '../components/PreferredShopsList';

const PreferredShopsPage = () => {
	React.useEffect(() => {
		document.title = 'Preferred shops';
	}, []);

	return (
		<>
			<PreferredShopsList />
		</>
	);
};

export default PreferredShopsPage;
