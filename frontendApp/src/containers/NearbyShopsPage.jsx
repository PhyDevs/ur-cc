import React from 'react';
import NearbyShopsList from '../components/NearbyShopsList';

const NearbyShopsPage = () => {
	React.useEffect(() => {
		document.title = 'Near by shops';
	}, []);

	return (
		<>
			<NearbyShopsList />
		</>
	);
};

export default NearbyShopsPage;
