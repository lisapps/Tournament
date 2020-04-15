import React from "react";
import { AuthContext } from "../App";

export const Signin = () => {
  const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };
  const [data, setData] = React.useState(initialState);
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });
    fetch("http://localhost:3002/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: data.emailId,
        password: data.password
      })
    })
      .then(res => {
        if (res.ok) {
          console.log("inside react res.ok");
          return res.json();
        }
        throw res;
      })
      .then(resJson => {
        dispatch({
          type: "LOGIN",
          payload: resJson
        });
      })
      .catch(error => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
      });
  };
  return (
    <section className={`l-content l-content--signin`}>
      <div className={`l-content__row`}>
        <div className={`c-card_large u-card c-signin-form`}>
          <div className="e-signinLogo">
            <p className={`e-greet.u-align__text--center`}>HELLO!</p>
            <form id="e-signin-form" onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="emailId"
                placeholder="Email"
                value={data.emailId}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleInputChange}
                required
              />
              {data.errorMessage && (
                <span className="form-error">{data.errorMessage}</span>
              )}
              <button
                className={`e-btn--lg u-align__button--center`}
                disabled={data.isSubmitting}
              >
                {data.isSubmitting ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="l-content__row">
        <p className="e-cookieMsg">
          *Please note that cookies must be enabled for this site to work
          properly.
        </p>
      </div>
    </section>
  );
};

export default Signin;
