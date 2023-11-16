import React from 'react';
import styles from './Home.module.css';
import backgroundImage from '../services/backgroundImage.jpg';

function Home() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`, // Specify the URL of the background image
  };

  return (
    <div className={styles.Home} style={backgroundStyle}>
      <h1 className={styles.title}>Welcome To The Land of Ice and Fire!</h1>
      <p>
        This is the home page to the Game of Thrones App navigate to other
        characters and lands in the features below.
      </p>
    </div>
  );
}

export default Home;
