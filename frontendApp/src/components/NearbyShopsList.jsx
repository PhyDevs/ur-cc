import React from 'react';
import useFetch from '../hooks/useFetch';
import useRequest from '../hooks/useRequest';
import useLocalStorage from '../hooks/useLocalStorage';
import ShopCard from './ShopCard';

const NearbyShopsList = () => {
	const [shops, setShops] = React.useState([]);
	const { data, loading } = useFetch('shops/nearby');
	const [, send] = useRequest();
	const [dislikedShops, setDislikedShops] = useLocalStorage('dis_shops', []);

	// Side effect when shops are loaded or Shop is disliked
	React.useEffect(() => {
		if (data !== null) {
			const dislikedShopsToIntArr = dislikedShops.map(({ shop_id: shopId, disliked_date: dislikedDate }) => {
				return new Date().getHours() - new Date(dislikedDate).getHours() >= 2 ? null : shopId;
			});
			const nearbyShops = Object.values(data).filter(({ _id: id }) => dislikedShopsToIntArr.indexOf(id) < 0);
			setShops(nearbyShops);
		}
	}, [data, dislikedShops]);

	// Triggerd when Like Shop Button Clicked
	const likeHandler = async id => {
		if (id) {
			setShops(prevShops => prevShops.filter(({ _id: shopId }) => shopId !== id));
			await send(`shops/${id}/like`, null, 'patch');
		}
	};

	// Triggerd when Dislike Shop Button Clicked
	const dislikeHandler = async id => {
		if (id) {
			/**
			 * Disliked Shop Structure
			 * {
			 *    shop_id: "5a0c6711fb3aac66aafe26c8"
			 *    disliked_date: 1562981616824
			 * }
			 */
			const outdatedDisliekShops = dislikedShops.map(({ shop_id: shopId, disliked_date: dislikedDate }) =>
				new Date().getHours() - new Date(dislikedDate).getHours() >= 2 ? shopId : null
			);
			setDislikedShops(prevShops =>
				prevShops
					.filter(({ shop_id: shopId }) => outdatedDisliekShops.indexOf(shopId) < 0)
					.concat({ shop_id: id, disliked_date: new Date().getTime() })
			);
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
							name={name}
							picture={picture}
							likeHandler={likeHandler}
							dislikeHandler={dislikeHandler}
						/>
					);
				})
			)}
		</div>
	);
};

export default NearbyShopsList;
