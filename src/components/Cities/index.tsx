import React, { useState } from 'react';

import City from './City';
import WeatherWeekData from 'components/WeatherWeekData';

import cities, { TCity } from './cities';
import styles from './styles.module.scss';

const Cities = () => {
	const [flyFrom, setFlyFrom] = useState<TCity | null>(null);

	return (
		<div className={styles.container}>
			<div>
				<h2 className={styles.title}>You want to fly from</h2>
				<p className={styles.btnGroup}>
					{cities.map((city) => (
						<span
							className={`${styles.tab} ${city.code === flyFrom?.code ? styles.selected : ''}`}
							key={city.name}
							onClick={() => {
								setFlyFrom(city);
							}}>
							{city.name}
						</span>
					))}
				</p>
			</div>

			{flyFrom && (
				<div>
					<h2 className={styles.title}>You have a few flight options: </h2>
					<div className={styles.row}>
						<WeatherWeekData lat={flyFrom.coords.lat} lon={flyFrom.coords.lon}>
							{(weekWeather) => {
								return cities
									.filter(({ code }) => code !== flyFrom.code)
									.map((city) => {
										return (
											<City
												key={city.code}
												flyTo={city}
												flyFrom={flyFrom}
												weatherDeparture={weekWeather}
											/>
										);
									});
							}}
						</WeatherWeekData>
					</div>
				</div>
			)}
		</div>
	);
};

export default Cities;
