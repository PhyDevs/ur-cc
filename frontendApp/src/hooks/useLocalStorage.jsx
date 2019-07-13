import React from 'react';

const useLocalStorage = (key, defaultValue) => {
	const [value, setValue] = React.useState(() => {
		let initValue;
		try {
			initValue = JSON.parse(localStorage.getItem(key)) || defaultValue;
		} catch {
			initValue = defaultValue;
		}
		return initValue;
	});

	React.useEffect(() => {
		try {
			const serializedValue = JSON.stringify(value);
			localStorage.setItem(key, serializedValue);
		} catch {
			// If user has storage restriction
			throw Error("localStorage isn't accessible");
		}
	}, [key, value]);
	return [value, setValue];
};

export default useLocalStorage;
