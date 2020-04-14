import React from "react";
import { AuthContext } from "../App";

export const Signin = () => {
  return (
    <section className={`l-content l-content--signin`}>
      <div className={`l-content__row`}>
        <div className={`c-card_large u-card c-signin-form`}>
          <div className="e-signinLogo">
            <p className={`e-greet.u-align__text--center`}>HELLO!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
