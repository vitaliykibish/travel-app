import React from 'react';
import Cities from 'components/Cities';
import styles from 'components/Cities/styles.module.scss';

const App = () => {
	return (
		<div className={styles.mainView}>
			<Cities />
		</div>
	);
};

export default App;
