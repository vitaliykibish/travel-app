export type TCity = {
	name: string;
	coords: { lat: number; lon: number };
	code: string;
};

const cities: Array<TCity> = [
	{
		name: 'Amsterdam',
		coords: { lat: 52.3667, lon: 4.8945 },
		code: 'AMS',
	},
	{
		name: 'Madrid',
		coords: { lat: 40.4168, lon: 3.7038 },
		code: 'MAD',
	},
	{
		name: 'Budapest',
		coords: { lat: 47.4979, lon: 19.0402 },
		code: 'BUD',
	},
];

export default cities;
