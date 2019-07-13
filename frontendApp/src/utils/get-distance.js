function storeUserLocation() {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					try {
						const coords = { lat: position.coords.latitude, lon: position.coords.longitude };
						localStorage.setItem('user_coords', JSON.stringify(coords));
						resolve();
					} catch {
						reject(new Error("localStorage isn't accessible"));
					}
				},
				error => reject(new Error(error.code))
			);
		} else {
			reject(new Error("HTML5 Geolocation isn't supported"));
		}
	});
}

/**
 * Calculates distance with the Haversine formula
 * https://en.wikipedia.org/wiki/Haversine_formula
 */
async function getDistance(lat, lon) {
	let userCoords;
	try {
		userCoords = JSON.parse(localStorage.getItem('user_coords'));
		if (!userCoords) {
			await storeUserLocation();
			userCoords = JSON.parse(localStorage.getItem('user_coords'));
		}
	} catch {
		// Default User location
		userCoords = { lat: 30.42, lon: -9.57 };
	}

	const R = 6371;
	const dLat = ((userCoords.lat - lat) * Math.PI) / 180;
	const dLon = ((userCoords.lon - lon) * Math.PI) / 180;
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((lat * Math.PI) / 180) *
			Math.cos((userCoords.lat * Math.PI) / 180) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c;
	return distance;
}

export default getDistance;
