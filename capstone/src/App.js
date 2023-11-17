import React from 'react';
import { BrowserRouter, Routes} from 'react-router-dom';
import styles from "./App.module.css"
import NavigationBar from './components/NavigationBar';
import AppRoute from './routes/AppRoute';
import backgroundImage from './services/backgroundImage.jpg';

function App() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`
  };

  return (
<BrowserRouter>

    <div className={styles["app"]} style={backgroundStyle}>
          <header className={styles["app__header"]}>
            <NavigationBar/>
          </header>

          <main className={styles["app__main"]}>
            <AppRoute/>
          </main>

          <footer className={styles["app__footer"]}>
            
          </footer>
        </div>
        
        </BrowserRouter>
      
    );
}

export default App;
