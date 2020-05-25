import React from 'react';

import Placeholder from 'components/Placeholder';

import useFetch from 'hooks/useFetch';
import { getDateRange, getUrlFlights } from 'utils';

import { SearchFlight } from 'types/flights';

type Props = {
	flyFromCode: string;
	flyToCode: string;
	children?: (data: { [key: number]: number }) => any;
};

const FlightsWeekData: React.FC<Props> = ({ children, flyFromCode, flyToCode }) => {
	const { dateFrom, dateTo } = getDateRange(7); // 7 days range

	const { loading, error, data } = useFetch<SearchFlight>(
		getUrlFlights({
			flyFromCode,
			flyToCode,
			dateFrom,
			dateTo,
		}),
	);

	if (loading) {
		return <Placeholder type="loading" />;
	}

	if (error) {
		return <Placeholder type="error" />;
	}

	const weekFlightPrices =
		data &&
		data.data.reduce((acc: { [key: number]: number }, flight) => {
			const departure = new Date(flight.dTime * 1000).getDate();
			const price = flight.price;

			if (!acc[departure]) {
				acc[departure] = price;
			}

			if (acc[departure] > price) {
				acc[departure] = price;
			}

			return acc;
		}, {});

	return weekFlightPrices && children ? children(weekFlightPrices) : null;
};

export default FlightsWeekData;
