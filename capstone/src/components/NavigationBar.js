import React from 'react'
import { NavLink } from "react-router-dom";

function NavigationBar () {

    const routes = [
        {to: "/", text: "Home"},
        {to: "/Characters", text: "Characters"},
        {to: "/Character", text: "Character"},
        {to: "/Houses", text: "Houses"}
      ]; 

    return (
        <nav>
        {routes.map((route, index) => 
          <NavLink
      key={index}
      activeclassname="navigation_item--active"
      className="navigation_item"
      to={route.to}
    >
      {route.text}
    </NavLink>
          )}
        </nav>
      );

}

export default NavigationBar;