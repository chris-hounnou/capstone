import React from 'react'
import { NavLink } from "react-router-dom";
import styles from "./NavigationBar.module.css";

function NavigationBar() {

  const routes = [
    { to: "/", text: "Home" },
    { to: "/Characters", text: "Characters" },
    // {to: "/Character", text: "Character"},
    { to: "/Houses", text: "Houses" }
  ];

  return (
    <nav className={styles.navigationBar}>
      {routes.map((route, index) =>
        <NavLink className={styles.navLink}
          key={index}
          activeclassname={styles.active}
          to={route.to}
        >
          {route.text}
        </NavLink>
      )}
    </nav>
  );

}

export default NavigationBar;