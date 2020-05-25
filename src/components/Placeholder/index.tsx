import React from 'react';

import styles from './styles.module.scss';

const Placeholder: React.FC<{ type: string }> = ({ type }) => {
	let elm: JSX.Element | null = null;

	switch (type) {
		case 'error':
			elm = <div className={styles.error}>Something went wrong.</div>;
			break;
		case 'loading':
			elm = <div className={styles.loader} />;
			break;
		default:
			break;
	}

	return <div className={styles.container}>{elm}</div>;
};

export default Placeholder;
