import {Routes, Route, Navigate} from "react-router-dom";
import Home from '../pages/Home'
import Character from "../pages/Character";
import Characters from '../pages/Characters';
import Houses from '../pages/Houses'


function AppRoute ()
{
  return (
    <Routes> 
      <Route 
      path="/"
      element={<Home/>}
      />
      
      <Route 
      path="/"
      element={<Characters/>}
      />

    <Route 
      path="/"
      element={<Character/>}
      />
      <Route 
      path="/"
      element={<Houses/>}
      />
    


    <Route 
      path="*"
      element={<Navigate to ={"/"}/>}
      />
    </Routes>
  );
}

export default AppRoute;
