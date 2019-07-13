import React from 'react';
import PropTypes from 'prop-types';
import Button from './common/Button';

require('../styles/components/ShopCard.scss');

const ShopCard = ({ cardType, id, name, picture, likeHandler, dislikeHandler, removeHandler }) => {
	return (
		<div className="single-card">
			<h2>{name}</h2>
			<div className="shop-img--con">
				<img src={picture} alt={name} />
			</div>
			{cardType === 'preferred' ? (
				<Button
					color="red"
					onClick={() => {
						removeHandler(id);
					}}
				>
					Remove
				</Button>
			) : (
				<div className="nearby-btns">
					<Button
						color="green"
						onClick={() => {
							likeHandler(id);
						}}
					>
						Like
					</Button>
					<Button
						color="red"
						onClick={() => {
							dislikeHandler(id);
						}}
					>
						Dislike
					</Button>
				</div>
			)}
		</div>
	);
};

ShopCard.propTypes = {
	cardType: PropTypes.oneOf(['nearBy', 'preferred']),
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	picture: PropTypes.string.isRequired,
	likeHandler: PropTypes.func,
	dislikeHandler: PropTypes.func,
	removeHandler: PropTypes.func,
};

ShopCard.defaultProps = {
	cardType: 'nearBy',
	likeHandler: () => {},
	dislikeHandler: () => {},
	removeHandler: () => {},
};

export default ShopCard;
