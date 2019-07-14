import React from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import API_PATH from '../utils/api_path';

const types = {
	SUBMIT_STARTED: 0,
	SUBMIT_DONE: 1,
};

const getToken = () => {
	try {
		const token = localStorage.getItem('token');
		return token;
	} catch {
		throw Error("localStorage isn't accessible");
	}
};

const requsetReducer = (state, action) => {
	switch (action.type) {
		case types.SUBMIT_STARTED:
			return { ...state, loading: true };
		case types.SUBMIT_DONE:
			return { ...state, loading: false, ...action.payload };
		default:
			return state;
	}
};

const useFetch = route => {
	const [, , logout] = useAuth();
	const [state, dispatch] = React.useReducer(requsetReducer, {
		loading: false,
		data: null,
	});

	React.useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();

		(async () => {
			let response = { data: null };
			try {
				const token = getToken();
				const headers = {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				};

				dispatch({ type: types.SUBMIT_STARTED });
				response = await axios.get(`${API_PATH}/${route}`, { headers, cancelToken: source.token });

				if (mounted) dispatch({ type: types.SUBMIT_DONE, payload: { data: response.data } });
			} catch (err) {
				if (!axios.isCancel(err)) {
					if (mounted) dispatch({ type: types.SUBMIT_DONE, payload: { data: null } });
					if (!err.response || err.response.status === 401) {
						logout();
					}
				}
			}
		})();

		return () => {
			mounted = false;
			source.cancel('The Component was unmounted!');
		};
	}, [logout, route]);

	return state;
};

export default useFetch;
