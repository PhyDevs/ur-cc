import React from 'react';
import useFetch from '../hooks/useFetch';
import useRequest from '../hooks/useRequest';
import ShopCard from './ShopCard';

const PreferredShopsList = () => {
	const [shops, setShops] = React.useState([]);
	const { data, loading } = useFetch('shops/preferred');
	const [, send] = useRequest();

	// Side effect when shops are loaded
	React.useEffect(() => {
		if (data !== null) {
			setShops(Object.values(data));
		}
	}, [data]);

	// Triggerd when Remove Shop Button Clicked
	const removeHandler = async id => {
		if (id) {
			setShops(prevShops => prevShops.filter(({ _id: shopId }) => shopId !== id));
			await send(`shops/${id}/remove`, null, 'patch');
		}
	};

	return (
		<div className="cards-con__row ">
			{loading ? (
				<div className="loader" />
			) : (
				!!shops &&
				shops.map(shop => {
					const { _id: id, name, picture } = shop;
					return (
						<ShopCard
							key={id}
							id={id}
							cardType="preferred"
							name={name}
							picture={picture}
							removeHandler={removeHandler}
						/>
					);
				})
			)}
		</div>
	);
};

export default PreferredShopsList;
