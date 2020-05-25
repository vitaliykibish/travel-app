const apiKeyOpenWeatherMap: string = '8358372df4c3473cfb5f592d22e3d14c';

// format JSDate to DD-MM-YYY
export const formatDate = (date: Date): string => {
	const day = date.getDate();
	const rawMonth = date.getMonth() + 1;
	const month = rawMonth < 10 ? `0${rawMonth}` : rawMonth;
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
};

// generate Date Range from current date + [days]
export const getDateRange = (days: number): { dateFrom: string; dateTo: string } => {
	const dateFrom = new Date();
	const dateTo = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

	return {
		dateFrom: formatDate(dateFrom),
		dateTo: formatDate(dateTo),
	};
};

export const getUrlForecastsByLocation = ({ lat, lon }: { lat: number; lon: number }): string => `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&
	exclude=hourly,current&appid=${apiKeyOpenWeatherMap}`;

export const getUrlFlights = ({ flyFromCode, flyToCode, dateFrom, dateTo }: { flyFromCode: string; flyToCode: string; dateFrom: string; dateTo: string }): string =>
	`https://api.skypicker.com/flights?flyFrom=${flyFromCode}&to=${flyToCode}&dateFrom=${dateFrom}&dateTo=${dateTo}&partner=picky&v=3`;
