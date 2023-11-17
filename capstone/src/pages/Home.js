import React from 'react';
import styles from './Home.module.css';

function Home() {
  
  return (
    <div className={styles.Home}>
      <h1 className={styles.title}>Welcome To The Land of Ice and Fire!</h1>
      <p>
        This is the Home page to the Game of Thrones App! navigate to other
        characters and lands in the features above.
      </p>
    </div>
  );
}

export default Home;
