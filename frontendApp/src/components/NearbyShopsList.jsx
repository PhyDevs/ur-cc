import React from 'react';
import useFetch from '../hooks/useFetch';
import useRequest from '../hooks/useRequest';
import useLocalStorage from '../hooks/useLocalStorage';
import ShopCard from './ShopCard';
import getDistance from '../utils/get-distance';

const NearbyShopsList = () => {
	const [shops, setShops] = React.useState([]);
	const { data, loading } = useFetch('shops/nearby');
	const [, send] = useRequest();
	const [dislikedShops, setDislikedShops] = useLocalStorage('dis_shops', []);

	const getNearbyShops = React.useCallback(() => {
		const dislikedShopsToIntArr = dislikedShops.map(({ shop_id: shopId, disliked_date: dislikedDate }) => {
			return (new Date() - new Date(dislikedDate)) / (1000 * 60 * 60) >= 2 ? null : shopId;
		});

		// filtring disliked shops & injecting distance property to sort shops
		const nearbyShopsPromises = Object.values(data)
			.filter(({ _id: id }) => dislikedShopsToIntArr.indexOf(id) < 0)
			.map(async shop => {
				const distance = await getDistance(shop.location.coordinates[1], shop.location.coordinates[0]);
				return { ...shop, distance };
			});

		Promise.all(nearbyShopsPromises).then(nearbyShops => {
			const sortedShops = nearbyShops.sort(({ distance: a }, { distance: b }) => a - b);
			setShops(sortedShops);
		});
	}, [data, dislikedShops]);

	// Side effect when shops are loaded or Shop is disliked
	React.useEffect(() => {
		if (data !== null) {
			getNearbyShops();
		}
	}, [data, getNearbyShops]);

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
				(new Date() - new Date(dislikedDate)) / (1000 * 60 * 60) >= 2 ? shopId : null
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
