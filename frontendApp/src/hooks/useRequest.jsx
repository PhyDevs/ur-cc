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

const useRequest = () => {
	const [, , logout] = useAuth();
	const [state, dispatch] = React.useReducer(requsetReducer, {
		loading: false,
		errors: null,
	});

	const send = async (route, data, method = 'post') => {
		let response = { data: null };
		try {
			const token = getToken();
			const headers = {
				'Content-Type': 'application/json',
			};
			if (token) headers.Authorization = `Bearer ${token}`;

			dispatch({ type: types.SUBMIT_STARTED });
			response = await axios({
				method,
				url: `${API_PATH}/${route}`,
				data,
				headers,
			});
			dispatch({ type: types.SUBMIT_DONE, payload: { errors: null } });
		} catch (err) {
			const errors = err.response.status === 500 ? { message: 'Connection error' } : err.response.data;
			dispatch({ type: types.SUBMIT_DONE, payload: { errors } });
			if (!err.response || err.response.status === 401) {
				logout();
			}
		}

		return response;
	};

	return [state, send];
};

export default useRequest;
