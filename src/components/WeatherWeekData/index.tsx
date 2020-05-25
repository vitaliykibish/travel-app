import React from 'react';

import Placeholder from 'components/Placeholder';

import useFetch from 'hooks/useFetch';
import { getUrlForecastsByLocation } from 'utils';
import { TWeather, DailyWeather } from 'types/weather';

type Props = {
	lat: number;
	lon: number;
	children?: (data: Array<DailyWeather>) => any;
};

const WeatherWeekData: React.FC<Props> = ({ children, lat, lon }) => {
	const { loading, error, data } = useFetch<TWeather>(getUrlForecastsByLocation({ lat, lon }));

	if (loading) {
		return <Placeholder type="loading" />;
	}

	if (error) {
		return <Placeholder type="error" />;
	}

	return data && children ? children(data.daily.slice(0, 7)) : null;
};

export default WeatherWeekData;
