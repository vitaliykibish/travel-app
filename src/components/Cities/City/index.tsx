import React from 'react';

import FlightWithWeather from 'components/FlightWithWeather';
import WeatherWeekData from 'components/WeatherWeekData';
import FlightsWeekData from 'components/FlightsWeekData';

import { DailyWeather } from 'types/weather';
import { TCity } from './../cities';

import styles from './styles.module.scss';

export type Props = {
	flyFrom: TCity;
	flyTo: TCity;
	weatherDeparture: Array<DailyWeather>;
};

const City: React.FC<Props> = ({ flyFrom, flyTo, weatherDeparture }) => {
	return (
		<div className={styles.container}>
			<div className={styles.city}>
				<div className={styles.title}>
					{flyFrom.name} ⭢ <b>{flyTo.name}</b>
				</div>
				<div className={styles.cover}>
					<img src={`/travel-app/assets/cities/${flyTo.code.toLowerCase()}.jpg`} alt={flyTo.name} />
				</div>
			</div>
			<WeatherWeekData lat={flyTo.coords.lat} lon={flyTo.coords.lon}>
				{(weekWeather) => {
					return (
						<FlightsWeekData flyFromCode={flyFrom.code} flyToCode={flyTo.code}>
							{(weekFlights) => {
								return (
									<div className={styles.week}>
										{weekWeather.map((day, i) => {
											const date = new Date(day.dt * 1000).getDate();
											const rawPrice = weekFlights[date];
											const price = `${rawPrice} €`;

											if (!rawPrice) return null;

											return (
												<FlightWithWeather
													key={day.dt}
													price={price}
													tempFrom={Math.round(weatherDeparture[i].temp.day)}
													conditionFrom={weatherDeparture[i].weather[0].main}
													dateMs={day.dt * 1000}
													flyToCode={flyTo.code}
													flyFromCode={flyFrom.code}
													tempTo={Math.round(day.temp.day)}
													conditionTo={day.weather[0].main}
												/>
											);
										})}
									</div>
								);
							}}
						</FlightsWeekData>
					);
				}}
			</WeatherWeekData>
		</div>
	);
};

export default City;
