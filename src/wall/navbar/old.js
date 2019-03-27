import React from "react";
import { Route } from "react-router-dom";
import Link from "../../home/home-components/myLink";

   const Old = ({ label, to, activeOnlyWhenExact, alert, alertD }) => {
     if (label === 'Notification' && alert === true) {
      return (
        <Route
          path={to}
          exact={activeOnlyWhenExact}
          children={({ match }) => (
            <Link style={{color:'#E57373',borderBottom:'3px solid #E57373'}} className={match ? "active" : ""} to={to}>
              {label}
            </Link>
          )}
        />
      );
    } else  if (label === 'Daily Messages' && alertD === true) {
      return (
        <Route
          path={to}
          exact={activeOnlyWhenExact}
          children={({ match }) => (
            <Link style={{color:'#E57373',borderBottom:'3px solid #E57373'}} className={match ? "active" : ""} to={to}>
              {label}
            </Link>
          )}
        />
      )} else {
      return (
        <Route
          path={to}
          exact={activeOnlyWhenExact}
          children={({ match }) => (
            <Link className={match ? "active" : ""} to={to}>
              {label}
            </Link>
          )}
        />
      );
    }
    };

    const Oldd = ({ img, to, activeOnlyWhenExact }) => {
      return (
        <Route
          path={to}
          exact={activeOnlyWhenExact}
          children={({ match }) => (
            <Link className={match ? "active" : ""} to={to}>
              <img src={img} alt="img" />
            </Link>
          )}
        />
      );
};

export  {Old, Oldd};
