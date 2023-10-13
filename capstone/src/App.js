import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';


function App() {
  return (
<Router>
  <NavigationBar/>{}
  <Routes>
  <Route path='/' exactcomponent={Home}/>
  </Routes>
</Router>
    );
}

export default App;
