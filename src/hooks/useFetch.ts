import { useEffect, useReducer } from 'react';

const FETCH_REQUEST: string = 'FETCH_REQUEST';
const FETCH_ERROR: string = 'FETCH_ERROR';
const FETCH_SUCCESS: string = 'FETCH_SUCCESS';

type Err =
	| {
			message: string;
	  }
	| undefined
	| null;

type State<Data> = {
	data: Data | undefined | null;
	error: Err;
	loading: boolean;
};

type Action<Data> = {
	type: string;
	error?: Err;
	data?: Data | undefined | null;
};

const initialState: State<null> = {
	data: null,
	loading: false,
	error: null,
};

function reducer(state: State<null>, { type, error, data }: Action<null>) {
	switch (type) {
		case FETCH_REQUEST:
			return {
				data: null,
				error: null,
				loading: true,
			};
		case FETCH_SUCCESS:
			return {
				data,
				error: null,
				loading: false,
			};
		case FETCH_ERROR:
			return {
				error,
				data: null,
				loading: false,
			};
		default:
			return state;
	}
}

const simpleCache: { [key: string]: any } = {};

function useFetch<Data>(url: string): State<Data> {
	const [{ error, data, loading }, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		if (simpleCache[url]) {
			return dispatch({ type: FETCH_SUCCESS, data: simpleCache[url] });
		}

		const controller = new AbortController();
		const signal = controller.signal;

		dispatch({ type: FETCH_REQUEST });

		fetch(url, { signal })
			.then((res) => {
				if (!res.ok) {
					throw Error(`Fetch Error: { code: ${res.status}, message: ${res.statusText} }`);
				}

				return res.json();
			})
			.then((data) => {
				simpleCache[url] = data;
				dispatch({ type: FETCH_SUCCESS, data });
			})
			.catch((error) => {
				if (!signal.aborted) {
					dispatch({ type: FETCH_ERROR, error });
				}
			});

		return () => {
			controller.abort();
		};
	}, [url]);

	return { error, data, loading };
}

export default useFetch;
