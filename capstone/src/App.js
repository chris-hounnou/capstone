import React from 'react';
import { BrowserRouter, Routes} from 'react-router-dom';
import styles from "./App.css"
import NavigationBar from './components/NavigationBar';
import AppRoute from './routes/AppRoute';

function App() {
  return (
<BrowserRouter>

    <div className={styles["app"]}>
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
