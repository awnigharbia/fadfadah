import React from "react";
import { Route } from "react-router-dom";
import Link from "../../home/home-components/myLink";

const Old = ({ label, to, activeOnlyWhenExact, alert }) => {
  if (label === "Notification" && alert === true) {
    return (
      <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => (
          <Link className={match ? "active" : ""} to={to}>
            <div className="notification-badge" />
            {label}
          </Link>
        )}
      />
    );
  } else {
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

export { Old, Oldd };
