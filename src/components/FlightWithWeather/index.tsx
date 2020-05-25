import React from 'react';

import styles from './styles.module.scss';

type Props = {
	dateMs: number;
	tempFrom: number;
	tempTo: number;
	flyFromCode: string;
	flyToCode: string;
	price: string;
	conditionFrom: string;
	conditionTo: string;
};

const FlightWithWeather: React.FC<Props> = ({
	dateMs,
	tempFrom,
	tempTo,
	conditionFrom,
	conditionTo,
	flyFromCode,
	flyToCode,
	price,
}) => {
	const _date = new Date(dateMs);
	const day = _date.getDate();
	const month = _date.toLocaleString('default', { month: 'short' });

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<div className={styles.date}>
					<b>{day}</b>
					<span>{month}</span>
				</div>
				<div className={styles.weatherContent}>
					<Weather temp={tempFrom} condition={conditionFrom} />
					<div className={styles.direction}>
						{flyFromCode} ⭢ {flyToCode}
					</div>
					<Weather temp={tempTo} condition={conditionTo} />
				</div>
				<div className={styles.price}>{price}</div>
				<div className={styles.btn}>Book Now</div>
			</div>
		</div>
	);
};

const Weather: React.FC<{ temp: number; condition: string }> = ({ temp, condition }) => {
	return (
		<div className={styles.weather}>
			<div className={styles.temp}>
				<span>{temp}</span>
				<sup>°C</sup>
			</div>
			<div className={styles.icon}>
				<img src={`/travel-app/assets/weather/${condition.toLowerCase()}.svg`} alt={condition} />
			</div>
		</div>
	);
};

export default FlightWithWeather;
