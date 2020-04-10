import React from "react";

function Nav() {
  return (
    <div className="l-content__flexContainer--column--menu">
      <div className="c-branding">
        <img
          className="logo"
          src="../public/images/icons/jumpman.svg"
          alt="AVP"
        />
      </div>
      <navigation className="c-nav">
        <ul className="c-nav__list">
          <li className="c-nav__list__item">
            <a href="/">
              <img src="../public/images/icons/meter.svg" />
              <span className="title--home">Dashboard</span>
            </a>
          </li>
          <li className="c-nav__list__item">
            <a href="/registration">
              <img src="../public/images/icons/document.svg" />
              <span className="title--registration">Registration</span>
            </a>
          </li>
          <li className="c-nav__list__item">
            <a href="/teams">
              <img src="../public/images/icons/ball.svg" />
              <span className="title--teams">Teams</span>
            </a>
          </li>
          <li className="c-nav__list__item">
            <a href="/admin">
              <img src="../public/images/icons/suitcase.svg" />
              <span className="title--admin">Admin</span>
            </a>
          </li>
          <li className="c-nav__list__item">
            <a href="/schedule">
              <img src="../public/images/icons/date.svg" />
              <span className="title--schedule">Schedule</span>
            </a>
          </li>
          <li className="c-nav__list__item">
            <a href="/results">
              <img src="../public/images/icons/results.svg" />
              <span className="title--results">Results</span>
            </a>
          </li>
          <li className="c-nav__list__item">
            <a href="/communication">
              <img src="../public/images/icons/broadcast.svg" />
              <span className="title--communication">Communication</span>
            </a>
          </li>
          <li className="c-nav__list__item">
            <a href="/finance">
              <img src="../public/images/icons/refunds.svg" />
              <span className="title--finance">Finance</span>
            </a>
          </li>
        </ul>
        <a href="/signin">
          <div className="c-logout">
            <img src="../public/images/icons/exit.svg" />
            <span>Log out</span>
          </div>
        </a>
      </navigation>
    </div>
  );
}

export default Nav;
